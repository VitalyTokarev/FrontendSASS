import React, { useState, useEffect } from 'react';

import Router from './routes';
import { AuthContext } from "./context/Auth";
import NotificationHOC from './components/Notification';

const Notification = NotificationHOC(Router);

export default () => {
    const [authToken, setAuthToken] = useState( localStorage.getItem('token') || '' );
    const [currUser, setCurrUserState] = useState(null);

    useEffect(() => {
        setCurrUser(setUserFromLocalStorage());
    }, []);

    const setUserFromLocalStorage = () => {
        let currUser = null;

        try {
            currUser = JSON.parse(localStorage.getItem('currUser'));
        } catch(e) { console.log(e); } 

        return currUser;
    };

    const setCurrUser = user => {
        if ( !user ) { return; }

        localStorage.setItem('currUser', JSON.stringify(user));
        setCurrUserState(user);
    };

    const setToken = token => {
        if (!token) { return; }

        localStorage.setItem('token', token);
        setAuthToken(token);
    };

    const setUserData = token => {
        if( !token ) { return; }
        setToken(token);

        let userData = '';
        try{
            userData = JSON.parse(atob(token.split('.')[1])).data;
        } catch(e) { console.log(e); }

        setCurrUser(userData);
    };

    const getNameCurrUser = () => {
        if (currUser) {
            return currUser.name;
        }
        return '';
    };

    const getExpireDate = (token) => {
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

    const tokenIsExpried = (dateExpire) => {
        if ( !dateExpire ) { return false; }

        return Date.now() > dateExpire;
    };

    const checkAuthToken = async () => {
        if ( !authToken)  { return false; }

        if ( tokenIsExpried( getExpireDate(authToken) )) {

            const response = await fetch('/user/update_token', {
                method: 'POST',
                headers: {
                    authorization: JSON.stringify( { token: authToken } ),
                },
            });

            if (response.ok) {
                const updateToken = await response.json();
                setUserData(updateToken.token);

                return true;
            }
            if (response.status === 401) { logout(); }

            return false; 
        }

        return true;
    };

    const isLogin = () => {
        return authToken;
    };
    
    const isAdmin = () => {
        return currUser && currUser.role.toLowerCase() === 'admin';
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('currUser');

        if (authToken) {
            setAuthToken('');
        }
    };

    return (
        <AuthContext.Provider value={{
            getNameCurrUser,
            isAdmin,
            isLogin,
            setUserData,
            setToken,
            checkAuthToken,
            logout,
        }}>
            <Notification/>
        </AuthContext.Provider>
    ); 
}