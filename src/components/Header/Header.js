import {ButtonComponent} from "../Button/Button.js";
import {TextComponent} from "../TextComponent/Text.js";
import {ImageComponent} from "../Image/Image.js";
import {startScreen} from "../StartScreen/StartScreen.js";
import {SignUpScreen} from "../SignUpScreen/SignUpScreen.js";
import {SignInScreen} from "../SignInScreen/SignInScreen.js";
import {RenderProfile} from "../Profile/Profile.js";





export class HeaderComponent {
    constructor(parent = document.body, authorized = false) {
        this._parent = parent;
        this._authorized = authorized;
    }

    render() {
        const head = document.createElement('header');

        this._parent.appendChild(head);
        const text = new TextComponent({
            tag: "h1",
            class: "",
            text: "Online Poker Game"
        });
        const chip = new ImageComponent({
            source: "./assets/gold_fishka.jpg",
            class: "chip",
            section: "start"
        });
        const signInButton = new ButtonComponent({
            href: '/SignIn',
            text:'Sign in',
            section: "signIn"
        });
        head.innerHTML += signInButton.render();
        const signUpButton = new ButtonComponent({
            href: '/SignUp',
            text:'Sign up',
            section: "signUp"
        });
        const profileButton = new ButtonComponent({
            text: 'Profile',
            section: 'profile'
        })
        head.innerHTML += signUpButton.render();
        head.innerHTML += profileButton.render();
        head.innerHTML += chip.render();
        head.innerHTML += text.render();


        const functions = {
            start: startScreen,
            signUp: SignUpScreen,
            signIn: SignInScreen,
            profile: RenderProfile
            //profile: createProfile,
            //about: null,
        };
        head.addEventListener('click', evt => {
            const {target} = evt;
            if ((target instanceof HTMLButtonElement) || (target instanceof HTMLImageElement)) {
                evt.preventDefault();
                functions[target.dataset.section](application);
            }
        });

    }
}

//export default 1