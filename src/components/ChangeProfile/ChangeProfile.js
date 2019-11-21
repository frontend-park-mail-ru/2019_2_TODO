import BaseComponent from '../BaseComponent/BaseComponent';
import template from './ChangeProfile.hbs';


export default class ChangeProfile extends BaseComponent {
  constructor(context) {
    super(context);
    this.template = template;
  }
}