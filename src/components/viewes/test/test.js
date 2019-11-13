import BaseView from '../BaseView/BaseView';
import {Table} from '../../Table/Table.js';
/**
 * test
 */
export default class test extends BaseView {
  /**
   * adas
   * @param element asd
   */
  constructor(element) {
    super(element);
  }

  /**
   * asda
   */
  render() {
    this.el.innerHTML = '';
    const table = new Table();
    this.el.innerHTML = table.render();
  }
}
