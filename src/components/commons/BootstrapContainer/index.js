import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const BootstrapContainer = ( { colClasses, children } ) => {
     return (
        <div className="Container">
            <div className="Row">
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