import BaseComponent from '../BaseComponent/BaseComponent.js';

/** Класс представляющий карточку для стартого экрана. */
export class CardComponent extends BaseComponent {
  /**
   * Создать карточку
   * @param {string} context -контекст для карточки
   */
  constructor(context) {
    super();
    this.context = context;
    this.template = Handlebars.compile(`
            <button class="deckFun__card">
                <a class="deckFun__card__nominal">{{nominal}}</a>
                <a class="deckFun__card__text">{{text}}</a>
            </button>`
    );
  }
}

const Cards = [{
  text: 'offline',
  nominal: 'A',
}, {
  text: 'online',
  nominal: 'K',
}, {
  text: 'your profile',
  nominal: 'Q',
}, {
  text: 'scoreboard',
  nominal: 'J',
}, {
  text: 'about',
  nominal: '10',
}];

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
    Cards.forEach(({text, nominal}) => {
      const Card = new CardComponent({
        nominal,
        text,
      });
      container.innerHTML += Card.render();
    });
    this._parent.appendChild(container);
  }
}
