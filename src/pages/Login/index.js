import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import BootstrapContainer from '../../components/commons/BootstrapContainer'; 
import Input from '../../components/commons/Input';
import Button from '../../components/commons/Button';
import { checkEmptyAndLength,  validationEmail } from '../../helpers/validation';
import { useFieldsState } from '../../hooks';
import { login } from '../../store/flows';

const INITIAL_FILEDS_VALUES = {
    email: '',
    password: '',
};

const Login = () => {
    const [ user, handleChange, errorsText, setErrors ] = useFieldsState(INITIAL_FILEDS_VALUES);
    
    const dispatch = useDispatch();
    const boundLogin = useCallback( 
        user => dispatch(login(user)
        ), 
        [dispatch]
    );

    const validation = useCallback(() => {
        const password = checkEmptyAndLength(user.password);
        const email = validationEmail(user.email);

        setErrors({
            password,
            email,
        });

        return !password && !email;
    
        }, 
        [setErrors, user.email, user.password]
    );

    const submitAction = useCallback(
        event => {
            event.preventDefault();

            if ( !validation() ) { return; }
            boundLogin(user);
        }, 
        [ user, validation, boundLogin]
    );

    return (
        <React.Fragment>
            <BootstrapContainer colClasses="col-6 mx-auto">                 
                <form >
                    <h1 className="text-center">Авторизация</h1>
                    <Input
                        title="Введите e-mail:"
                        name="email"
                        handleChange={handleChange}
                        value={user.email}
                        errorText={errorsText.email}
                    />
                    <Input
                        title="Введите пароль:"
                        name="password"
                        handleChange={handleChange}
                        value={user.password}
                        errorText={errorsText.password}
                        type="password"
                    />
                    <Link to="/signup">
                        <p>Нет аккаунта? Зарегистрироваться</p>
                    </Link>
                    <Button
                        name="Войти"
                        type="submit"
                        handleOnClick={submitAction}
                        btnClass="Form-Button"
                    />
                </form>              
            </BootstrapContainer>
        </React.Fragment>
    );
};

export default Login;