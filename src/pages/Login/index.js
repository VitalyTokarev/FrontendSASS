import React from 'react';
import { Link } from 'react-router-dom';

import BootstrapContainer from '../../components/BootstrapContainer'; 
import Input from '../../components/Input';
import Button from '../../components/Button';
import { AuthContext } from '../../context';
import Notification, { notify } from '../../components/Notification';

const regValidateExpressionEmail = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';


export default class Login extends React.Component {
    state = {
        user: { },
        emailInputValue: '',
        passwordInputValue: '',

        errTextEmail: '',
        errTextPassword: '',

        notifyOn: false
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

    login = async user => {
        const userData = btoa(user.email) + ':' + btoa(user.password);

        const response = await fetch('/user/login', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: JSON.stringify( { user: userData } ),
            },
        });
        
        if (response.ok) {
            const userData = await response.json();

            this.context.setUserData(userData.token);
            this.props.history.push('/');

            if(this.state.notifyOn) {
                this.setState({
                    notifyOn:false,
                });
            }
            return;
        }

        if (response.status === 403) {
            this.setState({
                errTextEmail: 'Введен неверный почтовый адрес или пароль!',
                errTextPassword: ' ',
            });
            return;
        }

        this.callNotification('Ошибка HTTP:' + response.status);
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
        const validPassword = this.validatinhEmptyAndLength(this.state.passwordInputValue, 'пароля', 6);
        const validEmail = this.validationEmail();

        this.setState({
            errTextPassword: validPassword,
            errTextEmail: validEmail,
        });

        return !validPassword && !validEmail;
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

        if ( !this.validationAll() ) { return;}
        this.login(this.state.user);
    };

    render = () => {
        const {
            emailInputValue,
            passwordInputValue,
            errTextEmail,
            errTextPassword
        } = this.state;

        return (
            <React.Fragment>
                {this.state.notifyOn && <Notification/>}
                <BootstrapContainer colClasses="col-6 mx-auto">                 
                    <form >
                        <h1 className="text-center">Авторизация</h1>
                        <Input
                            title={'Введите e-mail:'}
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
                        <Link to="/signup">
                            <p>Нет аккаунта? Зарегистрироваться</p>
                        </Link>
                        <Button
                            name={'Войти'}
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