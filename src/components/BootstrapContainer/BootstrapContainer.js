import React from 'react';

export default function BootstrapContainer(props) {
     return (
        <div className="container">
            <div className="row">
                <div className={props.colClasses}>
                    {props.children}
                </div>
            </div>
        </div>
    );
};