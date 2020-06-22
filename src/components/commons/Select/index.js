import React from "react";
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';
import Label from '../Label';

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

    const classNameSelect = classNames({
        'Select': true,
        'Select_error': !!errorText
    });

    return (
        <React.Fragment>
            {title && <Label 
                name={name}
                title={title}
            />}
            <select
                id={name}
                name={name}
                onChange={handleChange}
                className={classSelect ? classNameSelect + ' ' + classSelect : classNameSelect}
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
            <Label 
                isErrorLabel={true}
                name={name}
                title={errorText}
            />
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
