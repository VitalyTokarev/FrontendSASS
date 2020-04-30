import React from 'react';

import BootstrapContainer from '../BootstrapContainer';
import TableRow from './TableRow';

export default function List(props) {
    const {
        list,
        removeButtonDisabled,
        removeAction,
        editAction
    } = props;

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
}