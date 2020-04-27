import React from 'react';
import {
    Route,
    BrowserRouter, 
} from 'react-router-dom';

import { UseAuth } from '../context';
import { routes,  authorizationRoutes } from './routes';
import Authorization from '../components/Authorization';
import RedirectToHome from '../components/RedirectTo';

export default function Router(props) {
    const { isLogin } = UseAuth();

    return (
        <BrowserRouter>
            {routes.map( route => {
                const component = route.isPrivate ? 
                Authorization(route.component)
                :route.component;
                
                return( 
                    <Route
                        key={route.path}
                        exact={route.isExact}
                        path={route.path}
                        component={component}
                    />
                );
            })}
            {authorizationRoutes.map( route => {
                const component = isLogin() ? RedirectToHome: route.component;
                return( 
                    <Route
                        key={route.path}
                        exact={route.isExact}
                        path={route.path}
                        component={component}
                    />
                );
            })
            }
        </BrowserRouter>
    );
}
