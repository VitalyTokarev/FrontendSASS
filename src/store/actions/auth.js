import { authConstants } from '../actionsTypes';

const request = refreshTokenPromise => { return { type: authConstants.AUTH_REQUEST, payload: refreshTokenPromise }; };

const success = user => { return { type: authConstants.AUTH_SUCCESS, payload: { ...user } }; };

const failure = () => { return { type: authConstants.AUTH_FAILURE }; };

const logout = () => { return { type: authConstants.LOGOUT }; };

export const authActions = {
    request,
    success,
    failure,
    logout,
};