import React from 'react';

export default props => {
    const {
        index,
        _id,
        name,
        email,
        role,
        editAction,
        removeButtonDisabled,
        removeAction,
    } = props;

    return(
        <tr className="text-center">
            <th scope="row">{index}</th>
            <td>{_id}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{role}</td>
            <td>
                <button
                    className="btn btn-primary"
                    onClick={() => {editAction(_id)}}
                >Редактировать
                </button>
            </td>
            <td>            
                <button
                    disabled={removeButtonDisabled}
                    className="btn btn-primary"
                    onClick={() => {removeAction(_id)}}
                >Удалить
                </button>
            </td>
        </tr>
    );
}