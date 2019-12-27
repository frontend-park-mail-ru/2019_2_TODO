import BaseComponent from "../BaseComponent/BaseComponent";
import template from './ScoreSpan.hbs';

export default class ScoreSpan extends BaseComponent {
  constructor(element) {
    super(element)
    this.template = template;
  }
}
