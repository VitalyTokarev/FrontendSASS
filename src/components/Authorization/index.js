import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';

import { getLoggedIn } from '../../helpers/getEntityFromState'

export default WrappedComponent => {
    return props => {
      const isLogin = useSelector( getLoggedIn, shallowEqual ); 

      return (isLogin ? 
        <WrappedComponent {...props}/>
        :
        <Redirect to='/login' />
      );
    };
}