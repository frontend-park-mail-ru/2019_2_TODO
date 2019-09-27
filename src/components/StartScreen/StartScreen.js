import {HeaderComponent} from "../Header/Header.js";
import {DeckFanComponent} from "../DeckFan/DeckFan.js";


export const startScreen = (application) => {
    application.innerHTML = '';
    const header = new HeaderComponent(application, false);
    header.render();
    const deck = new DeckFanComponent(application);
    deck.render();

};