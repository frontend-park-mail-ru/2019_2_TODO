import {HeaderComponent} from "../Header/Header.js";
import {DeckFanComponent} from "../DeckFan/DeckFan.js";


export const StartScreen = (application) => {
    application.innerHTML = '';
    // AjaxModule._fetch("/").then(rez => {
        console.log(rez);
        const header = new HeaderComponent(application);
        header.render();
        const deck = new DeckFanComponent(application);
        deck.render();
    // });
};