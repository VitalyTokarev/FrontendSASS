import React from "react";

import '../css/my-select.css';
import classNames from 'classnames';
import Input from "./Input";
import Button from "./Button";
import Options from "./Options";

export default class MySelect extends React.Component {    
    
    constructor(props) {
        super(props);
        this.state = {
            closeOptions: true,
            optionsSelect: props.options,
            focusAppearance: false
        };
    }

    componentDidMount() {
        this.fullOptions = this.state.optionsSelect;
        this.firstUpdate = false;

        window.addEventListener('resize', this.renderOptionsPosition);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.renderOptionsPosition);
    }

    componentDidUpdate() {
        if(!this.firstUpdate){
            this.renderOptionsPosition();
            this.firstUpdate = true;
        }
    }

    getOptionsRef = (node) => {
        this.refOptions = node;
    }

    getMySelectRef = (node) => {
        this.refMySelect = node;
    }

    openOnBtnArrow = () => {
        if(this.state.focusAppearance === true) {
            this.setState({focusAppearance: false});
            return;
        }

        if(this.state.closeOptions) {
            this.setState({
                closeOptions: false
            });
            return;
        }

        this.setState({
            closeOptions: true
        });

    }

    openOnFocusOptions= () => {
        this.setState({
            closeOptions: false,
            focusAppearance: true
        });
        this.сloseOnBlurOptions();
    };

    сloseOnBlurOptions() {
        document.addEventListener('click', this.outsideClickOptionsListener);
    }

    closeOnClickOption = value => {
        this.props.handleChangeMySelect(value);
        this.setState({closeOptions: true});
    }

    outsideClickOptionsListener = event => {
        if (!this.refOptions.contains(event.target) && !this.refMySelect.contains(event.target)) { 
             document.removeEventListener('click', this.outsideClickOptionsListener);
             this.setState({
                closeOptions: true,
                focusAppearance:false
            });
        }
    }

    renderOptionsPosition = () => {
        const box = this.refMySelect.getBoundingClientRect();

        const boxObjects = {
            bottom: box.bottom + window.pageYOffset,
            left: box.left + window.pageXOffset,
            right: box.right + window.pageXOffset
        }
        this.refOptions.style.cssText = `
          top: ${boxObjects.bottom}px;
          left: ${boxObjects.left}px;
          width: ${boxObjects.right-boxObjects.left}px;
        `;
    }

    searchOptions = event => {
        const foundOptions = this.getOptionsSearch(event.target.value, this.fullOptions);
        this.setState( { optionsSelect: foundOptions } );
        this.props.handleChangeInput(event);
    }

    getOptionsSearch = (subString = '', arrSearch = []) => {
        const newArrOption = [];
        for(let item of arrSearch) {
            if(item.toLowerCase().search(subString.toLowerCase()) !== -1) {
                newArrOption.push(item);
            }
        }
        if(newArrOption.length === 0) {
            return arrSearch;
        }
        return newArrOption;
    };

    render() {
        const {
            classMySelect,
            labelClasses,
            inputClasses,
            labelErrClasses,
            name,
            title,
            placeholder,
            value,
            autoComplete,
            errorText,             
        } = this.props;

        const {
            closeOptions,
            optionsSelect,
        } = this.state;

        const classArrowbtn = classNames({
            'btn-arrow': true,
            'bg-image-btn-up': !closeOptions,
            'bg-image-btn-down': closeOptions,
        });

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
                    onFocus={this.openOnFocusOptions}    
                    tabIndex="0"
                    ref={this.getMySelectRef}
                >
                    <Button
                        handleOnClick={this.openOnBtnArrow}
                        btnClass={classArrowbtn}
                        type={"button"}
                    />
                    <Input
                        name={name}
                        placeholder={placeholder}
                        handleChange={this.searchOptions}
                        value={value}
                        inputClasses={inputClasses}
                        autoComplete={autoComplete}
                    />
                    <Options
                        classMySelect={classMySelect}
                        closeState={closeOptions}
                        options={optionsSelect}
                        handleChangeMySelect={this.closeOnClickOption}
                        getOptionsRef={this.getOptionsRef}
                    />
                </div>
                <label className={labelErrClasses} htmlFor={name}> {errorText} </label>
            </React.Fragment>
        )
    }
}