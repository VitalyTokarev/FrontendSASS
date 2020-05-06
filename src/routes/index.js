import React from 'react';
import {
    Route,
    BrowserRouter, 
} from 'react-router-dom';

import { useAuthContext } from '../context/Auth';
import { 
    routes,  
    authorizationRoutes,
    adminRoute
} from './routes';
import Authorization from '../components/Authorization';
import RedirectToHome from '../components/RedirectTo';

export default function Router(props) {
    const { isLogin, isAdmin } = useAuthContext();

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
                        AuthContextValue={props.AuthContextValue}
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
            {isAdmin() && <Route
                key={adminRoute.path}
                exact={adminRoute.isExact}
                path={adminRoute.path}
                component={Authorization(adminRoute.component)}
            />}
        </BrowserRouter>
    );
}
