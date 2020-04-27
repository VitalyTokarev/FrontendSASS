import React from 'react';

import './header.css';

export default function header(props) {
    return(
        <nav className="navigation  ml-auto">
            <span className="navigation-text">Привет, {props.userName}!</span>
            <span className="navigation-link" onClick={props.logout}>Выйти</span>
        </nav>
    );
};