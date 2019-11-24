import BaseComponent from '../BaseComponent/BaseComponent';
import template from './ProfileComponent.hbs';

export default class ProfileComponent extends BaseComponent {
  constructor(context) {
    super();
    this.context = context;
    this.template = template;
  }
}
