import AjaxModule from './ajax';

export default class User {
    constructor(){
        this.isAuth = false;
        this.username = '';
        this.avatar = '';
    }
    checkAuth(){
        AjaxModule.fetchGet()
            .catch(()=>{
                return;
            })
            .then((res)=>{
                return res.text();
            })
            .then((resText)=>{
                this.username = JSON.parse(resText).username;
                this.avatar = JSON.parse(resText).image;
            })
    }
    auth(username, password){
        this.isAuth = AjaxModule.signIn(username, password);
        if (this.isAuth){
            this.username = username;
        }
    }
    signUp(username, password) {
        this.isAuth = AjaxModule.signUp(username, password);
        if (this.isAuth){
            this.username = username;
        }
    }
}