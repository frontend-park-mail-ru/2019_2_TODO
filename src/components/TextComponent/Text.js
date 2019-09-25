import MainComponent from "../MainComponent/MainComponent.js";

export class TextComponent extends MainComponent{
    constructor(context) {
        super();
        this.context = context;
        this.template = Handlebars.compile(`
            <{{tag}} class="{{class}}">
                {{text}}
            </{{tag}}>
        `)
    }


        // this._parent.innerHTML = `
        //     <${this._tag} class=" ${this._className}">${this._data}</${this._tag}>
        // `;
}