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
        const text = new TextComponent({tag: "h1", class: "", text: "Online Poker Game"});
        const chip = new ImageComponent({source: "./assets/gold_fishka.jpg", class: "chip"});
        const signInButton = new ButtonComponent({button: 'class="logButton"', text:'Sign in'});
        head.innerHTML += signInButton.render();
        const signUpButton = new ButtonComponent({button: 'class="logButton"', text:'Sign up'});
        head.innerHTML += signUpButton.render();
        head.innerHTML += chip.render();
        head.innerHTML += text.render();
    }
}

//export default 1