import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import BootstrapContainer from '../../components/BootstrapContainer'; 
import Input from '../../components/Input';
import Button from '../../components/Button';
import { AuthContext } from '../../context';
import Notification, { notify } from '../../components/Notification';

const labelClass = 'label-input';
const labelErrorClass = 'label-error';

export default class Registration extends React.Component {
    state = {
        user: { },
        nameInputValue: '',
        emailInputValue: '',
        passwordInputValue: '',
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

    handleChangeInput = event => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState( prevState => ({
            user: {
                ...prevState.user,
                [name]: value,
            },
            [name + 'InputValue']: value,
            notifyOn: false,
        }));
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
            const usersData = await response.json();

            this.context.setCurrUser(usersData);
            if(this.state.notifyOn) {
                this.setState({
                    notify:false,
                });
            }
            return;
        }

        this.callNotification('HTTP Error:' + response.status);
    };

    submitAction = event => {
        event.preventDefault();
        this.signup(this.state.user);
    };

    render = () => {
       
        const {
            nameInputValue,
            emailInputValue,
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
            <React.Fragment>
                {this.state.notifyOn && <Notification/>}
                <BootstrapContainer colClasses="col-6 mx-auto">
                    <form >
                        <h1 className="text-center">Регистрация</h1>
                        <Input
                            title={'Ваше имя:'}
                            name={"name"}
                            inputClasses={loginClassInput}
                            labelClasses={labelClass}
                            labelErrClasses={labelErrorClass}
                            handleChange={this.handleChangeInput}
                            value={nameInputValue}
                            autoComplete={'off'}
                        />
                        <Input
                            title={'Ваш e-mail адрес:'}
                            name={"email"}
                            inputClasses={loginClassInput}
                            labelClasses={labelClass}
                            labelErrClasses={labelErrorClass}
                            handleChange={this.handleChangeInput}
                            value={emailInputValue}
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