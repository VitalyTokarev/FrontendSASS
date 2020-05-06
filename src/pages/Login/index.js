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
    const [ email, handleChangeEmail, errorTextEmail, setErrorEmail ] = useFieldState();
    const [ password, handleChangePassword, errorTextPassword, setErrorPassword] = useFieldState();

    const [user, setUser] = useState({});

    const { setUserData } = useAuthContext();

    const { notify } = useNotificationContext();

    useEffect(() => {
        setUser({
            email,
            password,
        });
    }, [password, email]);

    const login = async user => {
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

            setUserData(userData.token);
            history.push('/');
            return;
        }

        if (response.status === 403) {
            setErrorEmail( 'Введен неверный почтовый адрес или пароль!');
            setErrorPassword( ' ' );
            return;
        }
        
        notify('Ошибка HTTP:' + response.status);
    };

    const validation = () => {
        const validPassword = checkEmptyAndLength(password);
        const validEmail = validationEmail(email);

        setErrorPassword(validPassword);
        setErrorEmail(validEmail);

        return !validPassword && !validEmail;
    };

    const submitAction = event => {
        event.preventDefault();

        if ( !validation() ) { return; }
        login(user);
    };

    return (
        <React.Fragment>
            <BootstrapContainer colClasses="col-6 mx-auto">                 
                <form >
                    <h1 className="text-center">Авторизация</h1>
                    <Input
                        title={'Введите e-mail:'}
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
                        type="password"
                    />
                    <Link to="/signup">
                        <p>Нет аккаунта? Зарегистрироваться</p>
                    </Link>
                    <Button
                        name={'Войти'}
                        type={"submit"}
                        handleOnClick={submitAction}
                        btnClass={"btn btn-primary form-btnSubmit"}
                    />
                </form>              
            </BootstrapContainer>
        </React.Fragment>
    );
}