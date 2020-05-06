import React, { useState, useEffect } from 'react';

import FormToDo from '../../components/FormToDo';
import List from '../../components/List';
import Header from '../../components/Header';
import { getEditElement } from '../../helpers/arrayMethods';
import useCrudState  from '../../hooks/useCrudState';

const PATH_CRUD = [ '/object/create', '/object', '/object/update', '/object/delete' ];

const INITIAL_EDIT_STATE = {
    removeButtonDisabled: false,
    editObject: null,
};

export default ( { history }) => {
    const [editState, setEditState] = useState(INITIAL_EDIT_STATE);

    const [
        objects, 
        createObjectAtServer, 
        getObjectsFromServer, 
        editObjectAtServer,
        deleteObjectFromServer,
    ] = useCrudState(PATH_CRUD);

    useEffect(() => {
        getObjectsFromServer();
    }, [getObjectsFromServer]);

    const getIdEditObjecId = id => {
        const editObject = getEditElement(id, '_id', objects);

        setEditState({
            removeButtonDisabled: true,
            editObject,
        });
    };

    const getData = object => {
        if (editState.editObject !== null) {
            return editObjectAtServer(object).then(
                success => {
                    if ( success ) {
                        setEditState(INITIAL_EDIT_STATE);
                    }
                    return success;
                }
            );
        } else {
            return createObjectAtServer(object);
        }
    };
   
    return (
        <React.Fragment>
            <Header 
                history={history}
            />
            <FormToDo
                getData={getData}
                editObject={editState.editObject}
            />
            <List
                list={objects}
                removeAction={deleteObjectFromServer}
                editAction={getIdEditObjecId}
                removeButtonDisabled={editState.removeButtonDisabled}
            />
        </React.Fragment>
    );
}

