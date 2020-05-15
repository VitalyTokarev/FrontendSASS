import { useState, useCallback } from 'react';

export const useFieldsState = ( initialState = { value: '' } ) => {
    const initialErrors = useCallback(() => {
        const object = {};
        for (const key in initialState) {
            object[key] = '';
        } 
        return object
    }, [initialState]);

    const [object, setObjectState] = useState(initialState);
    const [errors, setErrorsState] = useState(initialErrors());

    const onChange = useCallback(event => {
        const { value, name } = event.target;

        setObjectState( prevObject => ({
            ...prevObject,
            [name]: value,
        }));
    }, []);

    const setObject = useCallback(
        object => {
            setObjectState({
                ...object
            });
    }, []);

    const setErrors = useCallback(
        errors => {
            setErrorsState( prevErrors => ({
                ...prevErrors,
                ...errors 
            }));
    }, []);

    const resetValue = useCallback( 
        () => {
            setObject( initialState );
            setErrorsState( initialErrors() );
    }, [initialErrors, setObject, initialState]);

    return [
        object,
        onChange,
        errors,
        setErrors,
        resetValue,
        setObject,
    ];
};