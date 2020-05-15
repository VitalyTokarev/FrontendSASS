import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';


const Options = ( { options, handleChangeMySelect, style } ) => {

    return (
        ReactDOM.createPortal(
            <div 
                className="my-select-options" 
                style={style}
            >
            {
                options.map( item => {
                    return (
                        <p  
                            key={item}
                            className="option"
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