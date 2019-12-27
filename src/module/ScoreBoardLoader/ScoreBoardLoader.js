import AjaxModule from '../AjaxModule/ajax';


export default class ScoreBoardLoader {
  constructor() {
    this.leaders = [];
  }
  load() {
    return AjaxModule.fetchGet('https://pokertodo.ru/scoreboard/')
        .then((res)=>{
          return res.text();
        })
        .then((resText)=>{
          this.leaders = JSON.parse(resText).leaders;
        });
  }
}
