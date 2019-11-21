import React from 'react';
import {MenuBarTemplate} from './MenuBar.jsx';
import './MenuBar.scss';

export default class MenuBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <MenuBarTemplate {...this.props}/>;
  }
}