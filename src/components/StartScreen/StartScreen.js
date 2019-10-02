import {HeaderComponent} from '../Header/Header.js';
import {DeckFanComponent} from '../DeckFan/DeckFan.js';
import AjaxModule from '../../module/ajax.js';

/*
* @param {HTMLElement} application - контейнер HTML,
* в котором отрисовывается верстка
 */
function hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
}
export const StartScreen = (application) => {
  application.innerHTML = '';
  AjaxModule._fetchGet('http://93.171.139.196:780/signin/')
      .then((res) => res.text())
      .then((resText) => {
        console.log(resText);
        if (resText) {
          //console.log(JSON.parse(resText));
          const header = new HeaderComponent(application, true);
          //console.log(JSON.parse(resText).username);
            const img = document.createElement('img');
            //img.src = 'data:image/jpeg;base64,' + hexToBase64();
            img.src = resText;
            document.body.appendChild(img);
          //window._image = URL.createObjectURL(resText);
          //header.render(JSON.parse(resText));
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
