import React from "react";
import PropTypes from 'prop-types';

import './index.css';

const Button = ({
    handleOnClick,
    btnClass,
    type,
    name,
    disabled
}) => {

    return (
        <button
            type={type}
            onClick={handleOnClick}
            className={btnClass ? 'Button ' + btnClass : 'Button'}
            disabled={disabled}
        >{name}
        </button>
    );
};

Button.defaultProps = {
    type: 'button',
    disabled: false,
};

Button.propTypes = {
    type: PropTypes.string,
    handleOnClick: PropTypes.func.isRequired,
    btnClass: PropTypes.string,
    name: PropTypes.string,
    disabled: PropTypes.bool,
};

export default Button;