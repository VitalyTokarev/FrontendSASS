import React from 'react';
import {
    Route,
    Switch, 
    Redirect
} from 'react-router-dom';

import Home from '../Home';
import Login from '../Login';
import Registration from '../Registration';

export default class App extends React.Component {

    render = () => {
        return (
        <Switch>
            <Route exact path="/home" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/registration" component={Registration}/>
            <Redirect from="/" to="home"/>
        </Switch>
        );
    };
}