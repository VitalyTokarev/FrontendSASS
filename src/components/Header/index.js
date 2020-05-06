import React from 'react';

import './index.css';
import Button from '../Button';
import { useAuthContext } from '../../context/Auth';

export default ( { history, disableViewUsers } ) => {
    const { isAdmin, logout, getNameCurrUser } = useAuthContext();
    const redirectAction = () => {
        history.push('/admin_panel');
    };

    return(
        <nav className="navigation">
            {!disableViewUsers && isAdmin() && <Button
                name="Показать пользователей"
                type={"submit"}
                handleOnClick={redirectAction}
                btnClass={"btn btn-primary btn-admin"}
            />}
            <span className="navigation-text">Привет, {getNameCurrUser()}!</span>
            <span className="navigation-link" onClick={logout}>Выйти</span>
        </nav>
    );
};