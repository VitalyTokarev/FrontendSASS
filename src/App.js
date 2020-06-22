import React from 'react';

import Router from './routes';
import NotificationHOC from './components/hoc/Notification';

const WrappedRouter = NotificationHOC(Router);

export default () => {  
    return <WrappedRouter/>; 
};