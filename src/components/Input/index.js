import React from 'react';
import classNames from 'classnames';

export default function Input(props) {
    const {
        name,
        title,
        classLabel,
        classErrorLabel, 
        handleChange,
        value,
        errorText,
        placeholder,
        autoComplete,
        removePlaceForErrorText,
        type
    } = props;

    const classInput = props.classInput || classNames({
        'input': true,
        'red-border': !!errorText
    });

    return (
        <React.Fragment>
            {title && <label className={classLabel || 'label-input'}
                htmlFor={name}
            > {title}
            </label>}
            <input onChange={handleChange}
                value={value}
                name={name}
                className={classInput}
                placeholder={placeholder}
                autoComplete={autoComplete || 'off'}
                type={type || 'text'}
            />
            { !removePlaceForErrorText && <label
                className={classErrorLabel || 'label-error'}
                htmlFor={name}
            > {errorText}
            </label>}
        </React.Fragment>
    );
}