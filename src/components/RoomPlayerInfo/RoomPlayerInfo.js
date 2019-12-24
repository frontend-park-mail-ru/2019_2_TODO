import BaseComponent from '../BaseComponent/BaseComponent';
import template from './RoomPlayerInfo.hbs';

export class RoomPlayerInfo extends BaseComponent {
  constructor(context) {
    super(context);
    this.template = template;
  }
}
