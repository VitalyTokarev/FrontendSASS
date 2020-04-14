import React from "react";
import ReactDOM from 'react-dom';

export default class Options extends React.Component {
    
    render() {
        const  {
            closeState,
            options,
            handleChangeMySelect,
            getOptionsRef,
        } = this.props;

        return (
            ReactDOM.createPortal(
                <div 
                    className="my-select-options" 
                    hidden={closeState}
                    ref={getOptionsRef}
                >
                {
                    options.map( item => {
                        return (
                            <p  
                                key={item}
                                className="option"
                                onClick={() => {handleChangeMySelect(item);}}
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
}