import BaseComponent from '../BaseComponent/BaseComponent';
import template from './OnlineComponent.hbs';

export class OnlineComponent extends BaseComponent {
  constructor(context) {
    super(context);
    this.template = template;
  }
}
//
// export class OnlineTable {
//   constructor(
//     parent,
//   ) {
//     this._parent = parent;
//   }
//
//   render() {
//     const table = new OnlineComponent();
//     this._parent.appendChild(table.render());
//   }
// }
