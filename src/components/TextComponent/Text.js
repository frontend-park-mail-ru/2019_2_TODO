
export class TextComponent {
    constructor(parent = document.body, tag = 'a', data = '', className = '') {
        this._parent = parent;
        this._data = data;
        this._className = className;
        this._tag = tag;
    }

    render() {
        const text = document.createElement(this._tag);
        text.innerText = this._data;
        text.className = this._className
        this._parent.appendChild(text)

        // this._parent.innerHTML = `
        //     <${this._tag} class=" ${this._className}">${this._data}</${this._tag}>
        // `;
    }
}