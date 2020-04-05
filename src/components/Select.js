import React from "react";

class Select extends React.Component {

    render() {
        const {
            labelClasses,
            name,
            title,
            handleChange,
            selectClasses,
            showErr,
            placeholder,
            options,
            value,
            labelErrClasses,
            errorText
        } = this.props;

        return (
            <React.Fragment>
                <label className={labelClasses} htmlFor= {name}> {title} </label>
                <select
                    name={name}
                    onChange={handleChange}
                    className={`${selectClasses} ${showErr}`}
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
}

export default Select;