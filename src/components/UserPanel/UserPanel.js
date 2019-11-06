import BaseComponent from '../BaseComponent/BaseComponent.js';
import template from './UserPanel.hbs';

export class UserPanel extends BaseComponent{
  constructor(context) {
    super(context);
    this.template = template;
  }
}