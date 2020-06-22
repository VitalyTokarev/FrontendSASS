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
import RedirectToHome from '../components/commons/RedirectTo';
import { history } from '../helpers/constants';
import { getCurrUser, getAlertMessage } from '../helpers/getEntityFromState';
import { alertActions } from '../store/actions';
import { useNotificationContext } from '../context/NotificationContext';

export default () => {
    const user = useSelector( getCurrUser, shallowEqual);
    const dispatch = useDispatch();

    const { notify } = useNotificationContext();
    const errMessage = useSelector(getAlertMessage, shallowEqual);

    useEffect(() => {
        history.listen( () => {
            dispatch(alertActions.clear());
        });
    }, [dispatch]);

    useEffect(() => {
        if (errMessage) {
            notify(errMessage);
        }
    }, [errMessage, notify]);
    
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