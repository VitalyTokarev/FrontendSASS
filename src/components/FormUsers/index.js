import React, { useState, useEffect } from 'react';

import Input from '../Input';
import Button from '../Button';
import BootstrapContainer from '../BootstrapContainer';
import { checkEmptyAndLength,  validationEmail } from '../../helpers/validation';
import useFieldState from '../../hooks/useFieldState';
import { INITIAL_TITLE_DATA } from '../../helpers/constants'

export default ( { getData, editUser } ) => {
    const [ name, handleChangeName, errorTextName, setErrorName, resetName, setName ] = useFieldState();
    const [ email, handleChangeEmail, errorTextEmail, setErrorEmail, resetEmail, setEmail ] = useFieldState();
    const [ password, handleChangePassword, errorTextPassword, setErrorPassword, resetPassword ] = useFieldState();

    const [ requiredPassword, setRequiredPassword ] = useState( true );  
    const [ titleData, setTitleData] = useState(INITIAL_TITLE_DATA);
    const [user, setUser] = useState({});

    useEffect(() => {
        setUser( state => ({
            ...state,
            name,
            password,
            email,
        }));
    }, [ name, password, email]);

    useEffect(() => {
        if (editUser) {
            const {
                _id,
                name,
                email,
                role,
                index,
            } = editUser;

            setUser({
                _id,
                name,
                email,
                role,
            });

            setName(name);
            setEmail(email);

            setRequiredPassword(true);

            setTitleData({       
                nameSubmitBtn: 'Редактировать',
                title: `Редактировать пользователя №${index + 1}`,
            });
        }
    // eslint-disable-next-line
    }, [editUser]);


    const validation = () => {
        const validName = checkEmptyAndLength(name, 'имени', 5);
        const validPassword = checkEmptyAndLength(password, 'пароля', 6, requiredPassword);
        const validEmail = validationEmail(email);

        setErrorName(validName);
        setErrorPassword(validPassword)
        setErrorEmail(validEmail);

        return !validName && !validPassword && !validEmail;
    };

    const handleClearForm = () => {
        resetName();
        resetEmail();
        resetPassword();
        setTitleData(INITIAL_TITLE_DATA);
        setRequiredPassword(true);
        setUser({});
    };

    const submitAction = event => {
        event.preventDefault();
        
        if ( !validation() ) {
            return;
        }

        getData( user )
        .then( successCompletion => {
            if (successCompletion) {
                handleClearForm();
            }
        });
    };

    return (
        <BootstrapContainer colClasses="col-6 mx-auto">
            <form>
                <h4 className="text-center">{titleData.title}</h4>
                <Input
                    title={'Имя пользователя:'}
                    name={"name"}
                    handleChange={handleChangeName}
                    value={name}
                    errorText={errorTextName}
                />
                <Input
                    title={'E-mail адрес пользователя:'}
                    name={"email"}
                    handleChange={handleChangeEmail}
                    value={email}
                    errorText={errorTextEmail}
                />
                <Input
                    title={"Ввести новый пароль:"}
                    name={"password"}
                    handleChange={handleChangePassword}
                    value={password}
                    errorText={errorTextPassword}
                />
                <Button
                    name={titleData.nameSubmitBtn}
                    type={"submit"}
                    handleOnClick={submitAction}
                    btnClass={"btn btn-primary form-btnSubmit"}
                />
            </form>
        </BootstrapContainer>
    );
}