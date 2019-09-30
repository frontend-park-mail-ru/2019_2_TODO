import { ButtonComponent } from '../Button/Button.js'
import { TextComponent } from '../TextComponent/Text.js'
import { ImageComponent } from '../Image/Image.js'
import { StartScreen } from '../StartScreen/StartScreen.js'
import { SignUpScreen } from '../SignUpScreen/SignUpScreen.js'
import { SignInScreen } from '../SignInScreen/SignInScreen.js'
import { RenderProfile } from '../Profile/Profile.js'

const application = document.getElementById('application')

const evtListener = evt => {
  const functions = {
    start: StartScreen,
    signUp: SignUpScreen,
    signIn: SignInScreen,
    profile: RenderProfile
    // about: null,
  }
  const { target } = evt
  if ((target instanceof HTMLButtonElement) || (target instanceof HTMLImageElement)) {
    evt.preventDefault()
    functions[target.dataset.section](application)
  }
}

export class HeaderComponent {
  constructor (parent = document.body, authorized = false) {
    this._parent = parent
    this._authorized = authorized
  }

  render (username = null) {
    const head = document.createElement('header')
    head.id = 'header'
    this._parent.appendChild(head)
    const text = new TextComponent({
      tag: 'h1',
      class: '',
      text: 'Online Poker Game'
    })
    const chip = new ImageComponent({
      source: './assets/gold_fishka.jpg',
      class: 'chip',
      section: 'start'
    })
    const signInButton = new ButtonComponent({
      href: '/SignIn',
      text: 'Sign in',
      section: 'signIn'
    })
    head.innerHTML += signInButton.render()
    const signUpButton = new ButtonComponent({
      href: '/SignUp',
      text: 'Sign up',
      section: 'signUp'
    })
    head.innerHTML += signUpButton.render()

    if (this._authorized) {
      // const avatar = new ImageComponent({
      //     src: "",
      //     class: "avatar"
      // });
      const profileButton = new ButtonComponent({
        text: username.username,
        section: 'profile'
      })
      // head.innerHTML += avatar.render();
      head.innerHTML += profileButton.render()
    }
    head.innerHTML += chip.render()
    head.innerHTML += text.render()

    head.addEventListener('click', evtListener)
  }
}

// export default 1
