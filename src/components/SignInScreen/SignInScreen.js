import {HeaderComponent} from "../Header/Header.js";
import {TextComponent} from "../TextComponent/Text.js";
import {InputComponent} from "../Input/Input.js";
import {ButtonComponent} from "../Button/Button.js";
import {StartScreen} from "../StartScreen/StartScreen.js";


export const SignInScreen = application => {
    application.innerHTML = '';
    const header = new HeaderComponent(application);
    header.render();
    const form = document.createElement('form');
    application.appendChild(form);
    const Text = new TextComponent({
        tag: "h3",
        text: "Authorization!"
    });
    form.innerHTML += Text.render();
    const EmailInput = new InputComponent({
        id: "email",
        type: "email",
        placeholder: "Email"
    });
    form.innerHTML += EmailInput.render();
    const PassInput = new InputComponent({
        id: "password",
        type: "password",
        placeholder: "Password"
    });
    form.innerHTML += PassInput.render();
    const SubmitButton = new ButtonComponent({
        type: "submit",
        text: "Sign in!"
    });
    form.innerHTML += SubmitButton.render();
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = form.elements['email'].value;
        const password = form.elements['password'].value;

        AjaxModule._fetch('http://93.171.139.196:780/signin').then(rez => {
            if (rez.status === 200) {
                StartScreen();
            }
        });
    })
};