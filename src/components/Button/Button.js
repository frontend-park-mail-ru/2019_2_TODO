import BaseComponent from '../BaseComponent/BaseComponent.js';


export class ButtonComponent extends BaseComponent {
    constructor(context) {
        super();
        this.context = context;
        this.template = Handlebars.compile(`
            <button type="{{type}}" href="{{href}}" data-section="{{section}}">{{text}}</button>
        `);
    }

}