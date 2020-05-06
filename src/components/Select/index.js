import React from "react";
import classNames from 'classnames';

export default props => {
    const {
        name,
        title,
        handleChange,
        placeholder,
        options,
        value,
        errorText,
        classLabel,
        classErrorLabel 
    } = props;

    const classSelect = props.classSelect || classNames({
        'form-control': true,
        'red-border': !!errorText
    });

    return (
        <React.Fragment>
            {title && <label 
                className={classLabel || 'label-input'}
                htmlFor= {name}
            > {title} 
            </label>}
            <select
                name={name}
                onChange={handleChange}
                className={classSelect}
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
                className={classErrorLabel || 'label-error'} 
                htmlFor={name}
            > {errorText} 
            </label>
        </React.Fragment>
        );
}
