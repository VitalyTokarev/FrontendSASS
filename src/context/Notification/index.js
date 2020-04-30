import { createContext, useContext} from 'react';

export const NotificationContext = createContext();

export const UseNotification = () => {
    return useContext(NotificationContext);
};
