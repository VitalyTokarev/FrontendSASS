import React from 'react';

import Select from '../Select';
import Input from '../Input';
import Button from '../Button';
import MySelect from '../MySelect';
import BootstrapContainer from '../BootstrapContainer';
import { checkEmptyAndLength } from '../../helpers/validation';

const TYPE_OPTIONS = ['Тип 1', 'Тип 2', 'Тип 3', 'Тип 4'];

const FRUIT_OPTIONS = ['Яблоко', 'Арбуз', 'Ананас', 'Апельсин'];

const INITIAL_STATE = {
    newObject: {
        value: '',
        type: '',
        fruit: ''
    },
    valueInput: '',
    selectValue: '',
    valueMySelect: '',
    nameSubmitBtn: 'Добавить',
    title: 'Добавить данные'
};

export default class BlockInput extends React.Component {
    state = {
        newObject: {
            value: '',
            type: '',
            fruit: ''
        },

        errTypeInput: '',
        errTypeSelect: '',
        errTypeMySelect: '',

        title: '',
        valueInput: '',

        selectValue: '',

        nameSubmitBtn: '',

        valueMySelect: '',  
    };

    componentDidMount = () => {
        this.setState(INITIAL_STATE);
    };

    componentDidUpdate = prevProps => {
        if (this.props.editObject !== null &&  prevProps.editObject !== this.props.editObject){

            const {
                _id,
                value,
                type, 
                fruit,
                index
            } = this.props.editObject;

            this.setState( {
                newObject: {
                    _id,
                    value,
                    type,
                    fruit
                },
                valueInput: value,
                selectValue: type,
                valueMySelect: fruit,

                nameSubmitBtn: 'Редактировать',
                title: `Редактировать элемент №${index + 1}`
            })
        }
    };


    validation = () => {
        const validInput = checkEmptyAndLength(this.state.newObject.value, 'строки', 5);
        const validSelect = checkEmptyAndLength(this.state.newObject.type);
        const validMySelect = checkEmptyAndLength(this.state.newObject.fruit);

        this.setState({
            errTypeInput: validInput,
            errTypeSelect: validSelect,
            errTypeMySelect: validMySelect,
        });

        return !validInput && !validSelect && !validMySelect;
    };

    handleChangeInput = event => {
        const value = event.target.value;
        this.setState( prevState => ({ newObject :
                {...prevState.newObject, value: value
                },
            valueInput: value,
        }));
    };

    handleChangeSelect = event => {
        const value = event.target.value;
        this.setState( prevState => ({ newObject :
                {...prevState.newObject, type: value
                },
            selectValue: value,
        }));
    };

    handleChangeMySelect = value => {
        if (value === this.state.valueMySelect) {
            return false;
        }

        this.setState(
            prevState => ({ newObject :
                    {...prevState.newObject, fruit: value
                    },
                valueMySelect: value,
            }));

        return false;
    };

    submitAction = event => {
        event.preventDefault();
        
        if ( !this.validation() ) {
            return;
        }

        this.props.getData( this.state.newObject )
        .then( successCompletion => {
            if (successCompletion) {
                this.handleClearForm();
            }
        });
    };

    handleClearForm = () => {
        this.setState(INITIAL_STATE);
    }

    render = () => {
        const {
            title,
            errTypeInput,
            valueInput,
            selectValue,
            errTypeSelect,
            nameSubmitBtn,
            errTypeMySelect,
            valueMySelect,
        } =  this.state;

        return (
            <BootstrapContainer colClasses="col-6 mx-auto">
                <form>
                    <h4 className="text-center">{title}</h4>
                    <Input
                        title="Введите значение:"
                        name={"value"}
                        errorText={errTypeInput}
                        handleChange={this.handleChangeInput}
                        value={valueInput}
                    />
                    <Select
                        title={"Выберите тип: "}
                        name={"type"}
                        value={selectValue}
                        errorText={errTypeSelect}
                        handleChange={this.handleChangeSelect}
                        options={TYPE_OPTIONS}
                    />
                    <MySelect
                        title={"Выберите фрукт: "}
                        name={"fruit"}
                        placeholder={'Выберите один из фруктов'}
                        errorText={errTypeMySelect}
                        options={FRUIT_OPTIONS}
                        value={valueMySelect}
                        handleChangeMySelect={this.handleChangeMySelect}
                    />
                    <Button
                        name={nameSubmitBtn}
                        type={"submit"}
                        handleOnClick={this.submitAction}
                        btnClass={"btn btn-primary form-btnSubmit"}
                    />
                </form>
            </BootstrapContainer>
        );
    }
}