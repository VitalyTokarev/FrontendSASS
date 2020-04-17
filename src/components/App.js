import React from 'react';

import BlockInput from './BlockInput';
import BlockList from './BlockList';
import Notification, { notify } from './Notification';

export default class App extends React.Component {
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
        const response = await fetch('/Object');

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
        const response = await fetch('/Object', { 
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
        const response = await fetch('/Object', { 
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
        const response = await fetch('/Object', { 
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
            id,
            value,
            type,
            fruit,
        } = object;

        this.setState( prevState => ({ list :
            [...prevState.list, {
                id,
                value,
                type,
                fruit,
            }
            ],
        }));
    }

    editArray = (object, editArray)  => {

        const {
            id,
            value,
            type,
            fruit,
        } = object;

        const editIndex = editArray.findIndex(object => object.id === id);

        return editArray.map( (item, index) => {
            if(index === editIndex) {
                return {
                    id,
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
        const removeIndex = array.findIndex(object => object.id === id);
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
    getEditObject = (id, objectArray) => {
        const indexEditObject = objectArray.findIndex(object => object.id === id);
 
        const {
            value,
            type,
            fruit,
        } = objectArray[indexEditObject];

        return {
            id,
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
            <div className="container">
                {this.state.notifyOn && <Notification/>}
                <BlockInput
                    getData={this.getData}
                    editObject={editObject}
                />
                <BlockList
                    list={list}
                    removeAction={this.deleteObjectFromServer}
                    editAction={this.getIdEditObjecId}
                    removeButtonDisabled={removeButtonDisabled}
                />
            </div>
        );
    };
}