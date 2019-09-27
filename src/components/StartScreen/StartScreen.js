import {HeaderComponent} from "../Header/Header.js";
import {DeckFanComponent} from "../DeckFan/DeckFan.js";


export const StartScreen = (application) => {
    application.innerHTML = '';
    AjaxModule._fetch("http://93.171.139.196:780/checkUsers").then(rez => {
        console.log(rez);
        const header = new HeaderComponent(application, false);
        header.render();
        const deck = new DeckFanComponent(application);
        deck.render();
    });


};