import React from 'react';
import PropTypes from 'prop-types';

import BootstrapContainer from '../BootstrapContainer';
import TableRow from './TableRow';

const TableUsers = ({
    list,
    removeButtonDisabled,
    removeAction,
    editAction
}) => {

    const createTableContent = () => {
        let count = 0;
        
        return list.map(({_id, name, email, role}) => {
            count++;
            return (
            <TableRow
                key={_id}
                index={count}
                _id={_id}
                name={name}
                email={email}
                role={role}
                removeButtonDisabled={removeButtonDisabled}
                removeAction={removeAction}
                editAction={editAction}
            />
            );
        });
    };

    return (
        <BootstrapContainer colClasses="col-12">
            <table className="table">
                <thead className="thead-dark">
                    <tr className="text-center">
                        <th scope="col">#</th>
                        <th scope="col">id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {createTableContent()}
                </tbody>
            </table>
        </BootstrapContainer>
    );
};

TableUsers.defaultProps = {
    removeButtonDisabled: false,
};

TableUsers.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired, 
            name: PropTypes.string.isRequired, 
            email: PropTypes.string.isRequired, 
            role: PropTypes.string.isRequired,
        })
    ).isRequired,
    removeButtonDisabled: PropTypes.bool,
    removeAction: PropTypes.func.isRequired,
    editAction: PropTypes.func.isRequired,
};

export default TableUsers;