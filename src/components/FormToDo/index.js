import React, { useState, useEffect } from 'react';

import Select from '../Select';
import Input from '../Input';
import Button from '../Button';
import MySelect from '../MySelect';
import BootstrapContainer from '../BootstrapContainer';
import { checkEmptyAndLength } from '../../helpers/validation';
import useFieldState from '../../hooks/useFieldState';
import { INITIAL_TITLE_DATA } from '../../helpers/constants';

const TYPE_OPTIONS = ['Тип 1', 'Тип 2', 'Тип 3', 'Тип 4'];

const FRUIT_OPTIONS = ['Яблоко', 'Арбуз', 'Ананас', 'Апельсин'];

export default ( {editObject, getData} ) => {
    const [ value, handleChangeValue, errorTextValue, setErrorValue, resetValue, setVlaue ] = useFieldState();
    const [ type, handleChangeType, errorTextType, setErrorType, resetType, setType ] = useFieldState();
    const [ fruit, handleChangeFruit, errorTextFruit, setErrorFruit, resetFruit, setFruit ] = useFieldState();
    
    const [ titleData, setTitleData] = useState(INITIAL_TITLE_DATA);
    const [object, setObject] = useState({});

    useEffect(() => {
        setObject( state => ({
            ...state,
            value,
            type, 
            fruit,
        }));
    }, [ value, type, fruit]);

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

            setVlaue(value);
            setType(type);
            setFruit(fruit);

            setTitleData({       
                nameSubmitBtn: 'Редактировать',
                title: `Редактировать пользователя №${index + 1}`,
            });
        }
    // eslint-disable-next-line
    }, [editObject]);

    const validation = () => {
        const validValue = checkEmptyAndLength(value, 'строки', 5);
        const validType = checkEmptyAndLength(type);
        const validFruit = checkEmptyAndLength(fruit);

        setErrorValue(validValue);
        setErrorType(validType);
        setErrorFruit(validFruit);

        return !validValue && !validType && !validFruit;
    }; 

    const handleClearForm = () => {
        resetValue();
        resetType();
        resetFruit();
        setTitleData(INITIAL_TITLE_DATA);
        setObject({});
    };

    const submitAction = event => {
        event.preventDefault();
        
        if ( !validation() ) {
            return;
        }

        getData( object )
        .then( successCompletion => {
            if (successCompletion) {
                handleClearForm();
            }
        });
    };
    
    return (
        <BootstrapContainer colClasses="col-6 mx-auto">
        <form>
            <h4 className="text-center">{titleData.title}</h4>
            <Input
                title="Введите значение:"
                name={"value"}
                errorText={errorTextValue}
                handleChange={handleChangeValue}
                value={value}
            />
            <Select
                title={"Выберите тип: "}
                name={"type"}
                value={type}
                errorText={errorTextType}
                handleChange={handleChangeType}
                options={TYPE_OPTIONS}
            />
            <MySelect
                title={"Выберите фрукт: "}
                name={"fruit"}
                placeholder={'Выберите один из фруктов'}
                errorText={errorTextFruit}
                options={FRUIT_OPTIONS}
                value={fruit}
                handleChange={handleChangeFruit}
            />
            <Button
                name={titleData.nameSubmitBtn}
                type={"submit"}
                handleOnClick={submitAction}
                btnClass={"btn btn-primary form-btnSubmit"}
            />
        </form>
    </BootstrapContainer>
    );   
}