import React from "react";
import classNames from 'classnames';

export default function Select(props) {
    const {
        name,
        title,
        handleChange,
        placeholder,
        options,
        value,
        errorText,
        classSelect,
        classLabel,
        classErrorLabel 
    } = props;

    const setClassSelect = classSelect || classNames({
        'form-control': true,
        'red-border': !!errorText
    });

    const setClassLabel = classLabel || 'label-input',
        setClassErrorLabel = classErrorLabel || 'label-error';

    return (
        <React.Fragment>
            {title && <label 
                className={setClassLabel}
                htmlFor= {name}
            > {title} 
            </label>}
            <select
                name={name}
                onChange={handleChange}
                className={setClassSelect}
                value={value}
            >
                <option value="" disabled>{placeholder}</option>
                {options.map(option => {
                    return (
                        <option
                            key={option}
                            value={option}
                            label={option}>{option}
                        </option>
                    );
                })}
            </select>
            <label 
                className={setClassErrorLabel} 
                htmlFor={name}
            > {errorText} 
            </label>
        </React.Fragment>
        );
}
