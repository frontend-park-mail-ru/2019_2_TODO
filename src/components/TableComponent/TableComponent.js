import BaseComponent from '../BaseComponent/BaseComponent';
import template from './TableComponent.hbs';

export class TableComponent extends BaseComponent {
  constructor(context) {
    super(context);
    this.template = template;
  }
}
