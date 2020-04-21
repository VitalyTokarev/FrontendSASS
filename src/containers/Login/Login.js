import React from 'react';
import classNames from 'classnames';

import BootstrapContainer from '../../components/BootstrapContainer'; 
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

const labelClass = 'label-input';
const labelErrorClass = 'label-error';

export default class Login extends React.Component {
    state = {
        user: { },
        loginInputValue: '',
        passwordInputValue: '',
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
        console.log(this.state.user);
    };

    render = () => {
        const {
            loginInputValue,
            passwordInputValue,
        } = this.state;

        const loginClassInput = classNames({
            'input': true,
            'red-border': false
        });

        const passwordClassInput = classNames({
            'input': true,
            'red-border': false
        });

        return (
            <BootstrapContainer colClasses="col-6 mx-auto">
                <form >
                    <h1 className="text-center">Авторизация</h1>
                    <Input
                        title={'Введите логин:'}
                        name={"login"}
                        inputClasses={loginClassInput}
                        labelClasses={labelClass}
                        labelErrClasses={labelErrorClass}
                        handleChange={this.handleChangeInput}
                        value={loginInputValue}
                        autoComplete={'off'}
                    />
                    <Input
                        title={"Введите пароль:"}
                        name={"password"}
                        inputClasses={passwordClassInput}
                        labelClasses={labelClass}
                        labelErrClasses={labelErrorClass}
                        handleChange={this.handleChangeInput}
                        value={passwordInputValue}
                        autoComplete={'off'}
                    />
                    <Link to="/registration">
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
        );
    }
}