import {HeaderComponent} from "./components/Header/Header.js";
import {DeckFanComponent} from "./components/DeckFan/DeckFan.js";
import {ButtonComponent} from "./components/Button/Button.js";

const application = document.getElementById('application');

const buttons = {
    'Offline': 'startButton',
    'Online': 'startButton',
    'Rules': 'startButton',
    'About': 'startButton'
};

function startScreen() {
    application.innerHTML = '';
    const header = new HeaderComponent(application, false);
    header.render();
    const deck = new DeckFanComponent(application);
    deck.render();
    const section = document.createElement('section');
    application.appendChild(section);
    Object.keys(buttons).forEach(key =>{
        const button = new ButtonComponent(section, key, buttons[key]);
        button.render();
    })

}

startScreen();

