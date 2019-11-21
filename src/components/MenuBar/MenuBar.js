import React from 'react';
import {MenuBarTemplate} from './MenuBar.jsx';
import './MenuBar.scss';

export default class MenuBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return MenuBarTemplate(this.props);
  }
}
// export class MenuTemplate extends BaseComponent {
//   constructor(context) {
//     super(context);
//     this.template = template;
//   }
// }
//
// export class MenuBar {
//   constructor(parent) {
//     this._parent = parent;
//   }
//
//   render() {
//     const menuTemplate = new MenuTemplate();
//     this._parent.innerHTML += menuTemplate.render();
//   }
// }
