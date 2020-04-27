import { createContext, useContext} from 'react';

export const AuthContext = createContext();

export const UseAuth = () => {
    return useContext(AuthContext);
};
