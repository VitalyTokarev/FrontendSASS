import React from "react";
import '../components/BlockInput.js';
import BlockInput from './BlockInput'
import BlockList from './BlockList'


class App extends React.Component {
    state = {
            list: [],
            editId: -1,
            removeButtonDisabled: false,
    };

    addObject(object) {
        this.setState( prevState => ({ list :
                    [...prevState.list, {
                        id: prevState.list.length +1,
                        value: object.value,
                        type: object.type,
                        fruit: object.fruit
                    }

                    ],
            }
        ));
    }

    checkEditObject = () => {
        if(this.state.editId !== -1) {
            return this.state.list[this.state.editId -1];
        } else {
            return "";
        }
    };

    editObject(object) {
        const objectList = this.state.list;
        objectList[this.state.editId -1].value = object.value;
        objectList[this.state.editId -1].type = object.type;
        objectList[this.state.editId -1].fruit = object.fruit;
        this.setState({
            list: objectList,
            editId: -1,
            removeButtonDisabled: false,
        });
    }

    getData = object => {

        if (this.state.editId !== -1) {
            this.editObject(object);
        } else {
            this.addObject(object);
        }
    };
    removeObjectFromList(oldArr, id) {
        let newArr = [];
        for (let index in oldArr) {
            if(+index !== id - 1) {
                oldArr[index].id = newArr.length + 1;
                newArr.push(oldArr[index]);
            }
        }

        return newArr;
    }

    removeObject = id => {
        let listObject = this.state.list;
        listObject = this.removeObjectFromList(listObject, id);
        this.setState({list: listObject});
    };

    getIdEditObjecId = id => {
        this.setState(prevState => ({
            editId: id,
            removeButtonDisabled: true
        }));
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

export default App;
