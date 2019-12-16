import template from './LeaderInfo.hbs';
import BaseComponent from '../BaseComponent/BaseComponent';

export default class LeaderInfo extends BaseComponent {
  constructor(context) {
    super(context);
    this.template = template;
  }
}
