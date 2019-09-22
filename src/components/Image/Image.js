
export class ImageComponent {
    constructor(parent = document.body, src = '', className = '') {
        this._parent = parent;
        this._src = src;
        this._className = className;
    }

    render() {
        const image = document.createElement('img');
        image.src = this._src;
        image.className = this._className;
        this._parent.appendChild(image);
    }
}