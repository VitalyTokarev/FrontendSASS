import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const RedirectTo = ( { pathTo } ) => {
    return (
        <Redirect to={pathTo}/>
    );
};

RedirectTo.defaultProps = {
    pathTo: '/',
};

RedirectTo.propTypes = {
    pathTo: PropTypes.string,
};

export default RedirectTo;