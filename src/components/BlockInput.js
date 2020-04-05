import React from "react";
import Select from "./Select";
import Input from "./Input";
import Button from "./Button";
import MySelect from "./MySelect";

class BlockInput extends React.Component {
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

            closeStateMySelect: '',
            valueMySelect: '',
            searchOptionMySelect: [],
            arrowChange: '',
            focusAppearance: ''    
        };

    typeOpt = ['Тип 1', 'Тип 2', 'Тип 3', 'Тип 4'];

    mySelectOptions = ['Яблоко', 'Арбуз', 'Ананас', 'Апельсин'];

    errBorderClass = 'red-border';

    btnArrowClass = 'btn-arrow';

    arrowUpClass = 'bg-image-btn-up';

    arrowDownClass = 'bg-image-btn-down';

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

        closeStateMySelect: true,
        focusAppearance: false,
        searchOptionMySelect: this.mySelectOptions,
        arrowChange: this.btnArrowClass + ' ' + this.arrowDownClass
    };

    componentDidMount() {
        this.setState(this.initialState);
    }

    componentDidUpdate(prevProps) {
        if(this.props.editMode !==- 1 &&  prevProps.editMode !== this.props.editMode){
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
                titleInput: `Редактировать элемент №${editObject.id}`
            })
        }
    }

    /*MySelect methods*/

    handleBtnArrowSelect = () => {
        if(this.state.focusAppearance === true) {
            this.setState({focusAppearance: false});
            return;
        }

        if(this.state.arrowChange.search(this.arrowDownClass) !== -1) {
            this.setState({
                closeStateMySelect: false,
                arrowChange: this.btnArrowClass + ' ' + this.arrowUpClass
            });
            return;
        }

        this.setState({
            closeStateMySelect: true,
            arrowChange: this.btnArrowClass + ' ' + this.arrowDownClass
        });
    }

    closeOptionsSelect = () => {
        this.setState({
            closeStateMySelect: true,
            arrowChange: this.btnArrowClass + ' ' + this.arrowDownClass,
            focusAppearance:false
        });
    }

    openOptionsSelect = () => {
        this.setState({
            closeStateMySelect: false,
            arrowChange: this.btnArrowClass + ' ' + this.arrowUpClass,
            focusAppearance: true
        });
    };

    onClickOptionSelect = e => {
        if(e === this.state.valueMySelect)
        {
            this.setState({
                closeStateMySelect: true,
                arrowChange: this.btnArrowClass + ' ' + this.arrowDownClass
            });
            return;
        }

        this.setState(
            prevState => ({ newObject :
                    {...prevState.newObject, fruit: e
                    },
                valueMySelect: e,
                closeStateMySelect: true,
                arrowChange: this.btnArrowClass + ' ' + this.arrowDownClass
            }));
    };

    handleChangeMySelect = e => {
        const searchOptions = this.substrSearch(e.target.value, this.mySelectOptions);

        this.setState( {
                valueMySelect: e.target.value,
                searchOptionMySelect: searchOptions
        });
    };


    substrSearch = (subString = '', arrSearch = []) => {
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

    /*Validation methods*/

    validationInput() {
        if (this.state.newObject.value === '') {
            return ['Введена пустая строка!', this.errBorderClass];
        } else if (this.state.newObject.value.length < 5) {
            return ['Длина строки меньше 5 символов!', this.errBorderClass];
        } else {
            return ['', ''];
        }
    }

    validationSelect() {
        if (this.state.newObject.type === '') {
            return ['Не выбран тип!', this.errBorderClass];
        }
        return ['', ''];
    }

    validationMySelect() {
        if(this.mySelectOptions.findIndex(
            m=>m.toLowerCase()
            === this.state.valueMySelect.toLowerCase())
            === -1) {
            return ['Не выбран фрукт!', this.errBorderClass];
        }
        return ['', ''];
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

    /*handle methods*/

    handleValueInput = e => {
        let value = e.target.value;
        this.setState( prevState => ({ newObject :
                {...prevState.newObject, value: value
                },
            valueInput: value
        }));
    };

    handleValueSelect = e => {
        let value = e.target.value;
        this.setState( prevState => ({ newObject :
                {...prevState.newObject, type: value
                },
            selectValue: value
        }));
    };

    submitAction = (e) => {
        e.preventDefault();
        if(!this.validationAll()){
            return;
        }

        this.props.getData(this.state.newObject);
        this.handleClearForm();
    };

    handleClearForm() {
        this.setState(this.initialState);
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
            searchOptionMySelect,
            closeStateMySelect,
            valueMySelect,
            arrowChange
        } =  this.state;

        return (
            <div className="row">
                <div id="input-block" className={'col-6 mx-auto'}>
                    <form>
                        <Input
                            title={titleInput}
                            name={"value"}
                            inputClasses={"input"}
                            labelClasses={"label-input"}
                            labelErrClasses={"label-error"}
                            errShowInput={errShowInput}
                            changeValue={editValueInput}
                            errorText={errTypeInput}
                            handleChange={this.handleValueInput}
                            value={valueInput}
                            autoComplete={"off"}
                        />
                        <Select
                            title={"Выберите тип: "}
                            name={"type"}
                            labelClasses={"label-input"}
                            labelErrClasses={"label-error"}
                            selectClasses={"form-control"}
                            value={selectValue}
                            showErr={errShowSelect}
                            errorText={errTypeSelect}
                            handleChange={this.handleValueSelect}
                            options={this.typeOpt}
                        />
                        <MySelect
                            title={"Выберите фрукт: "}
                            name={"fruit"}
                            labelClasses={"label-input"}
                            labelErrClasses={"label-error"}
                            classMySelect={"my-select"}
                            autoComplete={"off"}
                            placeholder={'Выберите один из фруктов'}
                            errShowInput={errShowMySelect}
                            errorText={errTypeMySelect}
                            handleChange={this.handleChangeMySelect}
                            options={searchOptionMySelect}
                            closeOptionsSelect={this.closeOptionsSelect}
                            closeState={closeStateMySelect}
                            value={valueMySelect}
                            onClickOption={this.onClickOptionSelect}
                            handleBtnArrowSelect={this.handleBtnArrowSelect}
                            btnArrowClass={arrowChange}
                            openOptionsSelect={this.openOptionsSelect}
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

export default BlockInput;