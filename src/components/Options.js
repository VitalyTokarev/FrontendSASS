import React from "react";
import ReactDOM from 'react-dom';

class Options extends React.Component {
    componentDidMount() {
        this.options = document.querySelector('.my-select-options');
        this.mySelect = document.querySelector(`.${this.props.classMySelect}`);
        this.firstUpdateComplete = false;

        window.addEventListener('resize', this.renderOptionsPosition);
    }

    componentDidUpdate() {
        if(!this.props.closeState) {
            this.onClickClose();
        } 
        if(this.firstUpdateComplete) {
            return;
        }
        this.renderOptionsPosition();  
        this.firstUpdateComplete = true; 
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.renderOptionsPosition);
    }

    renderOptionsPosition = () => {
        const box = this.mySelect.getBoundingClientRect();

        const boxObjects = {
            bottom: box.bottom + window.pageYOffset,
            left: box.left + window.pageXOffset,
            right: box.right + window.pageXOffset
        }
        this.options.style.cssText = `
          top: ${boxObjects.bottom}px;
          left: ${boxObjects.left}px;
          width: ${boxObjects.right-boxObjects.left}px;
        `;
    }

    onClickClose() {
        document.addEventListener('click', this.outsideClickListener);
    }

    outsideClickListener = event => {
        if (!this.options.contains(event.target) && !this.mySelect.contains(event.target)) { 
             this.props.closeOptionsSelect();
             document.removeEventListener('click', this.outsideClickListener);
        }
    }

    render() {
        const  {
            closeState,
            options,
            onClickOption,
        } = this.props;

        return (
            ReactDOM.createPortal(
                <div 
                    className="my-select-options" 
                    hidden={closeState}
                >
                {
                    options.map( item => {
                        return (
                            <p  
                                key={item}
                                className="option"
                                onClick={() => {onClickOption(item);}}
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

export default Options;