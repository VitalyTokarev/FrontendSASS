import React from 'react';
import ReactDOM from 'react-dom';

export default class Options extends React.Component {
    
    render = () => {
        const  {
            options,
            handleChangeMySelect,
            getOptionsRef,
            style
        } = this.props;

        return (
            ReactDOM.createPortal(
                <div 
                    className="my-select-options" 
                    ref={getOptionsRef}
                    style={style}
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