import BaseComponent from "../BaseComponent/BaseComponent.js";


export class InputComponent extends BaseComponent {
    constructor(context) {
        super();
        this.context = context;
        this.template = Handlebars.compile(`
            <input type="{{type}}" id="{{id}}" placeholder="{{placeholder}}">
        `)
    }
}