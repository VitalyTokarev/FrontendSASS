import React from 'react';
import { Link } from 'react-router-dom';

import BootstrapContainer from '../../components/BootstrapContainer'; 
import Input from '../../components/Input';
import Button from '../../components/Button';
import { AuthContext } from '../../context/Auth';
import { checkEmptyAndLength,  validationEmail } from '../../helpers/validation';

export default class Login extends React.Component {
    state = {
        user: { },
        emailInputValue: '',
        passwordInputValue: '',

        errTextEmail: '',
        errTextPassword: '',
    };

    static contextType  = AuthContext;
    
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
            return;
        }

        if (response.status === 403) {
            this.setState({
                errTextEmail: 'Введен неверный почтовый адрес или пароль!',
                errTextPassword: ' ',
            });
            return;
        }

        //this.callNotification('Ошибка HTTP:' + response.status);
    };
    
    validation = () => {
        const validPassword = checkEmptyAndLength(this.state.passwordInputValue);
        const validEmail = validationEmail(this.state.emailInputValue);

        this.setState({
            errTextPassword: validPassword,
            errTextEmail: validEmail,
        });

        return !validPassword && !validEmail;
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

        if ( !this.validation() ) { return;}
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
                            type="password"
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