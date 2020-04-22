import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from "../../context";

export default WrappedComponent => {

  return function Autorization(props) {
    const { authTokens } = useAuth();

    return (
      authTokens ? 
        <WrappedComponent {...props}/>
        :
        <Redirect to='/login' />
    );
  }
}


  