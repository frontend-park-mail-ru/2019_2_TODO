import React from 'react';
import {CardTemplate} from './Card.jsx';
import './Card.scss';


export default class Card extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return CardTemplate(this.props);
  }
};