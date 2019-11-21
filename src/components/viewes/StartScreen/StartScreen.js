import React from 'react';
import {Link} from 'react-router-dom'
import Button from '../../Button/Button.js'
import Card from "../../Card/Card.js";
import InfoBar from "../../InfoBar/InfoBar";

export default class StartScreen extends React.Component {
    render(){
        return (
            <div>
                <InfoBar src={'/assets/logo.jpg'}/>
                <Button text='hello'/>
                <Card nominal='Ah' cardId='0' second=''/>
            </div>
        );
    }
}
