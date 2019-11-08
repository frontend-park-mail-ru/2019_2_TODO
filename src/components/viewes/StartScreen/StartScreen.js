import {HeaderComponent} from '../../Header/Header.js';
import {DeckFanComponent} from '../../DeckFan/DeckFan.js';
import AjaxModule from '../../../module/ajax.js';
import BaseView from '../BaseView/BaseView.js';
import {ButtonPanel} from '../../ButtonPanel/ButtonPanel.js';


export default class StartScreen extends BaseView {
  constructor(element) {
    super(element);
  }

  render() {
    this.el.innerHTML = '';
    const application = document.createElement('section');
    AjaxModule.fetchGet('http://93.171.139.196:780/signin/')
        .catch((res) => {
          const header = new HeaderComponent(application, false, true);
          header.render();
          const deck = new DeckFanComponent(application);
          deck.render();
          // Кнопка
          const button = new ButtonPanel({});
          application.innerHTML += button.render();
        })
        .then((res) => res.text())
        .then((resText) => {
          console.log(resText);
          if (resText) {
            console.log(JSON.parse(resText));
            window.username = JSON.parse(resText).username;
            window.avatar = JSON.parse(resText).image;
            const header = new HeaderComponent(application, true, false, window.avatar, window.username);
            console.log(window.username);
            header.render();
            const deck = new DeckFanComponent(application);
            deck.render();
            const button = new ButtonPanel({});
            application.innerHTML += button.render();
          } else {
            const header = new HeaderComponent(application, false, false);
            header.render();
            const deck = new DeckFanComponent(application);
            deck.render();
            const button = new ButtonPanel({});
            application.innerHTML += button.render();
          }
        });
    this.el.appendChild(application);
  }
}

/*
* @param {HTMLElement} application - контейнер HTML,
* в котором отрисовывается верстка
 */
// export const startScreen = (application) => {
//   application.innerHTML = '';
//   AjaxModule.fetchGet('http://93.171.139.196:780/signin/')
//       .catch((res) => {
//         const header = new HeaderComponent(application);
//         header.render();
//         const deck = new DeckFanComponent(application);
//         deck.render();
//       })
//       .then((res) => res.text())
//       .then((resText) => {
//         console.log(resText);
//         if (resText) {
//           console.log(JSON.parse(resText));
//           const header = new HeaderComponent(application, true);
//           console.log(JSON.parse(resText).username);
//           header.render(JSON.parse(resText));
//           const deck = new DeckFanComponent(application);
//           deck.render();
//         } else {
//           const header = new HeaderComponent(application);
//           header.render();
//           const deck = new DeckFanComponent(application);
//           deck.render();
//         }
//       });
// };
