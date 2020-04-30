import React from 'react';

import Input from '../Input';
import Button from '../Button';
import BootstrapContainer from '../BootstrapContainer';
import { checkEmptyAndLength,  validationEmail } from '../../helpers/validation';

const INITIAL_STATE = {
    user: {
        name: '',
        email: '',
        password: '',
    },

    nameInputValue: '',
    emailInputValue: '',
    passwordInputValue: '',

    nameSubmitBtn: 'Добавить',
    title: 'Добавить пользователя',
    requiredPassword: true
};

export default class BlockInput extends React.Component {
    state = {
        user: {},

        errTextName: '',
        errTextEmail: '',
        errTextPassword: '',

        nameInputValue: '',
        emailInputValue: '',
        passwordInputValue: '',
    
        nameSubmitBtn: '',
        title: '', 

        requiredPassword: '',
    };

    componentDidMount = () => {
        this.setState(INITIAL_STATE);
    };

    componentDidUpdate = prevProps => {
        if (this.props.editUser !== null &&  prevProps.editUser !== this.props.editUser){

            const {
                _id,
                name,
                email,
                role,
                index,
            } = this.props.editUser;

            this.setState( {
                user: {
                    _id,
                    name,
                    email,
                    role,
                },

                nameInputValue: name,
                emailInputValue: email,

                nameSubmitBtn: 'Редактировать',
                title: `Редактировать пользователя №${index + 1}`,
                requiredPassword: false
            })
        }
    }

    validationAll = () => {
        const validName = checkEmptyAndLength(this.state.nameInputValue, 'имени', 5);
        const validPassword = checkEmptyAndLength(this.state.passwordInputValue, 'пароля', 6, this.state.requiredPassword);
        const validEmail = validationEmail(this.state.emailInputValue);


        this.setState({
            errTextName: validName,
            errTextPassword: validPassword,
            errTextEmail: validEmail,
        });

        return !validName && !validPassword && !validEmail;
    };

    handleChangeInput = event => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState( prevState => ({
            user: {
                ...prevState.user,
                [name]: value,
            },
            [name + 'InputValue']: value,
        }));
    }; 

    submitAction = event => {
        event.preventDefault();
        
        if ( !this.validationAll() ) {
            return;
        }

        this.props.getData( this.state.user )
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
            errTextName,
            errTextEmail,
            errTextPassword,
            nameInputValue,
            emailInputValue,
            passwordInputValue,
            title,
            nameSubmitBtn,
        } =  this.state;

        return (
            <BootstrapContainer colClasses="col-6 mx-auto">
                <form>
                    <h4 className="text-center">{title}</h4>
                    <Input
                        title={'Имя пользователя:'}
                        name={"name"}
                        handleChange={this.handleChangeInput}
                        value={nameInputValue}
                        errorText={errTextName}
                    />
                    <Input
                        title={'E-mail адрес пользователя:'}
                        name={"email"}
                        handleChange={this.handleChangeInput}
                        value={emailInputValue}
                        errorText={errTextEmail}
                    />
                    <Input
                        title={"Ввести новый пароль:"}
                        name={"password"}
                        handleChange={this.handleChangeInput}
                        value={passwordInputValue}
                        errorText={errTextPassword}
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