import { useState, useCallback } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import { useEntitiesState } from './useEntitiesState';
import { getToken } from '../helpers/getEntityFromState';
import { logout, refreshToken } from '../actions';
import { useNotificationContext } from '../context/NotificationContext';

export const useCrudState = initialValue => {
    const [         
        entities,
        setEntities,
        addEntity,
        editEntity,
        removeEntity,
    ] = useEntitiesState();

    const [pathCrud] = useState(initialValue);

    const token = useSelector(getToken, shallowEqual);

    const { notify } = useNotificationContext();
    
    const dispatch = useDispatch();

    const boundLogout = useCallback(
        () => dispatch(logout()),
        [dispatch],
    );
    const boundRefreshToken = useCallback(
        token => dispatch(refreshToken(token)),
        [dispatch],
    );

    const createEntityAtServer = useCallback(
        async entity => {
            const response = await fetch(pathCrud[0], { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(entity),
            });
            if (response.ok) {
                const idEntity = await response.json();

                addEntity(entity, idEntity);
                return true;
            }

            if (response.status === 401) { boundRefreshToken(token); }
            if (response.status === 403) { boundLogout(); }

            notify('Ошибка HTTP:' + response.status);
            
            return false;
        }, 
        [addEntity, boundRefreshToken, boundLogout, pathCrud, token, notify]
    );

    const getEntityFromServer = useCallback(
        async ( _isMounted = { current: true } ) => {

            const response = await fetch(pathCrud[1]);
            if ( _isMounted.current ) {  
                if (response.ok) { 
                    const entities = await response.json();
                    
                    setEntities(entities);
                    return;
                } 
                if (response.status === 401) { boundRefreshToken(token); }
                if (response.status === 403) { boundLogout(); }

                notify('Ошибка HTTP:' + response.status);
            }
        }, 
        [boundLogout, pathCrud, setEntities, boundRefreshToken, token, notify]
    );

    const editEntityAtServer = useCallback(
        async entity => {

            const response = await fetch(pathCrud[2], { 
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(entity),
            });
            if (response.ok) {
                editEntity(entity);
                return true;
            }

            if (response.status === 401) { boundRefreshToken(token); }
            if (response.status === 403) { boundLogout(); }

            notify('Ошибка HTTP:' + response.status);

            return false;
        }, 
        [boundRefreshToken, editEntity, boundLogout, pathCrud, token, notify]
    );

    const deleteEntityFromServer = useCallback(
        async id => {

            const response = await fetch(pathCrud[3], { 
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id}),
            });
            if (response.ok) {
                
                removeEntity(id);
                return true;
            }

            if (response.status === 401) { boundRefreshToken(token); }
            if (response.status === 403) { boundLogout(); }

            notify('Ошибка HTTP:' + response.status);

            return false;
        }, 
        [boundRefreshToken, boundLogout, pathCrud, removeEntity, token, notify]
    );

    return [
        entities,
        createEntityAtServer,
        getEntityFromServer,
        editEntityAtServer,
        deleteEntityFromServer,
    ];
};