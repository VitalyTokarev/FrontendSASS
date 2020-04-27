import React from 'react';
import { Link } from 'react-router-dom';

import BootstrapContainer from '../../components/BootstrapContainer'; 
import Input from '../../components/Input';
import Button from '../../components/Button';
import { AuthContext } from '../../context';
import Notification, { notify } from '../../components/Notification';

const regValidateExpressionEmail = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';

export default class Registration extends React.Component {
    state = {
        user: { },

        nameInputValue: '',
        emailInputValue: '',
        passwordInputValue: '',

        errTextName: '',
        errTextEmail: '',
        errTextPassword: '',

        notifyOn: false,
    };

    static contextType  = AuthContext;

    callNotification = msg => {
        if (this.state.notifyOn) {
            notify(msg);
            return;
        }

        this.setState({
            notifyOn: true,
        }, () => {
            notify(msg);
        });   
    };

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

            if(this.state.notifyOn) {
                this.setState({
                    notify:false,
                });
            }
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

    validatinhEmptyAndLength = (item, name, requireLength) => {
        if ( !item ) {
            return 'Введена пустая строка!'
        } else if ( requireLength && item.length < requireLength ) {
            return `Длинна ${name} меньше ${requireLength} символов!`;
        }

        return '';
    };

    validationEmail = () => {
        if ( !this.state.emailInputValue.match(regValidateExpressionEmail)) {
            return 'Почтовый адрес некорректен!';
        }
        return '';
    }
    
    validationAll = () => {
        const validName = this.validatinhEmptyAndLength(this.state.nameInputValue, 'имени', 5);
        const validPassword = this.validatinhEmptyAndLength(this.state.passwordInputValue, 'пароля', 6);
        const validEmail = this.validationEmail();


        this.setState({
            errTextName: validName,
            errTextPassword: validPassword,
            errTextEmail: validEmail,
        });

        return !validName && !validPassword && !validEmail;
    }

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
        
        if ( !this.validationAll() ) { return; }
        this.signup(this.state.user);
    };

    render = () => {
       
        const {
            nameInputValue,
            emailInputValue,
            passwordInputValue,
        } = this.state;
        
        return (
            <React.Fragment>
                {this.state.notifyOn && <Notification/>}
                <BootstrapContainer colClasses="col-6 mx-auto">
                    <form >
                        <h1 className="text-center">Регистрация</h1>
                        <Input
                            title={'Ваше имя:'}
                            name={"name"}
                            handleChange={this.handleChangeInput}
                            value={nameInputValue}
                            errorText={this.state.errTextName}
                        />
                        <Input
                            title={'Ваш e-mail адрес:'}
                            name={"email"}
                            handleChange={this.handleChangeInput}
                            value={emailInputValue}
                            errorText={this.state.errTextEmail}
                        />
                        <Input
                            title={"Введите пароль:"}
                            name={"password"}
                            handleChange={this.handleChangeInput}
                            value={passwordInputValue}
                            errorText={this.state.errTextPassword}
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