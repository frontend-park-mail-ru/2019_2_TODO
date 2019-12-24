import BaseComponent from '../BaseComponent/BaseComponent';
import template from './OnlineComponent.hbs';

export class OnlineComponent extends BaseComponent {
  constructor(context) {
    super(context);
    this.template = template;
  }
  // render() {
  //   this.compile();
  //   this.element.children[2].addEventListener('click', (event) => {
  //     event.preventDefault();
  //
  //   });
  //   return this.element;
  // }
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
