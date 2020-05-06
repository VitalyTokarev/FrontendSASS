import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';

import './index.css';
import Input from '../Input';
import Button from '../Button';
import Options from './Options';
import useFieldState from '../../hooks/useFieldState';

export default props => {
    const {
        value,
        name,
        title,
        handleChange,
        placeholder,
        autoComplete,
        errorText, 
        classSelect,
        classLabel,
        classErrorLabel            
    } = props;

    const [openOptions, setOpenOptions] = useState(false);

    const [options, setOptions] = useState({
        optionsSelect: props.options,
        searchOptions: props.options, 
    });

    const [focusAppearance, setFocusAppearance] = useState(false);

    const [inputVlaue, handleChangeInput, , , , setInputValue] = useFieldState();

    const [styleOptions, setStyleOptions] = useState({});

    const mySelectRef = useRef(null);

    useEffect(() => {
        window.addEventListener('resize', renderOptionsPosition);
        return(
            window.removeEventListener('resize', renderOptionsPosition)
        );
    }, [mySelectRef]);

    useEffect(() => {
        if (openOptions) {
            renderOptionsPosition();
        }
    }, [openOptions]);

    useEffect(() => {
        setInputValue(value)
        // eslint-disable-next-line
    }, [value]);

    const renderOptionsPosition = () => {
        const box = mySelectRef.current.getBoundingClientRect();

        const boxObjects = {
            bottom: box.bottom + window.pageYOffset,
            left: box.left + window.pageXOffset,
            right: box.right + window.pageXOffset
        }

        setStyleOptions({
            top: boxObjects.bottom +'px',
            left: boxObjects.left +'px',
            width: boxObjects.right-boxObjects.left +'px',
        });
    };

    const outsideClickOptionsListener = event => {
        if( !mySelectRef.current ) { return; }
        if ( !mySelectRef.current.contains(event.target) ) { 
             document.removeEventListener('click', outsideClickOptionsListener);
            setOpenOptions(false);
            setFocusAppearance(false);
        }
    };

    const сloseOnBlurOptions = () => {
        document.addEventListener('click', outsideClickOptionsListener);
    };

    const openOnBtnArrow = () => {

        if (focusAppearance === true) {
            setFocusAppearance(false);
            return;
        }

        if (!openOptions) {
            setOpenOptions(true);
            сloseOnBlurOptions();

            return;
        }
        setOpenOptions(false);

        document.removeEventListener('click', outsideClickOptionsListener);
    };

    const openOnFocusOptions= () => {
        setOpenOptions(true);
        setFocusAppearance(true);

        сloseOnBlurOptions();
    };

    const handleOnClickOption = event => {
        if (inputVlaue !== event.target.textContent ) {
            event.target.value = event.target.textContent;
            handleChange(event);
        }
        setOpenOptions(false);
        document.removeEventListener('click', outsideClickOptionsListener);
    };

    const searchOptions = (subString = '', arrSearch = []) => {
        const newArrOption = [];
        for(const item of arrSearch) {
            if (item.toLowerCase().search(subString.toLowerCase()) !== -1) {
                newArrOption.push(item);
            }
        }
        if (newArrOption.length === 0) {
            return arrSearch;
        }
        return newArrOption;
    };

    const handleSearchOptions = event => {
        const foundOptions = searchOptions(event.target.value, options.optionsSelect);
        setOptions( state => ({
            ...state,
            searchOptions: foundOptions,
        }));
        handleChangeInput(event);
    };

    const classArrowbtn = classNames({
        'btn-arrow': true,
        'bg-image-btn-up': !openOptions,
        'bg-image-btn-down': openOptions,
    });
    
    const classInput = classNames({
        'input': true,
        'my-select-input': true,
        'red-border': !!errorText
    });

    return (
        <React.Fragment>
            {title &&<label
                className={classLabel ||'label-input'}
                htmlFor={name}
            >
                {title}
            </label>}
            <div
                className={classSelect || 'my-select'}
                onFocus={openOnFocusOptions}    
                tabIndex="0"
                ref={mySelectRef}
            >
                <Button
                    handleOnClick={openOnBtnArrow}
                    btnClass={classArrowbtn}
                    type={"button"}
                />
                <Input
                    name={name}
                    placeholder={placeholder}
                    handleChange={handleSearchOptions}
                    value={inputVlaue}
                    classInput={classInput}
                    autoComplete={autoComplete}
                    removePlaceForErrorText={true}
                />
                {openOptions && <Options
                    options={options.searchOptions}
                    handleChangeMySelect={handleOnClickOption}
                    style={styleOptions}
                />}
            </div>
            <label 
                className={classErrorLabel ||'label-error'} 
                htmlFor={name}
            > {errorText} 
            </label>
        </React.Fragment>
    );
}