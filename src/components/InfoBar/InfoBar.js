import BaseComponent from '../BaseComponent/BaseComponent';
import template from './InfoBar.hbs';

/** Информация о пользователе*/
export class InfoBar extends BaseComponent {
  /**
   * Создать
   * @param {Object} context
   */
  constructor(context) {
    super(context);
    this.template = template;
  }

  /**
   * Отрисовать
   * @return {HTMLElement}
   */
  render() {
    this.compile();
    this.element.children.infoAvatar.addEventListener('click', (event) => {
      window.router.open('/profile');
    });
    this.element.children.logout.addEventListener('click', (event) => {
      user.logOut();
    });
    return this.element;
  }
}
