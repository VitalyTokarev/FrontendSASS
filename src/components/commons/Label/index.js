import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const Label = ({
    name,
    title,
    isErrorLabel
    
}) => {
    return (
    <label 
        className={isErrorLabel ? 'Label Label_error' : 'Label'}
        htmlFor={name}
    > {title}
    </label>
    );
};

Label.defaultProps = {
    title: '',
    isErrorLabel: false
};

Label.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    isErrorLabel: PropTypes.bool
};

export default Label;