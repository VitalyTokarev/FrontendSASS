import React from 'react';
import {
    Route,
    BrowserRouter, 
} from 'react-router-dom';

import routes from './routes';
import { AuthContext } from "./context";

export default class App extends React.Component {

    state = {
        authToken: JSON.parse(localStorage.getItem('token')),
        currUser: '',
    };

    setCurrUser = userData => {
        localStorage.setItem("token", JSON.stringify(userData.token));
        this.setState({
            currUser: userData.user,
            authToken: userData.token,
        })
    };

    render = () => {
        return (
            <AuthContext.Provider value={{
                user: this.currUser,
                authToken: this.state.authToken,
                setCurrUser: this.setCurrUser
            }}>
                <BrowserRouter>
                    {routes.map( route => {
                        return(
                            <Route
                                key={route.path}
                                exact={route.isExact}
                                path={route.path}
                                component={route.component}
                            />
                        );
                    })}
                </BrowserRouter>
            </AuthContext.Provider>
        );
    };
}