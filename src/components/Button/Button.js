export const RENDER_RULES = {
    DOM: 'dom',
    STRING: 'string',
};

export class ButtonComponent {
    constructor(parent = document.body, data = "") {
        this._parent = parent;
        this._data = data;
    }

    get data () {
        return this._data;
    }

    set data (dataToSet) {
        this._data = {...dataToSet};
    }

    render(method = RENDER_RULES.DOM) {
        switch(method) {
            case RENDER_RULES.STRING:
                this._renderString();
                break;
            case RENDER_RULES.DOM:
            default:
                this._renderDOM()
        }
    }

    _renderDOM() {
        const button = document.createElement('button');
        button.innerText = this._data;
        button.className = 'startButton'
        this._parent.appendChild(button);
    }

    _renderString() {
        this._parent.innerHTML = `
			<button class="startButton" >${this._data}</button>
			   
			
		`;
    }
}