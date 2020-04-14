import React from "react";
import classNames from "classnames";

import Select from "./Select";
import Input from "./Input";
import Button from "./Button";
import MySelect from "./MySelect";

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

    typeOpt = ['Тип 1', 'Тип 2', 'Тип 3', 'Тип 4'];

    mySelectOptions = ['Яблоко', 'Арбуз', 'Ананас', 'Апельсин'];

    initialState = {
        newObject: {
            value: '',
            type: '',
            fruit: ''
        },
        valueInput: '',
        selectValue: '',
        valueMySelect: '',
        nameSubmitBtn: 'Добавить',
        titleInput: 'Добавить данные:',
        method: 'post'
    };

    componentDidMount() {
        this.setState(this.initialState);
    }

    componentDidUpdate(prevProps) {
        if (this.props.editMode !==- 1 &&  prevProps.editMode !== this.props.editMode){
            const editObject = this.props.editData();

            this.setState( {
                newObject: {
                    value: editObject.value,
                    type: editObject.type,
                    fruit: editObject.fruit
                },
                valueInput: editObject.value,
                selectValue: editObject.type,
                valueMySelect: editObject.fruit,

                nameSubmitBtn: 'Редактировать',
                titleInput: `Редактировать элемент №${editObject.index}`
            })
        }
    }

    validationInput() {
        if (this.state.newObject.value === '') {
            return ['Введена пустая строка!', true];
        } else if (this.state.newObject.value.length < 5) {
            return ['Длина строки меньше 5 символов!', true];
        } else {
            return ['', false];
        }
    }

    validationSelect() {
        if (this.state.newObject.type === '') {
            return ['Не выбран тип!', true];
        }
        return ['', false];
    }

    validationMySelect() {
        if (this.mySelectOptions.findIndex(
            m=>m.toLowerCase()
            === this.state.valueMySelect.toLowerCase())
            === -1) {
            return ['Не выбран фрукт!', true];
        }
        return ['', false];
    }

    validationAll() {
        let validInput = this.validationInput();
        let validSelect = this.validationSelect();
        let validMySelect = this.validationMySelect();


        this.setState({
            errTypeInput: validInput[0],
            errTypeSelect: validSelect[0],
            errTypeMySelect: validMySelect[0],
            errShowInput: validInput[1],
            errShowSelect: validSelect[1],
            errShowMySelect: validMySelect[1],


        });

        return validInput[0] === '' && validSelect[0] === '' && validMySelect[0] === '';
    }

    handleChangeInput = e => {
        let value = e.target.value;
        this.setState( prevState => ({ newObject :
                {...prevState.newObject, value: value
                },
            valueInput: value
        }));
    };

    handleChangeSelect = e => {
        let value = e.target.value;
        this.setState( prevState => ({ newObject :
                {...prevState.newObject, type: value
                },
            selectValue: value
        }));
    };

    handleValueMySelect = e => {
        this.setState( {
            valueMySelect: e.target.value,
        });
    };

    handleChangeMySelect = e => {
        if (e === this.state.valueMySelect) {

            return false;
        }

        this.setState(
            prevState => ({ newObject :
                    {...prevState.newObject, fruit: e
                    },
                valueMySelect: e,
            }));

        return false;
    };

    submitAction = e => {
        e.preventDefault();
        if ( !this.validationAll() ) {
            return;
        }

        this.props.getData(this.state.newObject);
        this.handleClearForm();
    };

    handleClearForm() {
        this.setState(this.initialState);
    }

    sendObjectToServer() {
        
    }

    render() {
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
                            options={this.typeOpt}
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
                            options={this.mySelectOptions}
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