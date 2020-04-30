import React from "react";

export default function Button(props) {
    const {
        handleOnClick,
        btnClass,
        type,
        name,
        disabled
    } = props;

    return (
        <button
            type={type}
            onClick={handleOnClick}
            className={btnClass}
            disabled={disabled || false}
        >{name}
        </button>
    );
}