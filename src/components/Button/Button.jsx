import React from "react";

export const ButtonTemplate = (props) => {
    return (
        <button className={props.className || 'button'} onClick={props.onClick}>
            {props.text}
        </button>
    )
};