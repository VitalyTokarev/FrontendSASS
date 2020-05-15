import React from 'react';
import PropTypes from 'prop-types';

import BootstrapContainer from '../BootstrapContainer';

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
                        <p className="list-element">{valueItem}</p>
                        <button
                            className="btn btn-primary list-btn-edit"
                            onClick={() => {editAction(item._id)}}
                        >Редактировать
                        </button>
                        <button
                            disabled={removeButtonDisabled}
                            className="btn btn-primary list-btn-remove"
                            onClick={() => {removeAction(item._id)}}
                        >Удалить
                        </button>
                    </li>
                );
            })
            :  <p>Добавьте элементы в список!</p>
        );
    };
    return (
        <BootstrapContainer colClasses="col-6 mx-auto">
            <ol className={"list"}>
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