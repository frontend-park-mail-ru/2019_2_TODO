import BaseView from "../BaseView/BaseView";
import {HeaderComponent} from "../../components/Header/Header";


export default class SupportView extends BaseView{
    constructor(element){
        super(element)
    }
    render() {
        this.el.innerHTML = '';
        const application = this.el;
        const header = new HeaderComponent(application, user.isAuth, user.avatar, user.username);
        header.render();
        const iFrame = document.createElement('iFrame');
        iFrame.className = 'iFrame';
        iFrame.src = 'http://93.171.139.195:781';
        this.el.appendChild(iFrame);
    }
}