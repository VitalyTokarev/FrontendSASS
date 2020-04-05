import React from "react";

class Button extends React.Component {

    render() {
        const  {
            handleOnClick,
            btnClass,
            type,
            name
        } = this.props;

        return (
            <button
                type={type}
                onClick={handleOnClick}
                className={btnClass}
            >{name}
            </button>
        );
    }
}

export default Button;