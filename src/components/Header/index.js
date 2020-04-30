import React from 'react';

import './index.css';
import Button from '../Button';
import { UseAuth } from '../../context/Auth';

export default function header(props) {
    const { isAdmin, logout, getNameCurrUser } = UseAuth();
    const redirectAction = () => {
        props.history.push('/admin_panel');
    };

    return(
        <nav className="navigation">
            {!props.disableViewUsers && isAdmin() && <Button
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