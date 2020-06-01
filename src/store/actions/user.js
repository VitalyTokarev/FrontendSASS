import { userConstants } from '../actionsTypes';

const addUser = user => { return { type: userConstants.ADD_USER, payload: { ...user } }; };

const setUsers = users => { return { type: userConstants.SET_USERS, payload: users }; };

const updateUser = user => { return { type: userConstants.UPDATE_USER, payload: {...user} }; };

const deleteUser = _id => { return { type: userConstants.DELETE_USER, payload: _id}; }

export const userActions = {
    addUser,
    setUsers,
    updateUser,
    deleteUser,
};