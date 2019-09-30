import BaseComponent from '../BaseComponent/BaseComponent.js'
import { TextComponent } from '../TextComponent/Text'

export class InputComponent extends BaseComponent {
  constructor (context) {
    super()
    this.context = context
    this.template = Handlebars.compile(`
            <input type="{{type}}" id="{{id}}" placeholder="{{placeholder}}">
        `)
  }

  error (err) {
    switch (err) {
      case 'PASSWORD_LENGTH':
      {
        const errorText = new TextComponent({
          tag: 'a',
          class: 'error',
          text: 'Not email'
        })
        this.element.parentElement.innerHTML += errorText.render()
        break
      }
      case 'PASSWORD_LENGTH':
      {
        const errorText = new TextComponent({
          tag: 'a',
          class: 'error',
          text: 'Password is too short'
        })
        this.element.parentElement.innerHTML += errorText.render()
        break
      }
      case 'PASSWORDS_MATCH':
      {
        const errorText = new TextComponent({
          tag: 'a',
          class: 'error',
          text: 'Password are not equal'
        })
        this.element.parentElement.innerHTML += errorText.render()
        break
      }
    }
  }
}
