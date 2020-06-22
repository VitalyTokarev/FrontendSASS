import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import './index.css';

const Options = ( { options, handleChangeMySelect, style } ) => {

    return (
        ReactDOM.createPortal(
            <div 
                className="Options" 
                style={style}
            >
            {
                options.map( item => {
                    return (
                        <p  
                            key={item}
                            role="option"
                            className="Options-Option"
                            aria-selected={false}
                            onClick={handleChangeMySelect}
                        >{item}
                        </p>
                    );
                })
            }   
            </div>,
            document.body
        )
    );    
};

Options.defaultProps = {
    options: [],
};

Options.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string), 
    handleChangeMySelect: PropTypes.func.isRequired, 
    style: PropTypes.object.isRequired,
};

export default Options;