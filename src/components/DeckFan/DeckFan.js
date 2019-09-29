import { TextComponent } from '../TextComponent/Text.js'
import BaseComponent from '../BaseComponent/BaseComponent.js'

/*
* Компонент карты для стартового меню
 */

export class CardComponent extends BaseComponent {
  constructor (context) {
    super()
    this.context = context
    this.template = Handlebars.compile(`
            <button class="card">
                <a class="cardNominal">{{Nominal}}</a>
                <a class="cardText">{{text}}</a>
            </button>`
    )
  }
}

const Cards = [{
  text: 'offline',
  nominal: 'A'
}, {
  text: 'online',
  nominal: 'K'
}, {
  text: 'your profile',
  nominal: 'Q'
}, {
  text: 'scoreboard',
  nominal: 'J'
}, {
  text: 'about',
  nominal: '10'
}]

/*
* Класс для нескольких карт
 */

export class DeckFanComponent {
  constructor (parent = document.body) {
    this._parent = parent
  }

  render () {
    const container = document.createElement('section')
    container.className = 'container'
    Cards.forEach(({ text, Nominal }) => {
      const Card = new CardComponent({
        Nominal,
        text
      })
      container.innerHTML += Card.render()
    })
    this._parent.appendChild(container)
  }
}
