import React from "react";

export default function Input(props) {
    const {
        labelClasses,
        name,
        title,
        handleChange,
        value,
        inputClasses,
        labelErrClasses,
        errorText,
        placeholder,
        autoComplete,
    } = props;

    return (
        <React.Fragment>
            <label className={labelClasses}
                    htmlFor={name}
            >
                {title}
            </label>
            <input onChange={handleChange}
                    value={value}
                    name={name}
                    className={inputClasses}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
            />
            <label
                className={labelErrClasses}
                htmlFor={name}
            >{errorText}
            </label>
        </React.Fragment>
    );
}