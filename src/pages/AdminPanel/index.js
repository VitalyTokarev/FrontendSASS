import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import FormUsers from '../../components/FormUsers';
import TableUsers from '../../components/Table';
import Header from '../../components/Header';
import { getEditElement } from '../../helpers/arrayMethods';
import { userCrud } from '../../store/flows';
import { getAlertMessageType } from '../../helpers/getEntityFromState';
import { userConstants } from '../../store/actionsTypes';

const INITIAL_EDIT_STATE = {
    removeButtonDisabled: false,
    editUser: null,
};

export default () => {
    const [editState, setEditState] = useState(INITIAL_EDIT_STATE);

    const dispatch = useDispatch();

    const users = useSelector( state => state.user, shallowEqual);

    const messageSuccessType = useSelector(getAlertMessageType, shallowEqual);

    const boundGetUsers = useCallback( 
        () => dispatch(userCrud.getUsers()
        ), 
        [dispatch]
    );

    const boundCreateUser = useCallback( 
        user => dispatch(userCrud.createUser(user)
        ), 
        [dispatch]
    );

    const boundEditUser = useCallback(
        user => dispatch(userCrud.updateUser(user)
        ),
        [dispatch]
    );

    const boundDeleteUser = useCallback(
        id => dispatch(userCrud.deleteUser(id)
        ),
        [dispatch]
    );

    useEffect(() => {
        boundGetUsers();
    }, [boundGetUsers]);

    useEffect(() => {
        if ( messageSuccessType === userConstants.UPDATE_USER ) {
            setEditState({
                removeButtonDisabled: false,
                editUser: null,
            });
        }
    }, [messageSuccessType])

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
                boundEditUser(user);
            } else {
                boundCreateUser(user);
            }
    }, [boundCreateUser, editState.editUser, boundEditUser]);

    return (
        <React.Fragment>
            <Header 
                disableViewUsers={true}
            />
            <FormUsers
                getData={getData}
                editUser={editState.editUser}
            />
            <TableUsers
                list={users ? users : []}
                removeAction={boundDeleteUser}
                editAction={getIdEditUserId}
                removeButtonDisabled={editState.removeButtonDisabled}
            />
        </React.Fragment>
    );
};