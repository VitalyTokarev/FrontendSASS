import React from 'react';
import PropTypes from 'prop-types';

import BootstrapContainer from '../BootstrapContainer';
import Button from '../Button';
import './index.css';

const List = ({
    list,
    removeButtonDisabled,
    removeAction,
    editAction
}) => {

    const createList = () => {
        return (
            list.length ?  
            list.map( item => {
                let valueItem = '';
                for ( const key in item) {
                    if ( key !== '_id' ) {
                        valueItem += item[key] + ' ';
                    }
                }

                return (
                    <li key={item._id}>
                        <p className="List-Element">{valueItem}</p>
                        <Button
                            btnClass="List-ButtonEdit"
                            handleOnClick={() => {editAction(item._id)}}
                            name="Редактировать"
                        />
                        <Button
                            disabled={removeButtonDisabled}
                            btnClass="List-ButtonRemove"
                            handleOnClick={() => {removeAction(item._id)}}
                            name="Удалить"
                        />
                    </li>
                );
            })
            :  <p>Добавьте элементы в список!</p>
        );
    };
    return (
        <BootstrapContainer colClasses="col-6 mx-auto">
            <ol className={"List"}>
                {createList()}
            </ol>
        </BootstrapContainer>
    );
};

List.defaultProps = {
    removeButtonDisabled: false,
};

List.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired, 
        })
    ).isRequired,
    removeButtonDisabled: PropTypes.bool,
    removeAction: PropTypes.func.isRequired,
    editAction: PropTypes.func.isRequired,
};

export default List;