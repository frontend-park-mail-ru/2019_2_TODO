import {ImageComponent} from "../Image/Image.js";
import {TextComponent} from "../TextComponent/Text.js";
import {ButtonComponent} from "../Button/Button.js";


export class InfoBar {
    constructor(parent, username, avatar) {
        this._parent = parent;
        this._username = username;
        this._avatar = avatar;
    }
    render(){
        const infoBar = document.createElement('div');
        infoBar.className = 'infoBar';
        const avatar = new ImageComponent({
            class: 'avatar',
            src: this._avatar
        });
        infoBar.innerHTML += avatar.render();
        const username = new TextComponent({
            tag: 'a',
            class: 'username',
            text: this._username,
        });
        infoBar.innerHTML += username.render();
        const logOutButton = new ButtonComponent({
            text: 'Log out',
            class: 'logOutButton',
            type: 'submit',
        });
        this._parent.appendChild(infoBar);
    }
}