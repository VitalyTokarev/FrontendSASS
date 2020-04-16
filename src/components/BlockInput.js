import React from "react";
import classNames from "classnames";
import {nanoid} from 'nanoid';

import Select from "./Select";
import Input from "./Input";
import Button from "./Button";
import MySelect from "./MySelect";

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
        
        errShowInput: '',
        errShowSelect: '',

        errShowMySelect: '',
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
                id,
                value,
                type, 
                fruit,
                index
            } = this.props.editObject;

            this.setState( {
                newObject: {
                    id,
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
        if (this.state.newObject.value === '') {
            return ['Введена пустая строка!', true];
        } else if (this.state.newObject.value.length < 5) {
            return ['Длина строки меньше 5 символов!', true];
        } else {
            return ['', false];
        }
    }

    validationSelect = () => {
        if (this.state.newObject.type === '') {
            return ['Не выбран тип!', true];
        }
        return ['', false];
    }

    validationMySelect = () => {
        if (this.state.newObject.fruit === '') {
            return ['Не выбран фрукт!', true];
        }
        return ['', false];
    }

    validationAll = () => {
        const validInput = this.validationInput();
        const validSelect = this.validationSelect();
        const validMySelect = this.validationMySelect();


        this.setState({
            errTypeInput: validInput[0],
            errTypeSelect: validSelect[0],
            errTypeMySelect: validMySelect[0],
            errShowInput: validInput[1],
            errShowSelect: validSelect[1],
            errShowMySelect: validMySelect[1],
        });

        return !validInput[1] && !validSelect[1] && !validMySelect[1];
    }

    handleChangeInput = event => {
        const value = event.target.value;
        this.setState( prevState => ({ newObject :
                {...prevState.newObject, value: value
                },
            valueInput: value
        }));
    };

    handleChangeSelect = event => {
        const value = event.target.value;
        this.setState( prevState => ({ newObject :
                {...prevState.newObject, type: value
                },
            selectValue: value
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

        if (object.id === undefined) {
            id = nanoid();
        } else {
            id = object.id
        }

        return {
            id: id,
            value: object.value,
            type: object.type,
            fruit: object.fruit
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
            if(successCompletion) {
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
            errShowInput,
            editValueInput,
            errTypeInput,
            valueInput,
            selectValue,
            errShowSelect,
            errTypeSelect,
            nameSubmitBtn,
            errShowMySelect,
            errTypeMySelect,
            valueMySelect,
        } =  this.state;

        const classInput = classNames({
            'input': true,
            'red-border': errShowInput
        });

        const classSelect = classNames({
            'form-control': true,
            'red-border': errShowSelect
        });

        const classInputMySelect = classNames({
            'input': true,
            'my-select-input': true,
            'red-border': errShowMySelect
        });

        return (
            <div className="row">
                <div id="input-block" className={'col-6 mx-auto'}>
                    <form>
                        <Input
                            title={titleInput}
                            name={"value"}
                            inputClasses={classInput}
                            labelClasses={"label-input"}
                            labelErrClasses={"label-error"}
                            changeValue={editValueInput}
                            errorText={errTypeInput}
                            handleChange={this.handleChangeInput}
                            value={valueInput}
                            autoComplete={"off"}
                        />
                        <Select
                            title={"Выберите тип: "}
                            name={"type"}
                            labelClasses={"label-input"}
                            labelErrClasses={"label-error"}
                            selectClasses={classSelect}
                            value={selectValue}
                            errorText={errTypeSelect}
                            handleChange={this.handleChangeSelect}
                            options={typeOpt}
                        />
                        <MySelect
                            title={"Выберите фрукт: "}
                            name={"fruit"}
                            labelClasses={"label-input"}
                            inputClasses={classInputMySelect}
                            labelErrClasses={"label-error"}
                            classMySelect={"my-select"}
                            autoComplete={"off"}
                            placeholder={'Выберите один из фруктов'}
                            errorText={errTypeMySelect}
                            handleChangeInput={this.handleValueMySelect}
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
                </div>
            </div>
        );
    }
}