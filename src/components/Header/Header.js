import {ButtonComponent} from "../Button/Button.js";
import {TextComponent} from "../TextComponent/Text.js";
import {ImageComponent} from "../Image/Image.js";


export class HeaderComponent {
    constructor(parent = document.body, authorized = false) {
        this._parent = parent;
        this._authorized = authorized;
    }

    render() {
        const head = document.createElement('header');
        this._parent.appendChild(head);
        const text = new TextComponent(head,'h1', 'Online Poker game', 'center');
        const logButton = new ButtonComponent(head, 'Sign in', 'logButton');
        const signButton = new ButtonComponent(head, 'Sign up', 'signButton')
        const chip = new ImageComponent(head, './components/Image/gold_fishka.jpg', 'chip');
        chip.render()
        text.render();
        logButton.render();
        signButton.render();

    }
}

//export default 1