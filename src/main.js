import Button from './components/Button/Button.js';

const button = new Button({a:'class="startButton"',text:'lol'});

const application = document.getElementById('application');
application.innerHTML = button.render();




