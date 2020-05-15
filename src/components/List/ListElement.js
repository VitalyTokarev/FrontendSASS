import React from 'react';
import PropTypes from 'prop-types';

const ListElement = ({
    id,
    valueItem,
    elemValueClasses,
    btnEditClasses,
    editAction,
    removeButtonDisabled,
    btnRemoveClasses,
    removeAction,
}) => {

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
};

ListElement.defaultProps = {
    removeButtonDisabled: false,
    valueItem: '',
    elemValueClasses: '',
    btnEditClasses: '',
    btnRemoveClasses: '',
};

ListElement.propTypes = {
    id: PropTypes.string.isRequired,
    valueItem: PropTypes.string,
    elemValueClasses: PropTypes.string,
    btnEditClasses: PropTypes.string,
    btnRemoveClasses: PropTypes.string,
    removeButtonDisabled: PropTypes.bool,
    removeAction: PropTypes.func.isRequired,
    editAction: PropTypes.func.isRequired,
};

export default ListElement;