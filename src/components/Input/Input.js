import BaseComponent from '../BaseComponent/BaseComponent.js'
import { TextComponent } from '../TextComponent/Text.js'

export class InputComponent extends BaseComponent {
  constructor (context) {
    super()
    this.context = context
    this.template = Handlebars.compile(`
            <input type="{{type}}" id="{{id}}" placeholder="{{placeholder}}">
        `)
  }

  error (err, parent) {
    switch (err) {
      case 'EMAIL_FORMAT':
      {
        const errorText = new TextComponent({
          tag: 'a',
          class: 'error',
          text: 'Not email'
        })
        if (parent.lastChild instanceof HTMLAnchorElement){
          parent.removeChild(parent.lastChild)
        }
        parent.innerHTML += errorText.render()
        break
      }
      case 'PASSWORD_LENGTH':
      {
        const errorText = new TextComponent({
          tag: 'a',
          class: 'error',
          text: 'Password is too short'
        })
        if (parent.lastChild instanceof HTMLAnchorElement){
          parent.removeChild(parent.lastChild)
        }
        parent.innerHTML += errorText.render()
        break
      }
      case 'PASSWORDS_MATCH':
      {
        const errorText = new TextComponent({
          tag: 'a',
          class: 'error',
          text: 'Password are not equal'
        })
        if (parent.lastChild instanceof HTMLAnchorElement){
          parent.removeChild(parent.lastChild)
        }
        parent.innerHTML += errorText.render()
        break
      }
    }
  }
}
