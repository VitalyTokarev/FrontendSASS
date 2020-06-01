import React from "react";
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Select = ({
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
}) => {

    const classNameSelect = classSelect || classNames({
        'form-control': true,
        'red-border': !!errorText
    });

    return (
        <React.Fragment>
            {title && <label 
                className={classLabel}
                htmlFor={name}
            > {title} 
            </label>}
            <select
                id={name}
                name={name}
                onChange={handleChange}
                className={classNameSelect}
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
                className={classErrorLabel} 
                htmlFor={name}
            > {errorText} 
            </label>
        </React.Fragment>
        );
};

Select.defaultProps = {
    options: [],
    title: '',
    placeholder: '',
    errorText: '',
    classLabel: 'label-input',
    classErrorLabel: 'label-error',
};

Select.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.string.isRequired,
    errorText: PropTypes.string,
    classLabel: PropTypes.string,
    classErrorLabel: PropTypes.string,
};

export default Select;
