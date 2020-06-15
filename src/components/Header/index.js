import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import './index.css';
import Button from '../Button';
import { logout } from '../../store/flows';
import { getCurrUser } from '../../helpers/getEntityFromState';
import { history } from '../../helpers/constants';

const Header = ( { disableViewUsers } ) => {
    const redirectAction = useCallback(
        () => {
            history.push('/admin_panel');
    }, []);

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
            <span className="navigation-text">Привет, {user ? user.name : ''}!</span>
            <span className="navigation-link" onClick={boundLogout}>Выйти</span>
        </nav>
    );
};

Header.defaultProps = {
    disableViewUsers: false,
};

Header.propTypes = {
    disableViewUsers: PropTypes.bool,
};

export default Header;