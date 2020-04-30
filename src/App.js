import React from 'react';

import Router from './routes';
import { AuthContext } from "./context/Auth";
import NotificationHOC from './components/Notification';

const Notification = NotificationHOC(Router);

export default class App extends React.Component {

    state = {
        authToken:  localStorage.getItem('token') || '',
        currUser: null,
    };

    componentDidMount = () => {
        this.setState({
            currUser: this.setUserFromLocalStorage(),
        });
    };

    setUserFromLocalStorage = () => {
        let currUser = null;

        try {
            currUser = JSON.parse(localStorage.getItem('currUser'));
        } catch(e) { console.log(e); } 

        return currUser;
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

        let userData = '';
        try{
            userData = JSON.parse(atob(token.split('.')[1])).data;
        } catch(e) { console.log(e); }

        this.setCurrUser(userData);
    };

    getExpireDate = (token) => {
        if (!token) { return null; }

        let jwt = {};
        try{
            jwt = JSON.parse(atob(token.split('.')[1]));
        } catch(e) { console.log(e); }

        if (jwt.exp) {
            return jwt.exp * 1000;
        }

        return null;       
    }

    getNameCurrUser = () => {
        if (this.state.currUser) {
            return this.state.currUser.name;
        }
        return '';
    };

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
                this.setUserData(updateToken.token);

                return true;
            }
            if(response.status === 401) { this.logout(); }

            return false; 
        }

        return true;
    };

    isLogin = () => {
        return !!this.state.authToken;
    };

    isAdmin = () => {
        return this.state.currUser && this.state.currUser.role.toLowerCase() === 'admin';
    };

    logout = () => {
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
                getNameCurrUser: this.getNameCurrUser,
                isAdmin: this.isAdmin,
                isLogin: this.isLogin,
                setUserData: this.setUserData,
                setToken: this.setToken,
                checkAuthToken: this.checkAuthToken,
                logout: this.logout,
            }}>
                <Notification/>
            </AuthContext.Provider>
        );
    };
}