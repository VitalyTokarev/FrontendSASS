import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch} from 'react-redux';

import BootstrapContainer from '../../components/commons/BootstrapContainer'; 
import Input from '../../components/commons/Input';
import Button from '../../components/commons/Button';
import { checkEmptyAndLength,  validationEmail } from '../../helpers/validation';
import { useFieldsState } from '../../hooks';
import { signup } from '../../store/flows'; 

const INITIAL_FILEDS_VALUES = {
    name: '',
    email: '',
    password: '',
};

const Signup = () => {
    const [ 
        user, 
        handleChange, 
        errorsText, 
        setErrors 
    ] = useFieldsState(INITIAL_FILEDS_VALUES);

    const dispatch = useDispatch();
    const boundSignup = useCallback(
        user => dispatch(signup(user)),
        [dispatch]
    );

    const validation = useCallback (
        () => {
            const name = checkEmptyAndLength(user.name, 'имени', 5);
            const password = checkEmptyAndLength(user.password, 'пароля', 6);
            const email = validationEmail(user.email);

            setErrors({
                name,
                password,
                email,
            });

            return !name && !password && !email;
    }, [setErrors, user.email, user.name, user.password]);

    const submitAction = useCallback (
        event => {
            event.preventDefault();
            
            if ( !validation() ) { return; }
            boundSignup(user);
    }, [boundSignup, user, validation]);

    return (
        <React.Fragment>
            <BootstrapContainer colClasses="col-6 mx-auto">
                <form >
                    <h1 className="text-center">Регистрация</h1>
                    <Input
                        title="Ваше имя:"
                        name="name"
                        handleChange={handleChange}
                        value={user.name}
                        errorText={errorsText.name}
                    />
                    <Input
                        title="Ваш e-mail адрес:"
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
                    />
                    <Link to="/login">
                        <p>Уже есть аккаунт? Войти</p>
                    </Link>
                    <Button
                        name="Зарегистрироваться"
                        type="submit"
                        handleOnClick={submitAction}
                        btnClass="Form-Button"
                    />
                </form>              
            </BootstrapContainer>
        </React.Fragment>
    );
};

export default Signup;