import React from 'react';
import { Link } from 'react-router-dom';

import BootstrapContainer from '../../components/BootstrapContainer'; 
import Input from '../../components/Input';
import Button from '../../components/Button';
import { AuthContext } from '../../context/Auth';
import { checkEmptyAndLength,  validationEmail } from '../../helpers/validation';

export default class Registration extends React.Component {
    state = {
        user: {},

        nameInputValue: '',
        emailInputValue: '',
        passwordInputValue: '',

        errTextName: '',
        errTextEmail: '',
        errTextPassword: '',
    };

    static contextType  = AuthContext;

    signup = async user => {
        const response = await fetch('/user/signup', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        });

        if (response.ok) {
            const userData = await response.json();

            this.context.setUserData(userData.token);
            this.props.history.push('/');

            return;
        }

        if (response.status === 403) {
            this.setState({
                errTextEmail: 'Пользователь с таким почтовым адресом уже зарегистрирован!'
            });
            return; 
        }

        this.callNotification('HTTP Error:' + response.status);
    };
    
    validation = () => {
        const validName = checkEmptyAndLength(this.state.nameInputValue, 'имени', 5);
        const validPassword = checkEmptyAndLength(this.state.passwordInputValue, 'пароля', 6);
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
        
        if ( !this.validation() ) { return; }
        this.signup(this.state.user);
    };

    render = () => {
       
        const {
            errTextName,
            errTextEmail,
            errTextPassword,
            nameInputValue,
            emailInputValue,
            passwordInputValue,
        } = this.state;
        
        return (
            <React.Fragment>
                <BootstrapContainer colClasses="col-6 mx-auto">
                    <form >
                        <h1 className="text-center">Регистрация</h1>
                        <Input
                            title={'Ваше имя:'}
                            name={"name"}
                            handleChange={this.handleChangeInput}
                            value={nameInputValue}
                            errorText={errTextName}
                        />
                        <Input
                            title={'Ваш e-mail адрес:'}
                            name={"email"}
                            handleChange={this.handleChangeInput}
                            value={emailInputValue}
                            errorText={errTextEmail}
                        />
                        <Input
                            title={"Введите пароль:"}
                            name={"password"}
                            handleChange={this.handleChangeInput}
                            value={passwordInputValue}
                            errorText={errTextPassword}
                        />
                        <Link to="/login">
                            <p>Уже есть аккаунт? Войти</p>
                        </Link>
                        <Button
                            name={'Зарегистрироваться'}
                            type={"submit"}
                            handleOnClick={this.submitAction}
                            btnClass={"btn btn-primary form-btnSubmit"}
                        />
                    </form>              
                </BootstrapContainer>
            </React.Fragment>
        );
    }
}