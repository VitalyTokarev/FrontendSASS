import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import BootstrapContainer from '../../components/BootstrapContainer'; 
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuthContext } from '../../context/Auth';
import { useNotificationContext } from '../../context/Notification';
import { checkEmptyAndLength,  validationEmail } from '../../helpers/validation';
import useFieldState from '../../hooks/useFieldState';

export default ( { history } ) => {
    const [ name, handleChangeName, errorTextName, setErrorName ] = useFieldState();
    const [ email, handleChangeEmail, errorTextEmail, setErrorEmail ] = useFieldState();
    const [ password, handleChangePassword, errorTextPassword, setErrorPassword ] = useFieldState();

    const [user, setUser] = useState({});

    const { setUserData } = useAuthContext();

    const { notify } = useNotificationContext();

    useEffect(() => {
        setUser({
            name,
            email,
            password,
        });
    }, [name, password, email]);

    const signup = async user => {
        const response = await fetch('/user/signup', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        });

        if (response.ok) {
            const userData = await response.json();

            setUserData(userData.token);
            history.push('/');

            return;
        }

        if (response.status === 403) {
            setErrorEmail('Пользователь с таким почтовым адресом уже зарегистрирован!');
            return; 
        }

        notify('HTTP Error:' + response.status);
    };

    const validation = () => {
        const validName = checkEmptyAndLength(name, 'имени', 5);
        const validPassword = checkEmptyAndLength(password, 'пароля', 6);
        const validEmail = validationEmail(email);

        setErrorName(validName);
        setErrorPassword(validPassword)
        setErrorEmail(validEmail);

        return !validName && !validPassword && !validEmail;
    };

    const submitAction = event => {
        event.preventDefault();
        
        if ( !validation() ) { return; }
        signup(user);
    };

    return (
        <React.Fragment>
            <BootstrapContainer colClasses="col-6 mx-auto">
                <form >
                    <h1 className="text-center">Регистрация</h1>
                    <Input
                        title={'Ваше имя:'}
                        name={"name"}
                        handleChange={handleChangeName}
                        value={name}
                        errorText={errorTextName}
                    />
                    <Input
                        title={'Ваш e-mail адрес:'}
                        name={"email"}
                        handleChange={handleChangeEmail}
                        value={email}
                        errorText={errorTextEmail}
                    />
                    <Input
                        title={"Введите пароль:"}
                        name={"password"}
                        handleChange={handleChangePassword}
                        value={password}
                        errorText={errorTextPassword}
                    />
                    <Link to="/login">
                        <p>Уже есть аккаунт? Войти</p>
                    </Link>
                    <Button
                        name={'Зарегистрироваться'}
                        type={"submit"}
                        handleOnClick={submitAction}
                        btnClass={"btn btn-primary form-btnSubmit"}
                    />
                </form>              
            </BootstrapContainer>
        </React.Fragment>
    );
}