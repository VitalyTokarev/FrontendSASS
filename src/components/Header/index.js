import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import './index.css';
import Button from '../Button';
import { logout } from '../../actions';
import { getCurrUser } from '../../helpers/getEntityFromState';

const Header = ( { history, disableViewUsers } ) => {
    const redirectAction = useCallback(
        () => {
            history.push('/admin_panel');
    }, [history]);

    const dispatch = useDispatch();
    const boundLogout = useCallback(
        () => dispatch(logout()),
        [dispatch],
    );

    const user = useSelector( getCurrUser, shallowEqual)

    return(
        <nav className="navigation">
            {!disableViewUsers && user.role === 'admin' && <Button
                name="Показать пользователей"
                type={"submit"}
                handleOnClick={redirectAction}
                btnClass={"btn btn-primary btn-admin"}
            />}
            <span className="navigation-text">Привет, {user.name}!</span>
            <span className="navigation-link" onClick={boundLogout}>Выйти</span>
        </nav>
    );
};

Header.defaultProps = {
    disableViewUsers: false,
};

Header.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    disableViewUsers: PropTypes.bool,
};

export default Header;