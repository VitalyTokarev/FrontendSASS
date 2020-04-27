import React from 'react';
import { nanoid } from 'nanoid';

import Select from '../Select';
import Input from '../Input';
import Button from '../Button';
import MySelect from '../MySelect';
import BootstrapContainer from '../BootstrapContainer';

const typeOpt = ['Тип 1', 'Тип 2', 'Тип 3', 'Тип 4'];

const mySelectOptions = ['Яблоко', 'Арбуз', 'Ананас', 'Апельсин'];

const initialState = {
    newObject: {
        value: '',
        type: '',
        fruit: ''
    },
    valueInput: '',
    selectValue: '',
    valueMySelect: '',
    nameSubmitBtn: 'Добавить',
    titleInput: 'Добавить данные:'
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

        titleInput: '',
        valueInput: '',

        selectValue: '',

        nameSubmitBtn: '',

        valueMySelect: '',  
    };

    componentDidMount = () => {
        this.setState(initialState);
    }

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
                titleInput: `Редактировать элемент №${index + 1}`
            })
        }
    }

    validationInput = () => {
        if ( !this.state.newObject.value ) {
            return 'Введена пустая строка!';
        } else if (this.state.newObject.value.length < 5) {
            return 'Длина строки меньше 5 символов!';
        } else {
            return '';
        }
    }

    validationSelect = (item, name) => {
        if ( !item ) {
            return `Не выбран ${name}!`;
        }
        return '';
    }

    validationAll = () => {
        const validInput = this.validationInput();
        const validSelect = this.validationSelect(this.state.newObject.type, 'тип');
        const validMySelect = this.validationSelect(this.state.newObject.fruit, 'фрукт');

        this.setState({
            errTypeInput: validInput,
            errTypeSelect: validSelect,
            errTypeMySelect: validMySelect,
        });

        return !validInput && !validSelect && !validMySelect;
    }

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

    setIdToObject = object => {

        let id;

        if (object._id) {
            id = object._id;
        } else {
            id = nanoid();
        }

        return {
            _id: id,
            value: object.value,
            type: object.type,
            fruit: object.fruit,
        };
    }

    submitAction = event => {
        event.preventDefault();
        
        if ( !this.validationAll() ) {
            return;
        }

        this.props.getData(
            this.setIdToObject(this.state.newObject)
        ).then( successCompletion => {
            if (successCompletion) {
                this.handleClearForm();
            }
        });
    };

    handleClearForm = () => {
        this.setState(initialState);
    }

    render = () => {
        const {
            titleInput,
            editValueInput,
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
                    <Input
                        title={titleInput}
                        name={"value"}
                        changeValue={editValueInput}
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
                        options={typeOpt}
                    />
                    <MySelect
                        title={"Выберите фрукт: "}
                        name={"fruit"}
                        placeholder={'Выберите один из фруктов'}
                        errorText={errTypeMySelect}
                        options={mySelectOptions}
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