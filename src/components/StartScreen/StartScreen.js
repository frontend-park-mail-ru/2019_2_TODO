import {HeaderComponent} from "../Header/Header.js";
import {DeckFanComponent} from "../DeckFan/DeckFan.js";


export const StartScreen = (application) => {
    application.innerHTML = '';
    fetch("http://93.171.139.196:780/signin/",
        {
            credentials: 'include',
            method: 'GET',
            keepalive: true
        })
        .then(res => res.text())
        .then(resText => {
            console.log(resText);
            if (resText) {
                console.log(JSON.parse(resText));
                const header = new HeaderComponent(application, true);
                console.log(JSON.parse(resText).username);
                header.render(JSON.parse(resText));
                const deck = new DeckFanComponent(application);
                deck.render();
            }
            else {
                const header = new HeaderComponent(application, false);
                header.render();
                const deck = new DeckFanComponent(application);
                deck.render();
            }
        });
};
