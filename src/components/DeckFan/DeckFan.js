import BaseComponent from '../BaseComponent/BaseComponent.js';
import template from './DeckFan.hbs';
/** Класс представляющий карточку для стартого экрана. */
export class CardComponent extends BaseComponent {
  /**
   * Создать карточку
   * @param {string} context -контекст для карточки
   */
  constructor(context) {
    super(context);
    this.template = template;
  }
}


const Cards = [{
  text: 'offline',
  nominal: 'A',
  href: '/offline',
}, {
  text: 'online',
  nominal: 'K',
  href: '/online',
}, {
  text: 'your profile',
  nominal: 'Q',
  href: '/profile',
}, {
  text: 'scoreboard',
  nominal: 'J',
  href: '/scoreboard',
}, {
  text: 'about',
  nominal: '10',
  href: '/about',
}, {
  text: 'about',
  nominal: '9',
  href: '/about',
}, {
  text: 'about',
  nominal: '8',
  href: '/about',
}];

// const F = [{
//   tag: 'h1',
//   text: 'offline',
//   href: '/offline',
// }, {
//   tag: 'h1',
//   text: 'online',
//   href: '/online',
// }, {
//   tag: 'h1',
//   text: 'your profile',
//   href: '/profile',
// }, {
//   tag: 'h1',
//   text: 'scoreboard',
//   href: '/scoreboard',
// }];

/** Класс для набора карт. */
export class DeckFanComponent {
  /**
   * Создать набор карт
   * @param {HTMLElement} parent - родитель,
   * в который вставлются карты
   */
  constructor(parent = document.body) {
    this._parent = parent;
  }

  /**
   * отрисовть набор карт
   */
  render() {
    const container = document.createElement('section');
    container.className = 'deckFun';
    Cards.forEach(({text, nominal, href}) => {
      const Card = new CardComponent({
        nominal,
        text,
        href,
      });
      container.innerHTML += Card.render();
    });
    this._parent.appendChild(container);
  }
}
