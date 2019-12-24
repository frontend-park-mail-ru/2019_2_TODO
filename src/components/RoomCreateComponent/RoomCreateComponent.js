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
      console.log(JSON.stringify({
        playersInRoom: form.elements.playersNumber.value,
        private: form.elements.privacy.value,
        minBet: form.elements.blindsValue.value,
        password: '',
      }));
      AjaxModule.fetchPost('/api/create_room/', JSON.stringify({
        playersInRoom: form.elements.playersNumber.value,
        private: form.elements.privacy.value,
        minBet: form.elements.blindsValue.value,
        password: '',
      })).then(() => {
        form.remove();
      });
    });
  }
}
