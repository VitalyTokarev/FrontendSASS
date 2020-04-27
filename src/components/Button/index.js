import React from "react";

export default function Button(props) {
    const {
        handleOnClick,
        btnClass,
        type,
        name
    } = props;

    return (
        <button
            type={type}
            onClick={handleOnClick}
            className={btnClass}
        >{name}
        </button>
    );
}