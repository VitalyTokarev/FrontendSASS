import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuthContext } from "../../context/Auth";

export default WrappedComponent => {
    return function Autorization(props) {
      const { isLogin } = useAuthContext();  
      
      return (isLogin() ? 
        <WrappedComponent {...props}/>
        :
        <Redirect to='/login' />
      )
    };
}