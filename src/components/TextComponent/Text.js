import BaseComponent from "../BaseComponent/BaseComponent.js";

export class TextComponent extends BaseComponent {
    constructor(context) {
        super();
        this.context = context;
        this.template = Handlebars.compile(`
            <{{tag}} class="{{class}}">
                {{text}}
            </{{tag}}>
        `)
    }
}