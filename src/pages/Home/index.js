import React, { useState, useEffect, useCallback, useRef } from 'react';

import FormToDo from '../../components/FormToDo';
import List from '../../components/List';
import Header from '../../components/Header';
import { getEditElement } from '../../helpers/arrayMethods';
import { useCrudState }  from '../../hooks';
import { historyProps } from '../../helpers/constants';

const PATH_CRUD = [ '/object/create', '/object', '/object/update', '/object/delete' ];

const INITIAL_EDIT_STATE = {
    removeButtonDisabled: false,
    editObject: null,
};

const Home = ( { history }) => {
    const [editState, setEditState] = useState(INITIAL_EDIT_STATE);

    const [
        objects, 
        createObjectAtServer, 
        getObjectsFromServer, 
        editObjectAtServer,
        deleteObjectFromServer,
    ] = useCrudState(PATH_CRUD);

    const _isMounted = useRef(true);

    useEffect(() => {
        return () => _isMounted.current = false;
    }, []);

    useEffect(() => {
        getObjectsFromServer(_isMounted);
    }, [getObjectsFromServer]);

    const getIdEditObjecId = useCallback(
        id => {
            const editObject = getEditElement(id, '_id', objects);

            setEditState({
                removeButtonDisabled: true,
                editObject,
            });
    }, [objects]);

    const getData = useCallback(
        object => {
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
    }, [createObjectAtServer, editObjectAtServer, editState.editObject]);
   
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
};

Home.propTypes = historyProps;

export default Home;

