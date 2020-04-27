import React from 'react';
import { Redirect } from 'react-router-dom';

export default function RedirectTo(props) {
    return (
        <Redirect to={props.pathTo || '/'}/>
    );
};