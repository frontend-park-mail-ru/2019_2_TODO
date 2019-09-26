import MainComponent from "../MainComponent/MainComponent.js";

export class ImageComponent extends MainComponent{
    constructor(context) {
        super();
        this.context = context;
        this.template = Handlebars.compile(`      
            <img src="{{source}}" class="{{class}}" alt="">
        `)

    }
}