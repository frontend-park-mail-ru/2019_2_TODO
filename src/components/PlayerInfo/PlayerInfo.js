import BaseComponent from '../BaseComponent/BaseComponent';
import template from './PlayerInfo.hbs';

/** Игровая информация*/
export class PlayerInfo extends BaseComponent {
  /**
   * Создать
   * @param {Object} context
   */
  constructor(context) {
    super(context);
    this.template = template;
  }
}
