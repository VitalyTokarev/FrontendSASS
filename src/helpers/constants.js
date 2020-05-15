import PropTypes from 'prop-types';

export const INITIAL_TITLE_DATA = {
    nameSubmitBtn: 'Добавить',
    title: 'Добавить пользователя',
};

export const historyProps = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
}; 

export const authConstants = {
    AUTH_SUCCESS: 'USERS_AUTH_SUCCESS',
    AUTH_FAILURE: 'USERS_AUTH_FAILURE',
    
    LOGOUT: 'USERS_LOGOUT',
};

export const alertConstants = {
    ERROR: 'ALERT_ERROR',
    CLEAR: 'ALERT_CLEAR',
};