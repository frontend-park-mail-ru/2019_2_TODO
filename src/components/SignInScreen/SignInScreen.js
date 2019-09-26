import {HeaderComponent} from "../Header/Header.js";
import {TextComponent} from "../TextComponent/Text.js";
import {InputComponent} from "../Input/Input.js";
import {ButtonComponent} from "../Button/Button.js";


export const SignInScreen = application => {
    const header = new HeaderComponent(application);
    header.render();
    const form = document.createElement('form');
    application.appendChild(form);
    const Text = new TextComponent({tag: "h3", text: "Authorization!"});
    form.innerHTML += Text.render();
    const EmailInput = new InputComponent({type: "email", placeholder: "Email"});
    form.innerHTML += EmailInput.render();
    const PassInput = new InputComponent({type: "password", placeholder: "Password"});
    form.innerHTML += PassInput.render();
    const SubmitButton = new ButtonComponent({type: "submit", text: "Sign in!"});
    form.innerHTML += SubmitButton.render();
};