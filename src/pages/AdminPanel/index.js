import React, { useState, useEffect, useCallback, useRef } from 'react';

import FormUsers from '../../components/FormUsers';
import TableUsers from '../../components/Table';
import Header from '../../components/Header';
import { getEditElement } from '../../helpers/arrayMethods';
import { useCrudState } from '../../hooks';
import { historyProps } from '../../helpers/constants';

const PATH_CRUD = [ '/users/create', '/users/show', '/users/update', '/users/delete' ];

const INITIAL_EDIT_STATE = {
    removeButtonDisabled: false,
    editUser: null,
};

const AdminPanel = ( { history } ) => {
    const [editState, setEditState] = useState(INITIAL_EDIT_STATE);

    const [
        users, 
        createUserAtServer, 
        getUsersFromServer, 
        editUserAtServer,
        deleteUserFromServer,
    ] = useCrudState(PATH_CRUD);

    const _isMounted = useRef(true);

    useEffect(() =>{
        return () => _isMounted.current = false;
    }, []);

    useEffect(() => {
        getUsersFromServer(_isMounted);
    }, [getUsersFromServer]);

    const getIdEditUserId = useCallback(
        id => {
            const editUser = getEditElement(id, '_id', users);

            setEditState({
                removeButtonDisabled: true,
                editUser,
            });
    }, [users]);

    const getData = useCallback(
        user => {
            if (editState.editUser !== null) {
                return editUserAtServer(user).then(
                    success => {
                        if ( success ) {
                            setEditState(INITIAL_EDIT_STATE);
                        }
                        return success;
                    }
                );
            } else {
                return createUserAtServer(user);
            }
    }, [createUserAtServer, editState.editUser, editUserAtServer]);

    return (
        <React.Fragment>
            <Header 
                history={history}
                disableViewUsers={true}
            />
            <FormUsers
                getData={getData}
                editUser={editState.editUser}
            />
            <TableUsers
                list={users}
                removeAction={deleteUserFromServer}
                editAction={getIdEditUserId}
                removeButtonDisabled={editState.removeButtonDisabled}
            />
        </React.Fragment>
    );

};

AdminPanel.propTypes = historyProps;

export default AdminPanel;