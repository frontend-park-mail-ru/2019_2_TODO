import MainComponent from "../MainComponent/MainComponent.js";


export class InputComponent extends MainComponent {
    constructor(context) {
        super();
        this.context = context;
        this.template = Handlebars.compile(`
            <input type="{{type}}" placeholder="{{placeholder}}">
        `)
    }
}