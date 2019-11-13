import BaseComponent from '../BaseComponent/BaseComponent';
import template from './Table.hbs';

/**
 * Table
 */
export class Table extends BaseComponent {
  /**
   * Конструктор
   * @param context
   */
  constructor(context) {
    super(context);
    this.template = template;
  }
}
