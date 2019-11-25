import BaseView from '../BaseView/BaseView';
import {TableComponent} from '../../components/TableComponent/TableComponent';
import {HeaderComponent} from '../../components/Header/Header';


export default class TableView extends BaseView {
  constructor(element) {
    super(element);
  }

  render() {
    this.el.innerHTML = '';
    const application = this.el;
    const header = new HeaderComponent(
      application,
      user.isAuth,
      user.avatar,
      user.username,
    );
    header.render();
    const tables = document.createElement('div');
    tables.className = 'tables';
    const table = new TableComponent({
      taken: '1',
      all: '2',
    });
    tables.innerHTML += table.render();
    tables.innerHTML += table.render();
    tables.innerHTML += table.render();
    application.appendChild(tables);
  }
}
