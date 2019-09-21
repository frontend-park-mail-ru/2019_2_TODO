import {
    ButtonComponent,
    RENDER_RULES,
} from './components/Button/Button.js';


const application = document.getElementById('application');
application.innerHTML = ``;
const button = new ButtonComponent(application, "Кнопка");
button.render();


