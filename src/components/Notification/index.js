import React from 'react';
import './index.css';
import ee from 'event-emitter';

import { NotificationContext } from '../../context/Notification';

const emitter = new ee();

const notify = msg => {
    emitter.emit('notification' , msg);
}

export default WrappedComponent => {
    return class Notification extends React.Component {
        constructor(props){
            super(props);
            
            this.state = {
                style: {top: -100 + 'px'},
                msg: '',
                visible: false
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
                        style: {top: -100 + 'px'},
                        visible: false
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
                    visible: true,
                    style: {top: 16 + 'px'},
                    msg: msg
                }, 
                () => {
                    this.timeout = setTimeout(() => {
                        this.setState({
                            style: {top: -100 + 'px'},
                            visible:false
                        }); 
                    }, 3000);
                }
            );
        };

        render = () => {
            return(
                <React.Fragment>
                    {this.state.visible && 
                    <div className="notification" style={this.state.style}>
                        {this.state.msg}
                    </div>}
                        <NotificationContext.Provider 
                            value = { notify }
                        >
                            <WrappedComponent {...this.props}/>
                        </NotificationContext.Provider>
                        }
                </React.Fragment>               
            );
        };
    }
}