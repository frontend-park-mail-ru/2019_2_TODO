import React from 'react';
import './Card.scss'
export const CardTemplate = (props) => {
    return (
        <div  id={props.cardId} className={'card'+props.second} data-nominal={props.nominal} hidden>
        </div>
    )
};
