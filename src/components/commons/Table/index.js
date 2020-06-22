import React from 'react';
import PropTypes from 'prop-types';

import BootstrapContainer from '../BootstrapContainer';
import Button from '../Button';

const Table = ({
    tableHeaders,
    list,
    removeButtonDisabled,
    removeAction,
    editAction
}) => {
    const createTableHeader = () => {
        if (tableHeaders) {
            return (
                <tr className="text-center">
                    <th scope="col">#</th>
                    {tableHeaders.map( item => {
                    return <th key={item}>{item}</th>
                    })
                    }
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
            );
        }

        if (list.length === 0) {
            return <tr></tr>;
        }
        const keys = Object.keys(list[0]);

        if( keys.length === 0) {
            return <tr></tr>;
        }

        return (
            <tr className="text-center">
                <th scope="col">#</th>
                {keys.map( item => {
                return <th key={item}>{item}</th>
                })
                }
                <th scope="col"></th>
                <th scope="col"></th>
            </tr>
        );
    };
    const createTableContent = () => {
        return list.map( 
            (item, index ) => {
                let values = [];
                for (const key in item) {
                    values.push(item[key]);
                }
                return(        
                    <tr key={item._id} className="text-center">
                        <th className="align-middle" scope="row">{index + 1}</th>
                        {values.map( key => {
                            return <td className="align-middle" key={key}>{key}</td>;
                        })}
                        <td className="align-middle">
                            <Button
                                handleOnClick={() => {editAction(item._id)}}
                                name="Редактировать"
                            />
                        </td>
                        <td className="align-middle">            
                            <Button
                                disabled={removeButtonDisabled}
                                handleOnClick={() => {removeAction(item._id)}}
                                name="Удалить"
                            />
                        </td>
                    </tr>
                );
            }
        );
    };

    return (
        <BootstrapContainer colClasses="col-12">
            <table className="table">
                <thead className="thead-dark">
                    {createTableHeader()}
                </thead>
                <tbody>
                    {createTableContent()}
                </tbody>
            </table>
        </BootstrapContainer>
    );
};

Table.defaultProps = {
    removeButtonDisabled: false,
};

Table.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired, 
        })
    ).isRequired,
    removeButtonDisabled: PropTypes.bool,
    removeAction: PropTypes.func.isRequired,
    editAction: PropTypes.func.isRequired,
    tableHeaders: PropTypes.arrayOf(PropTypes.string.isRequired),
};

export default Table;