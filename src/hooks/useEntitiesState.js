import { useState, useCallback } from 'react';

import { removeElementFromArray, getEditArray} from '../helpers/arrayMethods';

export const useEntitiesState = ( inititalVlaue = [] ) => {
    const [entities, setEntities] = useState(inititalVlaue);

    const addEntity = useCallback(
        (entity, _id) => {
            setEntities( state => [
                ...state,
                {
                    ...entity,
                    _id
                }
            ]);
    }, []);

    const editEntity = useCallback(
        entity => {
            const entitiesList = getEditArray(entity, '_id', entities);
            setEntities(entitiesList);
    }, [entities]);

    const removeEntity = useCallback(
        _id => {
            const entitiesList = removeElementFromArray(_id, '_id', entities);
            setEntities(entitiesList);
    }, [entities]);

    return [
        entities,
        setEntities,
        addEntity,
        editEntity,
        removeEntity,
    ];
};