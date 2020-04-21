import React from 'react';

export default function ListElement(props) {
    const {
        id,
        valueItem,
        elemValueClasses,
        btnEditClasses,
        editAction,
        removeButtonDisabled,
        btnRemoveClasses,
        removeAction,
    } = props;

    return(
        <li>
            <p className={elemValueClasses}>{valueItem}</p>
            <button
                className={btnEditClasses}
                onClick={() => {editAction(id)}}
            >Редактировать
            </button>
            <button
                disabled={removeButtonDisabled}
                className={btnRemoveClasses}
                onClick={() => {removeAction(id)}}
            >Удалить
            </button>
        </li>
    );
}