import React from 'react';
import PropTypes from 'prop-types';

const TableRow = ({
    index,
    _id,
    name,
    email,
    role,
    editAction,
    removeButtonDisabled,
    removeAction,
}) => {

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
};

TableRow.defaultProps = {
    removeButtonDisabled: false,
};

TableRow.propTypes = {
    _id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    removeButtonDisabled: PropTypes.bool,
    removeAction: PropTypes.func.isRequired,
    editAction: PropTypes.func.isRequired,
};

export default TableRow;