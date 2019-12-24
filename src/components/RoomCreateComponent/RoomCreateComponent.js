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
      console.log({
        playersInRoom: form.elements.playersNumber.value,
        private: form.elements.privacy.value,
        minBet: form.elements.blindsValue,
        password: '',
      });
      AjaxModule.fetchPost('/api/create_room/', {
        playersInRoom: form.elements.playersNumber.value,
        private: form.elements.privacy.value,
        minBet: form.elements.blindsValue,
        password: '',
      }).then(() => {
        form.remove();
      });
    });
  }
}
