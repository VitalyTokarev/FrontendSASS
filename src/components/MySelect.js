import React from "react";
import '../css/my-select.css';
import Input from "./Input";
import Button from "./Button";
import Options from "./Options";

class MySelect extends React.Component {
    render() {
        const {
            classMySelect,
            openOptionsSelect,
            labelClasses,
            name,
            title,
            placeholder,
            handleChange,
            value,
            errShowInput,
            autoComplete,
            labelErrClasses,
            errorText,
            btnArrowClass,
            handleBtnArrowSelect,
            closeState,
            options,
            onClickOption,
            closeOptionsSelect
        } = this.props;

        return (
            <React.Fragment>
                <label
                    className={labelClasses}
                    htmlFor={name}
                >
                    {title}
                </label>
                <div
                    className={classMySelect}
                    onFocus={openOptionsSelect}    
                    tabIndex="0"
                >
                    <Button
                        handleOnClick={handleBtnArrowSelect}
                        btnClass={btnArrowClass}
                        type={"button"}
                    />
                    <Input
                        name={name}
                        placeholder={placeholder}
                        handleChange={handleChange}
                        value={value}
                        inputClasses={'input my-select-input'}
                        errShowInput={errShowInput}
                        autoComplete={autoComplete}
                    />
                    <Options
                        classMySelect={classMySelect}
                        closeState={closeState}
                        options={options}
                        onClickOption={onClickOption}
                        closeOptionsSelect={closeOptionsSelect}
                    />
                </div>
                <label className={labelErrClasses} htmlFor={name}> {errorText} </label>
            </React.Fragment>
        )
    }
}

export default MySelect;