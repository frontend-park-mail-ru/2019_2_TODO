import BaseComponent from '../BaseComponent/BaseComponent';
import template from './TableComponent.hbs';
import {RoomPlayerInfo} from '../RoomPlayerInfo/RoomPlayerInfo';

export class TableComponent extends BaseComponent {
  constructor(context) {
    super(context);
    this.template = template;
  }
}

export class Table {
  constructor(
    places,
    parent,
    tablesId,
  ) {
    this._parent = parent;
    this._places = places;
    this._tablesId = tablesId;
  }

  render() {
    const table = new TableComponent({
      roomBet: 500,
      id: this._tablesId,
    });
    const tables = document.getElementById('tables');
    tables.appendChild(table.render());
    const t = document.getElementById(this._tablesId);
    for (let i = 0; i < this._places; i++) {
      const player = new RoomPlayerInfo({
        Nickname: 'Resg',
      });
      t.appendChild(player.render());
    }
  }
}
