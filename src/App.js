import React from 'react';

import Router from './routes';
import { AuthContext } from "./context";

export default class App extends React.Component {

    state = {
        authToken:  localStorage.getItem('token') || null,
        currUser: localStorage.getItem('currUser') ? JSON.parse(localStorage.getItem('currUser')): '',
    };

    setCurrUser = user => {
        if (!user) { return; }

        localStorage.setItem('currUser', JSON.stringify(user));
        this.setState({
            currUser: user,
        })
    };

    setToken = token => {
        if (!token) { return; }

        localStorage.setItem('token', token);
        this.setState({
            authToken: token,
        })
    };

    setUserData = token => {
        if(!token) { return; }
        this.setToken(token);

        const userData = JSON.parse(atob(token.split('.')[1])).data;
        this.setCurrUser(userData);
    };

    getExpireDate = (token) => {
        if (!token) { return null; }

        const jwt = JSON.parse(atob(token.split('.')[1]));

        if (jwt.exp) {
            return jwt.exp * 1000;
        }

        return null;       
    }

    tokenIsExpried = (dateExpire) => {
        if (!dateExpire) { return false; }

        return Date.now() > dateExpire;
    };

    checkAuthToken = async () => {
        if (!this.state.authToken) { return false; }

        if( this.tokenIsExpried( this.getExpireDate(this.state.authToken) )) {

            const response = await fetch('/user/update_token', {
                method: 'POST',
                headers: {
                    authorization: JSON.stringify( { token: this.state.authToken } ),
                },
            });

            if(response.ok) {
                const updateToken = await response.json();
                this.setToken(updateToken.token);

                return true;
            }
            if(response.status === 401) { this.removeTokens(); }

            return false; 
        }

        return true;
    };

    isLogin = () => {
        return !!this.state.authToken;
    };

    removeTokens = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('currUser');

        if (this.state.authToken){
            this.setState({
                authToken: null,
            });
        }
    };

    render = () => { 
        return (
            <AuthContext.Provider value={{
                currUser: this.state.currUser.name,
                isLogin: this.isLogin,
                setUserData: this.setUserData,
                setToken: this.setToken,
                checkAuthToken: this.checkAuthToken,
                removeTokens: this.removeTokens,
            }}>
                <Router/>
            </AuthContext.Provider>
        );
    };
}