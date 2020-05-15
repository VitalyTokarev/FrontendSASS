import { authConstants } from '../helpers/constants';
import { authService } from '../helpers/authService';
import { alertActions } from './alert';
import { history } from '../helpers/history';

const success = user => { return { type: authConstants.AUTH_SUCCESS, user } };
const failure = () => { return { type: authConstants.AUTH_FAILURE } };

export const login = user => {
    return dispatch => {
        dispatch(alertActions.clear());
        authService.login(user.email, user.password)
        .then(
            user => { 
                dispatch(success(user));
                history.push('/');
            },
            error => {
                dispatch(alertActions.error(error));
            }
        );
    };
};

export const logout = () => {
    authService.logout();
    history.push('/login');
    return { type: authConstants.LOGOUT };
};

export const signup = user => {
    return dispatch => {
        dispatch(alertActions.clear());
        authService.signup(user.name, user.email, user.password)
        .then(
            user => { 
                dispatch(success(user));
                history.push('/');
            },
            error => {
                dispatch(alertActions.error(error));
            }
        );
    };
};

export const refreshToken = token => {
    return dispatch => {
        dispatch(alertActions.clear());
        authService.refreshToken(token)
        .then(
            user => { 
                dispatch(success(user));
            },
            error => {
                if ( error.substr(error.length - 3, error.length ) === 401 ){
                    dispatch(failure());
                }
                dispatch(alertActions.error(error));
            }
        );
    };
};