import React from "react";

import ListElement from "./ListElement";

export default function BlockList(props) {
    const {
        list,
        removeButtonDisabled,
        removeAction,
        editAction
    } = props;

    return (
        <div className="row">
            <div className="col-6 mx-auto">
                    <ol className={"list"}>
                    {list.length !== 0 ?  list.map(({_id, value, type, fruit}) => {
                        return (
                        <ListElement
                            key={_id}
                            id={_id}
                            valueItem={value + ' ' + type + ' ' + fruit}
                            removeButtonDisabled={removeButtonDisabled}
                            removeAction={removeAction}
                            editAction={editAction}
                            elemValueClasses={"list-element"}
                            btnEditClasses={"btn btn-primary list-btn-edit"}
                            btnRemoveClasses={"btn btn-primary list-btn-remove"}
                        />
                    );
                })
                :  <p>Добавьте элементы в список!</p>
            }
            </ol>
            </div>
        </div>
    );
}