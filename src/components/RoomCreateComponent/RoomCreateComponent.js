import BaseComponent from '../BaseComponent/BaseComponent';
import template from './RoomCreateComponent.hbs';
import AjaxModule from '../../module/AjaxModule/ajax';

export default class RoomCreateComponent extends BaseComponent {
  constructor(element) {
    super(element);
    this.template = template;
  }
  addHandlers() {
    const form = this.element;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      AjaxModule.fetchPost('/api/create_room/', JSON.stringify({
        playersInRoom: parseInt(form.elements.playersNumber.value),
        private: parseInt(form.elements.privacy.value) ? true : false,
        password: '',
        minBet: parseInt(form.elements.blindsValue.value),
      })).then(() => {
        form.remove();
      });
    });
  }
}
