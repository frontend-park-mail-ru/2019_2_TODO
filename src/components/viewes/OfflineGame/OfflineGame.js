import BaseView from "../BaseView/BaseView.js";


export default class OfflineGame extends BaseView{
    constructor(element) {
        super(element);
    }

    render() {
        const canvas = document.createElement('canvas');
        canvas.className = 'canvas';
        canvas.id = 'canvas';
        this.el.appendChild(canvas);
        this.el.className = 'sect';

        const table = new Image();
        table.src = 'http://93.171.139.195:780/assets/table-removebg-preview.png';
        table.onload = () => {
            console.log(table);
        };
        canvas.width = table.naturalWidth;
        canvas.height = table.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(table, 0,0);


    }
}
