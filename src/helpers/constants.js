import PropTypes from 'prop-types';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const INITIAL_TITLE_DATA = {
    nameSubmitBtn: 'Добавить',
    title: 'Добавить пользователя',
};

export const historyProps = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
}; 