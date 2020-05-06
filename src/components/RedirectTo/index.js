import React from 'react';
import { Redirect } from 'react-router-dom';

export default ( { pathTo } ) => {
    return (
        <Redirect to={pathTo || '/'}/>
    );
};