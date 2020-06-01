import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Input = ({
    name,
    title,
    classInput,
    classLabel,
    classErrorLabel, 
    handleChange,
    value,
    errorText,
    placeholder,
    autoComplete,
    removePlaceForErrorText,
    type
}) => {
    const classNameInput = classInput || classNames({
        'input': true,
        'red-border': !!errorText
    });

    return (
        <React.Fragment>
            {title && <label 
                className={classLabel}
                htmlFor={name}
            > {title}
            </label>}
            <input 
                id={name}
                onChange={handleChange}
                value={value}
                name={name}
                className={classNameInput}
                placeholder={placeholder}
                autoComplete={autoComplete}
                type={type}
            />
            { !removePlaceForErrorText && <label
                className={classErrorLabel}
                htmlFor={name}
            > {errorText}
            </label>}
        </React.Fragment>
    );
};

Input.defaultProps = {
    title: '',
    classLabel: 'label-input',
    autoComplete: 'off',
    type: 'text',
    classErrorLabel: 'label-error',
    removePlaceForErrorText: false,
    errorText: '',
    placeholder: '',
};

Input.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    classInput: PropTypes.string,
    classLabel: PropTypes.string,
    classErrorLabel: PropTypes.string, 
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    errorText: PropTypes.string,
    placeholder: PropTypes.string,
    autoComplete: PropTypes.string,
    removePlaceForErrorText: PropTypes.bool,
    type: PropTypes.string,
};

export default Input;