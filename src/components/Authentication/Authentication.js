import React from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from "../../context";

export default WrappedComponent => {

  return class Autorization extends React.Component {
    static contextType = AuthContext;
    render = () => {
      const {authToken} = this.context;  
      
      return (authToken ? 
        <WrappedComponent {...this.props}/>
        :
        <Redirect to='/login' />
        )
    };
  }
}