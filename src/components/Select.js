import React from "react";

export default function Select(props) {
    const {
        labelClasses,
        name,
        title,
        handleChange,
        selectClasses,
        placeholder,
        options,
        value,
        labelErrClasses,
        errorText
    } = props;

    return (
        <React.Fragment>
            <label className={labelClasses} htmlFor= {name}> {title} </label>
            <select
                name={name}
                onChange={handleChange}
                className={selectClasses}
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
            <label className={labelErrClasses} htmlFor={name}> {errorText} </label>
        </React.Fragment>
        );
}
