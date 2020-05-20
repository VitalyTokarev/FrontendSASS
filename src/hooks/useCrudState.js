import { useState, useCallback } from 'react';

import { useEntitiesState } from './useEntitiesState';

export const useCrudState = initialValue => {
    const [         
        entities,
        setEntities,
        addEntity,
        editEntity,
        removeEntity,
    ] = useEntitiesState();

    const [pathCrud] = useState(initialValue);

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

            if (response.status === 401) { }
            if (response.status === 403) { }
            
            return false;
        }, 
        [addEntity, pathCrud]
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
                if (response.status === 401) { }
                if (response.status === 403) { }

            }
        }, 
        [pathCrud, setEntities]
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

            if (response.status === 401) { }
            if (response.status === 403) { }

            return false;
        }, 
        [editEntity, pathCrud]
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
            if (response.status === 401) { }
            if (response.status === 403) { }

            return false;
        }, 
        [pathCrud, removeEntity]
    );

    return [
        entities,
        createEntityAtServer,
        getEntityFromServer,
        editEntityAtServer,
        deleteEntityFromServer,
    ];
};