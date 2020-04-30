import React from 'react';
import { Redirect } from 'react-router-dom';
import { UseAuth } from "../../context/Auth";

export default WrappedComponent => {
    return function Autorization(props) {
      const { isLogin } = UseAuth();  
      return (isLogin() ? 
        <WrappedComponent {...props}/>
        :
        <Redirect to='/login' />
      )
    };
}