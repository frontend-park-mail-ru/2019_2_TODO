import BaseComponent from '../BaseComponent/BaseComponent.js'

export class ImageComponent extends BaseComponent {
  constructor (context) {
    super()
    this.context = context
    this.template = Handlebars.compile(`      
            <img src="{{source}}" data-section="{{section}}" class="{{class}}" alt=""/>
        `)
  }
}
