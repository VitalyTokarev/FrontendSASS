import React from 'react';
import ReactDOM from 'react-dom';

export default ( { options, handleChangeMySelect, style } ) => {

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
}