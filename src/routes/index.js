import React, { useEffect } from 'react';
import {
    Route,
    Router, 
} from 'react-router-dom';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import { 
    routes,  
    authorizationRoutes,
    adminRoute
} from './routes';
import RedirectToHome from '../components/RedirectTo';
import { history } from '../helpers/history';
import { getCurrUser } from '../helpers/getEntityFromState';
import { alertActions } from '../actions';

export default () => {
    const user = useSelector( getCurrUser, shallowEqual);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            dispatch(alertActions.clear());
        });
    }, [dispatch]);
    
    return (
        <Router history={history}>
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
            {authorizationRoutes.map( route => {
                const component = user ? RedirectToHome: route.component;
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
            {user && user.role === 'admin' && <Route
                key={adminRoute.path}
                exact={adminRoute.isExact}
                path={adminRoute.path}
                component={adminRoute.component}
            />}
        </Router>
    );
};