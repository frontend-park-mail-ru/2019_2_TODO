import BaseComponent from '../BaseComponent/BaseComponent.js';
import template from './ButtonPanel.hbs';

export class ButtonPanel extends BaseComponent {
  constructor(context) {
    super(context);
    this.template = template;
  }
}
