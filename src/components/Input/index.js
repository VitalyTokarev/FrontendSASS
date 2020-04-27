import React from 'react';
import classNames from 'classnames';

export default function Input(props) {
    const {
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
    } = props;

    const setClassInput = classInput || classNames({
        'input': true,
        'red-border': !!errorText
    });

    const setClassLabel = classLabel || 'label-input',
        setClassErrorLabel = classErrorLabel || 'label-error';

    return (
        <React.Fragment>
            {title && <label className={setClassLabel}
                htmlFor={name}
            > {title}
            </label>}
            <input onChange={handleChange}
                value={value}
                name={name}
                className={setClassInput}
                placeholder={placeholder}
                autoComplete={autoComplete || 'off'}
            />
            { !removePlaceForErrorText && <label
                className={setClassErrorLabel}
                htmlFor={name}
            > {errorText}
            </label>}
        </React.Fragment>
    );
}