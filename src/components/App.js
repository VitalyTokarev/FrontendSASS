import React from 'react';
import {nanoid} from 'nanoid';

import BlockInput from './BlockInput'
import BlockList from './BlockList'

export default class App extends React.Component {
    state = {
            list: [],
            editId: -1,
            removeButtonDisabled: false,
    };

    componentDidMount() {
        this.getObjectsFromServer();
    }

    async getObjectsFromServer() {
        let response = await fetch('/Object');

        if (response.ok) { 
            let objects = await response.json();
            this.setState({
                list: objects
            });    
            return;
        } 
        alert("Ошибка HTTP: " + response.status);
    }

    async sendObjectToServer(object) {
        let response = await fetch('/Object', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object),
        });
        if(response.ok) {
            return;
        }
        alert("Ошибка HTTP: " + response.status);
    }

    
    async editObjectToServer(object) {
        let response = await fetch('/Object', { 
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object),
        });
        if(response.ok) {
            return;
        }
        alert("Ошибка HTTP: " + response.status);
    }

    
    async deleteObjectToServer(id) {
        let response = await fetch('/Object', { 
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id}),
        });
        if(response.ok) {
            return;
        }
        alert("Ошибка HTTP: " + response.status);
    }

    addObject(object) {
        object.id = nanoid();
        this.setState( prevState => ({ list :
                    [...prevState.list, {
                        id: object.id,
                        value: object.value,
                        type: object.type,
                        fruit: object.fruit
                    }
                    ],
            }
        ));
        this.sendObjectToServer(object);
    }

    checkEditObject = () => {
        if (this.state.editId !== -1) {
            const editIndex = this.state.list.findIndex(m => m.id === this.state.editId);
            const editObject = this.state.list[editIndex];

            editObject.index = editIndex+1;
            return editObject;
        } else {
            return "";
        }
    };


    editObject(object) {
        const objectList = this.state.list;
        object.id = this.state.editId;
        const editIndex = objectList.findIndex(m => m.id === object.id)

        objectList[editIndex].value = object.value;
        objectList[editIndex].type = object.type;
        objectList[editIndex].fruit = object.fruit;

        this.setState({
            list: objectList,
            editId: -1,
            removeButtonDisabled: false,
        });
        this.editObjectToServer(object);
    }

    getData = object => {

        if (this.state.editId !== -1) {
            this.editObject(object);
        } else {
            this.addObject(object);
        }
    };

    removeObject = id => {
        let listObject = this.state.list;
        const removeIndex = listObject.findIndex(m => m.id === id);

        listObject.splice(removeIndex, 1);
        this.setState({list: listObject});
        this.deleteObjectToServer(id);
    };

    getIdEditObjecId = id => {
        this.setState({
            editId: id,
            removeButtonDisabled: true
        });
    };

    render() {
        const {
            editId,
            list,
            removeButtonDisabled
        } = this.state;

        return (
            <div className="container">
                <BlockInput
                    editData={this.checkEditObject}
                    getData={this.getData}
                    editMode={editId}
                />
                <BlockList
                    list={list}
                    removeAction={this.removeObject}
                    editAction={this.getIdEditObjecId}
                    removeButtonDisabled={removeButtonDisabled}
                />
            </div>
        );
    }
}