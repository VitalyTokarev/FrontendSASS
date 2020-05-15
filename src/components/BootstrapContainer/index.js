import React from 'react';
import PropTypes from 'prop-types';

const BootstrapContainer = ( { colClasses, children } ) => {
     return (
        <div className="container">
            <div className="row">
                <div className={colClasses}>
                    {children}
                </div>
            </div>
        </div>
    );
};

BootstrapContainer.defaultProps = {
    colClasses: 'col-12 mx-auto'
};

BootstrapContainer.propTypes = {
    colClasses: PropTypes.string,
    children: PropTypes.element.isRequired,
};

export default BootstrapContainer;