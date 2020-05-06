import React, { useState, useEffect } from 'react';

import FormUsers from '../../components/FormUsers';
import TableUsers from '../../components/TableUsers';
import Header from '../../components/Header';
import { getEditElement } from '../../helpers/arrayMethods';
import useCrudState from '../../hooks/useCrudState';

const PATH_CRUD = [ '/admin/users/create', '/admin/users/show', '/admin/users/update', '/admin/users/delete' ];

const INITIAL_EDIT_STATE = {
    removeButtonDisabled: false,
    editUser: null,
};

export default ( { history } ) => {
    const [editState, setEditState] = useState(INITIAL_EDIT_STATE);

    const [
        users, 
        createUserAtServer, 
        getUsersFromServer, 
        editUserAtServer,
        deleteUserFromServer,
    ] = useCrudState(PATH_CRUD);

    useEffect(() => {
        getUsersFromServer();
    }, [getUsersFromServer]);

    const getIdEditUserId = id => {
        const editUser = getEditElement(id, '_id', users);

        setEditState({
            removeButtonDisabled: true,
            editUser,
        });
    };

    const getData = user => {
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
    };

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

}