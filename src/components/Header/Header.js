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
        const chip = new ImageComponent(head, './components/Image/gold_fishka.jpg', 'chip');
        const signInButton = new ButtonComponent({button: 'class="logButton"', text:'Sign in'});
        head.innerHTML += signInButton.render();
        const signUpButton = new ButtonComponent({button: 'class="logButton"', text:'Sign up'});
        head.innerHTML += signUpButton.render();
        chip.render();
        text.render();

    }
}

//export default 1