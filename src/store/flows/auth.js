import { authService } from '../../helpers/authService';
import { authActions, alertActions } from '../actions';
import { history } from '../../helpers/constants';

export const login = user => {
    return dispatch => {
        dispatch(alertActions.clear());
        authService.login(user.email, user.password)
        .then(
            user => { 
                dispatch(authActions.success(user));
                history.push('/');
            },
            error => {
                dispatch(alertActions.error(error));
            }
        );
    };
};

export const logout = () => {
    return dispatch => {
        authService.logout();
        history.push('/login');
        dispatch(authActions.logout());
    }
};

export const signup = user => {
    return dispatch => {
        dispatch(alertActions.clear());
        authService.signup(user.name, user.email, user.password)
        .then(
            user => { 
                dispatch(authActions.success(user));
                history.push('/');
            },
            error => {
                dispatch(alertActions.error(error));
            }
        );
    };
};

export const refreshToken = (token, dispatch) => {
    dispatch(alertActions.clear());

    const refreshTokenPromise = authService.refreshToken(token)
    .then(
        user => { 
            dispatch(authActions.success(user));
            return Promise.resolve();
        },
        error => {
            if ( error.substr(error.length - 3, error.length ) === 401 ){
                dispatch(authActions.failure());
            }

            dispatch(alertActions.error(error));

            return Promise.reject();
        }
    );

    dispatch(authActions.request(refreshTokenPromise));
    return refreshTokenPromise;
};