import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, shallowEqual } from 'react-redux';

import Input from '../commons/Input';
import Button from '../commons/Button';
import MySelect from '../commons/MySelect';
import BootstrapContainer from '../commons/BootstrapContainer';
import { checkEmptyAndLength } from '../../helpers/validation';
import { useFieldsState } from '../../hooks';
import { INITIAL_TITLE_DATA } from '../../helpers/constants';
import { getAlertMessageType } from '../../helpers/getEntityFromState';
import { todoConstants} from '../../store/actionsTypes';

const TYPE_OPTIONS = ['Тип 1', 'Тип 2', 'Тип 3', 'Тип 4'];

const FRUIT_OPTIONS = ['Яблоко', 'Арбуз', 'Ананас', 'Апельсин'];

const INITIAL_FILEDS_VALUES = {
    value: '',
    type: '',
    fruit: '',
};

const FormToDo = ( {editObject, getData} ) => {
    const [ 
        object, 
        handleChange, 
        errorText, 
        setErrors, 
        resetValues, 
        setObject
    ] = useFieldsState(INITIAL_FILEDS_VALUES);

    const [ titleData, setTitleData] = useState(INITIAL_TITLE_DATA);
    const messageSuccessType = useSelector(getAlertMessageType, shallowEqual);

    useEffect(() => {
        if ( editObject ) {
            const {
                _id,
                value,
                type, 
                fruit,
                index
            } = editObject;

            setObject({
                _id,
                value,
                type,
                fruit
            });

            setTitleData({       
                nameSubmitBtn: 'Редактировать',
                title: `Редактировать объект №${index + 1}`,
            });
        }
    // eslint-disable-next-line
    }, [editObject]);

    useEffect(() => {
        if ( messageSuccessType === todoConstants.ADD_TODO 
            || messageSuccessType === todoConstants.UPDATE_TODO) {
                resetValues();
                setTitleData(INITIAL_TITLE_DATA);
        }
    }, [messageSuccessType, resetValues])

    const validation = useCallback(
        () => {
            const value = checkEmptyAndLength(object.value, 'строки', 5);
            const type = checkEmptyAndLength(object.type);
            const fruit = checkEmptyAndLength(object.fruit);

            setErrors({
                value,
                type,
                fruit,
            });

            return !value && !type && !fruit;
        }, 
        [object.fruit, object.type, object.value, setErrors]
    ); 

    const submitAction = useCallback (
        event => {
            event.preventDefault();
            
            if ( !validation() ) {
                return;
            }

            getData( object );
        }, 
        [getData, object, validation]
    );
    
    return (
        <BootstrapContainer colClasses="col-6 mx-auto">
        <form>
            <h4 className="text-center">{titleData.title}</h4>
            <Input
                title="Введите значение:"
                name="value"
                errorText={errorText.value}
                handleChange={handleChange}
                value={object.value}
            />
            <MySelect
                title="Выберите тип: "
                name="type"
                value={object.type}
                errorText={errorText.type}
                handleChange={handleChange}
                options={TYPE_OPTIONS}
            />
            <MySelect
                title="Выберите фрукт: "
                name="fruit"
                placeholder='Выберите один из фруктов'
                errorText={errorText.fruit}
                options={FRUIT_OPTIONS}
                value={object.fruit}
                handleChange={handleChange}
            />
            <Button
                name={titleData.nameSubmitBtn}
                type="submit"
                handleOnClick={submitAction}
                btnClass="Form-Button"
            />
        </form>
    </BootstrapContainer>
    );   
};

FormToDo.propTypes = {
    editObject: PropTypes.shape({
        _id: PropTypes.string,
        value: PropTypes.string,
        type: PropTypes.string,
        fruit: PropTypes.string,
        index: PropTypes.number,
    }), 
    getData: PropTypes.func.isRequired,
};

export default FormToDo;