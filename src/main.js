import {HeaderComponent} from "./components/Header/Header.js";
import {DeckFanComponent} from "./components/DeckFan/DeckFan.js";
//import {ButtonComponent} from "./components/Button/Button.js";

const application = document.getElementById('application');


const startScreen = () => {
    application.innerHTML = '';
    const header = new HeaderComponent(application, false);
    header.render();
    const deck = new DeckFanComponent(application);
    deck.render();
};

const signUpScreen = () => {
    application.innerHTML = '';
};


startScreen();

