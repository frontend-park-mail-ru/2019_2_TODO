
import BaseComponent from '../BaseComponent/BaseComponent.js';

export class ButtonPanel extends BaseComponent {
  constructor(context) {
    super(context);
    this.template = Handlebars.compile(`
        <div class="buttonPanel">
            <div class="buttonPanel__row">
                <a class="buttonPanel__button"> offline</a>
                <a class="buttonPanel__button">online</a>
                <a class="buttonPanel__button">profile</a>
            </div>
            <a class="buttonPanel__button_rules">rules</a>
        </div>

    `);
  }
}
