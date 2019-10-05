import {HeaderComponent} from '../Header/Header.js';
import {DeckFanComponent} from '../DeckFan/DeckFan.js';
import AjaxModule from '../../module/ajax.js';

/*
* @param {HTMLElement} application - контейнер HTML,
* в котором отрисовывается верстка
 */
export const StartScreen = (application) => {
  application.innerHTML = '';
  AjaxModule.fetchGet('http://93.171.139.196:780/signin/')
      .catch( res => {
          const header = new HeaderComponent(application);
          header.render();
          const deck = new DeckFanComponent(application);
          deck.render();
      })
      .then((res) => res.text())
      .then((resText) => {
        console.log(resText);
        if (resText) {
          console.log(JSON.parse(resText));
          const header = new HeaderComponent(application, true);
          console.log(JSON.parse(resText).username);
          header.render(JSON.parse(resText));
          const deck = new DeckFanComponent(application);
          deck.render();
        } else {
          const header = new HeaderComponent(application);
          header.render();
          const deck = new DeckFanComponent(application);
          deck.render();
        }
      });
};
