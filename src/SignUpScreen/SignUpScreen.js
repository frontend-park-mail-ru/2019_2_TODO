import {InputComponent} from "../components/Input/Input.js";
import {HeaderComponent} from "../components/Header/Header.js";
import {ButtonComponent} from "../components/Button/Button.js";


export const SignUpScreen = (application) => {
    const header = new HeaderComponent(application);
    header.render();
    const form = document.createElement('form');
    application.appendChild(form);
    form.innerHTML = '';
    const EmailInput = new InputComponent({type: "email", placeholder: "Email"});
    form.innerHTML += EmailInput.render();
    const PassInput = new InputComponent({type: "password", placeholder: "Password"});
    form.innerHTML += PassInput.render();
    const PassRepeat = new InputComponent({type: "password", placeholder: "Repeat your assword"});
    form.innerHTML += PassRepeat.render();
    const SubmitButton = new ButtonComponent({text: "Submit"});
    form.innerHTML += SubmitButton.render();
};