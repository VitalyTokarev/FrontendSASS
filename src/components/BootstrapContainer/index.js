import React from 'react';

export default ( { colClasses, children } ) => {
     return (
        <div className="container">
            <div className="row">
                <div className={colClasses}>
                    {children}
                </div>
            </div>
        </div>
    );
};