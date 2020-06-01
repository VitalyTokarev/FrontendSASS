import { entityService } from '../../helpers/entityService';
import { userActions, alertActions } from '../actions';
import { userConstants } from '../actionsTypes';

const createUser = user => {
    return dispatch => {
        dispatch(alertActions.clear());
        entityService.createEntityAtServer('/users/create', user)
        .then(
            _id => { 
                dispatch(userActions.addUser({
                    ...user,
                    _id
                }));
                dispatch(alertActions.success({
                    type: userConstants.ADD_USER,
                    message: 'Пользователь добавлен!'
                }));
            },
            error => {
                dispatch(alertActions.error(error));
            }
        );
    };
};

const getUsers = () => {
    return dispatch => {
        dispatch(alertActions.clear());
        entityService.getEntityFromServer('/users/show')
        .then(
            users => {
                dispatch(userActions.setUsers(users));
            },
            error => {
                dispatch(alertActions.error(error));
            }
        );
    };
};

const updateUser = user => {
    return dispatch => {
        dispatch(alertActions.clear());
        entityService.editEntityAtServer('/users/update', user)
        .then(
            () => { 
                dispatch(userActions.updateUser(user));
                dispatch(alertActions.success({
                    type: userConstants.UPDATE_USER,
                    message: 'Пользователь обновлен!'
                }));
            },
            error => {
                dispatch(alertActions.error(error));
            }
        );
    };
};

const deleteUser = id => {
    return dispatch => {
        dispatch(alertActions.clear());
        entityService.deleteEntityFromServer('/users/delete', id)
        .then(
            () => { 
                dispatch(userActions.deleteUser(id));
                dispatch(alertActions.success({
                    type: userConstants.DELETE_USER,
                    message: 'Пользователь удален!'
                }));
            },
            error => {
                dispatch(alertActions.error(error));
            }
        );
    };
};

export const userCrud = {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
};