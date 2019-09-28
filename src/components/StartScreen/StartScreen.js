import {HeaderComponent} from "../Header/Header.js";
import {DeckFanComponent} from "../DeckFan/DeckFan.js";


export const StartScreen = (application) => {
    application.innerHTML = '';
    AjaxModule._fetchGet("http://localhost:3000/c")
        .then(res => res.text())
        .then(res => {
            console.log(res);
        if (res) {
            const header = new HeaderComponent(application, true);
            header.render(JSON.parse(res));
            const deck = new DeckFanComponent(application);
            deck.render();
        }else {
            const header = new HeaderComponent(application, false);
            header.render();
            const deck = new DeckFanComponent(application);
            deck.render();
        }
    });


};