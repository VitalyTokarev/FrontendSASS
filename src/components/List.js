import React from "react";

class List extends React.Component {

    render() {
        const {
            list,
            elemValueClasses,
            btnEditClasses,
            editAction,
            removeButtonDisabled,
            btnRemoveClasses,
            removeAction,
            listClasses
        } = this.props;

        return(
            <ol className={listClasses}>
                {   list.length !== 0 ?  list.map((item) => {
                         return (
                         <li key={item.id}>
                             <p className={elemValueClasses}>{item.value + " " + item.type + " " + item.fruit}</p>
                             <button
                                 className={btnEditClasses}
                                 onClick={() => {editAction(item.id)}}
                             >Редактировать
                             </button>
                             <button
                                 disabled={removeButtonDisabled}
                                 className={btnRemoveClasses}
                                 onClick={() => {removeAction(item.id)}}
                             >Удалить
                             </button>
                        </li>
                    );
                })
                    :  <p>В списке нет ни одного объекта!</p>
                }
            </ol>
        );

    }

}

export default List;