import React from "react";

class Input extends React.Component {

    render() {
        const {
            labelClasses,
            name,
            title,
            handleChange,
            value,
            inputClasses,
            errShowInput,
            labelErrClasses,
            errorText,
            placeholder,
            autoComplete,
        } = this.props;

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
                       className={`${inputClasses} ${errShowInput}`}
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
}

export default Input;