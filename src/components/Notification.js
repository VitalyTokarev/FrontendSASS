import React from 'react';
import '../css/notification.css';
import ee from 'event-emitter';

const emitter = new ee();

export const notify = msg => {
    emitter.emit('notification' , msg);
}

export default class Notification extends React.Component {

    constructor(props){
        super(props);
        
        this.state = {
            style: {top: -100 + 'px'},
            msg: ''
        };

        this.timeout = null;

        emitter.on('notification', msg => {
            this.onShow(msg);
        });
    }
    
    onShow = msg => {
        if(this.timeout) {
            clearTimeout(this.timeout);

            this.setState({
                    style: {top: -100 + 'px'}
                }, 
                () => {
                    this.timeout = setTimeout(() =>{
                        this.showNotification(msg);
                    }, 500);
                }
            );
        } else {
            this.showNotification(msg);
        }
    };

    showNotification = msg => {
        this.setState({
                style: {top: 16 + 'px'},
                msg: msg
            }, 
            () => {
                this.timeout = setTimeout(() => {
                    this.setState({
                        style: {top: -100 + 'px'},
                    }); 
                }, 3000);
            }
        );
    };


    render = () => {
        return(
            <React.Fragment>
            <div className="notification" style={this.state.style}>
                {this.state.msg}
            </div>
            </React.Fragment>
        );
    };

}