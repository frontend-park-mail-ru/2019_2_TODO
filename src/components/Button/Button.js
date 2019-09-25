import MainComponent from '../MainComponent/MainComponent.js';


export class ButtonComponent extends MainComponent {
    constructor(context) {
        super();
        this.context = context;
        this.template = Handlebars.compile('<button type="{{type}}">{{text}}</button>');
    }

}