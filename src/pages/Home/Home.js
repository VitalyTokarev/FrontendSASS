import React from 'react';

import FormComponent from '../../components/FormComponent';
import List from '../../components/List';
import Notification, { notify } from '../../components/Notification';

export default class Home extends React.Component {
    state = {
            list: [],
            removeButtonDisabled: false,
            editObject: null,
            notifyOn: false,
    };

    componentDidMount = () => {
        this.getObjectsFromServer();
    };

    callNotification = msg => {
        if (this.state.notifyOn) {
            notify(msg);
            return;
        }

        this.setState({
            notifyOn: true,
        }, () => {
            notify(msg);
        });   
    };

    getObjectsFromServer = async () => {
        const response = await fetch('/object');

        if (response.ok) { 
            const objects = await response.json();
            
            if (this.state.notifyOn) {
                this.setState({
                    list: objects,
                    notifyOn: false,
                });   
                return; 
            } 

            this.setState({
                list: objects,
            });  
            
            return;
        } 

        this.callNotification("Ошибка HTTP: " + response.status);
    };

    addObjectToServer = async object => {
        const response = await fetch('/object/create', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object),
        });
        if (response.ok) {
            if (this.notifyOn) {
                this.setState({
                    notifyOn: false,
                })
            }

            this.addObjectToLocalState(object);
            return true;
        }

        this.callNotification("Ошибка HTTP: " + response.status);
        return false;
    };

    
    editObjectToServer = async object => {
        const response = await fetch('/object/update', { 
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object),
        });
        if (response.ok) {
            if (this.notifyOn) {
                this.setState({
                    notifyOn: false,
                })
            }

            this.editObjectFromLocalState(object);
            return true;
        }

        this.callNotification("Ошибка HTTP: " + response.status);
        return false;
    };

    
    deleteObjectFromServer = async id => {
        const response = await fetch('/object/delete', { 
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id}),
        });
        if (response.ok) {
            if (this.notifyOn) {
                this.setState({
                    notifyOn: false,
                })
            }
            
            this.removeObjectFromLocalState(id);
            return true;
        }

        this.callNotification("Ошибка HTTP: " + response.status);
        return false;

    };

    addObjectToLocalState = object => {
        const {
            _id,
            value,
            type,
            fruit,
        } = object;

        this.setState( prevState => ({ list :
            [...prevState.list, {
                _id,
                value,
                type,
                fruit,
            }
            ],
        }));
    }

    editArray = (object, editArray)  => {

        const {
            _id,
            value,
            type,
            fruit,
        } = object;

        const editIndex = editArray.findIndex(object => object._id === _id);

        return editArray.map( (item, index) => {
            if(index === editIndex) {
                return {
                    _id,
                    value,
                    type,
                    fruit,
                };
            }
            return {...item};
        });

    };    

    editObjectFromLocalState = (object) => {
        const objectList = this.editArray(object, this.state.list);

        this.setState({
            list: objectList,
            removeButtonDisabled: false,
            editObject: null,
        });
    }

    getData = object => {
        if (this.state.editObject !== null) {
            return this.editObjectToServer(object);
        } else {
            return this.addObjectToServer(object);
        }
    };

    removeObjectFromArray = (id, array) => {
        const removeIndex = array.findIndex(object => object._id === id);
        const arrayWithoutObject = [];

        array.forEach((item, index) => {
            if (index !== removeIndex) {
                arrayWithoutObject.push({...item});
            }
        });
        
        return arrayWithoutObject;
    };

    removeObjectFromLocalState = id => {
        const listObject = this.removeObjectFromArray(id, this.state.list);

        this.setState({
            list: listObject,
        });
    }
    getEditObject = (_id, objectArray) => {
        const indexEditObject = objectArray.findIndex(object => object._id === _id);
 
        const {
            value,
            type,
            fruit,
        } = objectArray[indexEditObject];

        return {
            _id,
            value,
            type,
            fruit,
            index: indexEditObject,
        }
    };

    getIdEditObjecId = id => {
        const editObject = this.getEditObject(id, this.state.list);

        this.setState({
            removeButtonDisabled: true,
            editObject,
        });
    };

    render = () => {
        const {
            list,
            removeButtonDisabled,
            editObject,
        } = this.state;

        return (
            <React.Fragment>
                {this.state.notifyOn && <Notification/>}
                <FormComponent
                    getData={this.getData}
                    editObject={editObject}
                />
                <List
                    list={list}
                    removeAction={this.deleteObjectFromServer}
                    editAction={this.getIdEditObjecId}
                    removeButtonDisabled={removeButtonDisabled}
                />
            </React.Fragment>
        );
    };
}