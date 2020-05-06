import { useState } from 'react';

const intialState = {
  value: '',
  errorText: '',
};

export default ( initialValue = intialState ) => {
  const [value, setValue] = useState(initialValue.value);
  const [errorText, setErrorText] = useState(initialValue.errorText)

  const onChange = event => {
    setValue( event.target.value );
  };

  const resetValue = () => {
    setValue( intialState.value );
    setErrorText( intialState.errorText );
  };

  return [
    value,
    onChange,
    errorText,
    setErrorText,
    resetValue,
    setValue,
  ];
};