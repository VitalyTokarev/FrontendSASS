import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import BootstrapContainer from '../../components/BootstrapContainer'; 
import Input from '../../components/Input';
import Button from '../../components/Button';
import { checkEmptyAndLength,  validationEmail } from '../../helpers/validation';
import { useFieldsState } from '../../hooks';
import { login } from '../../actions';
import { getAlertMessage } from '../../helpers/getEntityFromState';
import { useNotificationContext } from '../../context/NotificationContext';

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

    const { notify } = useNotificationContext();
    const errMessage = useSelector(getAlertMessage, shallowEqual);

    useEffect(() => {
        if (errMessage) {
            notify(errMessage);
        }
    }, [errMessage, notify]);

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
                        title={'Введите e-mail:'}
                        name={"email"}
                        handleChange={handleChange}
                        value={user.email}
                        errorText={errorsText.email}
                    />
                    <Input
                        title={"Введите пароль:"}
                        name={"password"}
                        handleChange={handleChange}
                        value={user.password}
                        errorText={errorsText.password}
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
};

export default Login;