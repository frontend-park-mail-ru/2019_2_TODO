import React from 'react';
import {ButtonTemplate} from './Button.jsx';
import './Button.scss';

/** Компонент кнопка */
export default class ButtonComponent extends React.Component{
    constructor(props){
        super(props);
    }
    /**Рендер кнопки */
  render(){
    return ButtonTemplate(this.props);
  }
};