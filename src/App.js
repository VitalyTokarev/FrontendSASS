import React from 'react';
import {
    Route,
    BrowserRouter, 
} from 'react-router-dom';

import routes from './routes';
import { AuthContext } from "./context";

export default class App extends React.Component {

    state = {
        authTokens: JSON.parse(localStorage.getItem('tokens')),
    };

    setTokens = tokens => {
        localStorage.setItem("tokens", JSON.stringify(tokens));
        this.setState({
            authTokens: tokens,
        })
    };

    render = () => {
        return (
            <AuthContext.Provider value={{
                authTokens: this.state.authTokens,
                setAuthTokens: this.setTokens
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