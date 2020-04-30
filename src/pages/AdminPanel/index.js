import React from 'react';

import FormUsers from '../../components/FormUsers';
import TableUsers from '../../components/TableUsers';
import { AuthContext } from '../../context/Auth';
import Header from '../../components/Header';
import { getEditElement, removeElementFromArray, getEditArray} from '../../helpers/arrayMethods';

export default class AdminPanel extends React.Component {
    state = {
            listUsers: [],
            removeButtonDisabled: false,
            editUser: null,
    };

    static contextType = AuthContext;

    componentDidMount = () => {
        this.getUsersFromServer();
    };

    getUsersFromServer = async () => {
        if ( !await this.context.checkAuthToken() ) { return; }

        const response = await fetch('/admin/users/show');

        if (response.ok) { 
            const users = await response.json();

            this.setState({
                listUsers: users,
            });  
            
            return;
        } 

        if (response.status === 403) {
            this.context.logout();
        }

        //this.callNotification("Ошибка HTTP: " + response.status);
    };

    addUserToServer = async user => {
        if ( !await this.context.checkAuthToken() ) { return; }

        const response = await fetch('/admin/users/create', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if (response.ok) {
            const idUser = await response.json();

            this.addUserToLocalState(user, idUser);
            return true;
        }

        if (response.status === 403) {
            this.context.logout();
        }

        //this.callNotification("Ошибка HTTP: " + response.status);
        return false;
    };

    editUserToServer = async user => {
        if ( !await this.context.checkAuthToken() ) { return; }

        const response = await fetch('/admin/users/update', { 
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if (response.ok) {
            this.editUserFromLocalState(user);
            return true;
        }

        if (response.status === 403) {
            this.context.logout();
        }

        //this.callNotification("Ошибка HTTP: " + response.status);
        return false;
    };

    deleteUserFromServer = async id => {
        if ( !await this.context.checkAuthToken() ) { return; }

        const response = await fetch('/admin/users/delete', { 
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id}),
        });
        if (response.ok) {            
            this.removeUserFromLocalState(id);
            return true;
        }

        if (response.status === 403) {
            this.context.logout();
        }

        //this.callNotification("Ошибка HTTP: " + response.status);
        return false;

    };

    addUserToLocalState = (object, _id) => {
        const {
            name,
            email,
        } = object;

        this.setState( prevState => ({ listUsers :
            [...prevState.listUsers, {
                _id,
                name,
                email,
                role: 'user',
            }
            ],
        }));
    }
  
    editUserFromLocalState = (user) => {
        const usersList = getEditArray(user, '_id', this.state.listUsers);

        this.setState({
            listUsers: usersList,
            removeButtonDisabled: false,
            editObject: null,
        });
    }

    removeUserFromLocalState = id => {
        const listUsers = removeElementFromArray(id, '_id', this.state.listUsers);

        this.setState({
            listUsers: listUsers,
        });
    }

    getIdEditUserId = id => {
        const editUser = getEditElement(id, '_id', this.state.listUsers);

        this.setState({
            removeButtonDisabled: true,
            editUser,
        });
    };

    getData = user => {
        if (this.state.editUser !== null) {
            return this.editUserToServer(user);
        } else {
            return this.addUserToServer(user);
        }
    };

    render = () => {
        const {
            listUsers,
            removeButtonDisabled,
            editUser,
        } = this.state;

        return (
            <React.Fragment>
                <Header 
                    history={this.props.history}
                    disableViewUsers={true}
                />
                <FormUsers
                    getData={this.getData}
                    editUser={editUser}
                />
                <TableUsers
                    list={listUsers}
                    removeAction={this.deleteUserFromServer}
                    editAction={this.getIdEditUserId}
                    removeButtonDisabled={removeButtonDisabled}
                />
            </React.Fragment>
        );
    };
}