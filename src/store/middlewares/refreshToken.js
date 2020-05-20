import { refreshToken } from '../flows';

const getExpireDate = token => {
    let jwt = {};
    try{
        jwt = JSON.parse(atob(token.split('.')[1]));
    } catch(e) { }

    if (jwt.exp) {
        return jwt.exp * 1000;
    }

    return null;       
}

const tokenIsExpried = dateExpire => {
    if ( !dateExpire ) { return false; }

    return (dateExpire - Date.now())  < 5000;
};

export const refreshTokenMiddleware = ({ dispatch, getState }) => {
    return next => action => {
        if ( typeof action === 'function') {

            const state = getState().auth;

            if ( state && state.token ) {

                if ( tokenIsExpried( getExpireDate(state.token) ) ) {
 
                    if ( !state.refreshTokenPromise ) {
                        return refreshToken(state.token, dispatch).then( () => next(action));
                    } else {
                        return state.refreshTokenPromise.then(() => next(action) );
                    }
                }
            }
        }
        return next(action);
    };
};