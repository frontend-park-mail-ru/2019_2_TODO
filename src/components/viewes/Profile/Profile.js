import BaseComponent from "../../BaseComponent/BaseComponent.js";
import BaseView from "../BaseView/BaseView.js";


/** Класс профиля */
export class ProfileComponent extends BaseComponent {
    /**
     * Создать профиль
     * @param {string} context - контекст для профиля
     */
    constructor(context) {
        super();
        this.context = context;
        this.template = Handlebars.compile(`
        <form class="profileForm">
            <a class="button" id="closeButton" href="/">Close</a>
            <img class="avatar" src="{{avatar}}" alt="">
            <a class="profileText">{{nickname}}</a>
            <a class="profileText">{{score}}</a>
            <a class="button", href="/changeProfile">Change</a> 
        </form>
        `);
    }
}


export default class ProfileView extends BaseView{
    constructor(element) {
        super(element);
    }

    render() {
        this.el.innerHTML = '';
        const prof = new ProfileComponent({
            avatar: window.avatar,
            nickname: window.username,
            score: 1000
        })
        this.el.innerHTML = prof.render();
    }
}