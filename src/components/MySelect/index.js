import React, { useState, useEffect, useRef, useCallback } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';
import Input from '../Input';
import Button from '../Button';
import Options from './Options';
import { useFieldsState } from '../../hooks';

const MySelect = ({
    options,
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
}) => {

    const [openOptions, setOpenOptions] = useState(false);

    const [optionsObject, setOptionsObjects] = useState({
        optionsSelect: options,
        searchOptions: options, 
    });

    const [focusAppearance, setFocusAppearance] = useState(false);

    const [input, handleChangeInput, , , , setInputValue] = useFieldsState( { [name]: '' } );

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
        setInputValue( 
            { 
                [name]: value
            } 
        );
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

    const outsideClickOptionsListener = useCallback(
        event => {
            if( !mySelectRef.current ) { return; }
            if ( !mySelectRef.current.contains(event.target) ) { 
                document.removeEventListener('click', outsideClickOptionsListener);
                setOpenOptions(false);
                setFocusAppearance(false);
            }
    }, []);

    const сloseOnBlurOptions = useCallback(
        () => {
            document.addEventListener('click', outsideClickOptionsListener);
    }, [outsideClickOptionsListener]);

    const openOnBtnArrow = useCallback(
        () => {

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
    }, [focusAppearance, openOptions, outsideClickOptionsListener, сloseOnBlurOptions]);

    const openOnFocusOptions = useCallback (
        () => {
            setOpenOptions(true);
            setFocusAppearance(true);

            сloseOnBlurOptions();
    }, [сloseOnBlurOptions]);

    const handleOnClickOption = useCallback(
        event => {
            if (input[name] !== event.target.textContent ) {
                event.target.value = event.target.textContent;
                event.target.name = name;
                handleChange(event);
            }
            setOpenOptions(false);
            document.removeEventListener('click', outsideClickOptionsListener);
    }, [handleChange, input, name, outsideClickOptionsListener]);

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

    const handleSearchOptions = useCallback(
        event => {
            const foundOptions = searchOptions(event.target.value, optionsObject.optionsSelect);

            setOptionsObjects( state => ({
                ...state,
                searchOptions: foundOptions,
            }));

            handleChangeInput(event);
    }, [handleChangeInput, optionsObject.optionsSelect]);

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
                className={classLabel}
                htmlFor={name}
            >
                {title}
            </label>}
            <div
                className={classSelect}
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
                    value={input[name]}
                    classInput={classInput}
                    autoComplete={autoComplete}
                    removePlaceForErrorText={true}
                />
                {openOptions && <Options
                    options={optionsObject.searchOptions}
                    handleChangeMySelect={handleOnClickOption}
                    style={styleOptions}
                />}
            </div>
            <label 
                className={classErrorLabel} 
                htmlFor={name}
            > {errorText} 
            </label>
        </React.Fragment>
    );
};

MySelect.defaultProps = {
    options: [],
    title: '',
    placeholder: '',
    autoComplete: 'off',
    errorText: '',
    classSelect: 'my-select',
    classLabel: 'label-input',
    classErrorLabel: 'label-error',
};

MySelect.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    autoComplete: PropTypes.string,
    errorText: PropTypes.string, 
    classSelect: PropTypes.string,
    classLabel: PropTypes.string,
    classErrorLabel: PropTypes.string,
};

export default MySelect;