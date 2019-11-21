import React from 'react';
import {InfoBarTemplate} from './InfoBar.jsx';
import './InfoBar.scss';


export default class InfoBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return InfoBarTemplate(this.props);
  }
}
