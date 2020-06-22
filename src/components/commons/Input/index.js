import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';
import Label from '../Label';

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
    const classNameInput = classNames({
        'Input': true,
        'Input_error': !!errorText
    });

    return (
        <React.Fragment>
            {title && <Label 
                name={name}
                title={title}
            />}
            <input 
                id={name}
                onChange={handleChange}
                value={value}
                name={name}
                className={classInput ? classNameInput + ' ' + classInput : classNameInput}
                placeholder={placeholder}
                autoComplete={autoComplete}
                type={type}
            />
            { !removePlaceForErrorText && <Label 
                isErrorLabel={true}
                name={name}
                title={errorText}
            />}
        </React.Fragment>
    );
};

Input.defaultProps = {
    title: '',
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