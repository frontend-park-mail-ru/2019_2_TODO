import BaseComponent from '../BaseComponent/BaseComponent';
import template from './PlayerInfo.hbs';

export class PlayerInfo extends BaseComponent {
  constructor(context) {
    super(context);
    this.template = template;
  }
}
