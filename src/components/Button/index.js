import React from "react";
import PropTypes from 'prop-types';

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
            className={btnClass}
            disabled={disabled}
        >{name}
        </button>
    );
};

Button.defaultProps = {
    type: 'button',
    disabled: false,
    btnClass: '',
};

Button.propTypes = {
    type: PropTypes.string,
    handleOnClick: PropTypes.func.isRequired,
    btnClass: PropTypes.string,
    name: PropTypes.string,
    disabled: PropTypes.bool,
};

export default Button;