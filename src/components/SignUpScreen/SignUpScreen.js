import { InputComponent } from '../Input/Input.js'
import { HeaderComponent } from '../Header/Header.js'
import { ButtonComponent } from '../Button/Button.js'
import { TextComponent } from '../TextComponent/Text.js'
import { StartScreen } from '../StartScreen/StartScreen.js'
import { SignInScreen } from '../SignInScreen/SignInScreen.js'
import AjaxModule from '../../module/ajax.js'

/*
* @param {HTMLElement} application - контейнер HTML,
* в котором отрисовывается верстка
 */
export const SignUpScreen = (application) => {
  application.innerHTML = ''
  const header = new HeaderComponent(application)
  header.render()
  const form = document.createElement('form')
  application.appendChild(form)
  const Text = new TextComponent({
    tag: 'h3',
    text: 'Registration!'
  })
  form.innerHTML += Text.render()
  const EmailInput = new InputComponent({
    type: 'email',
    id: 'email',
    placeholder: 'Email'
  })
  form.innerHTML += EmailInput.render()
  const PassInput = new InputComponent({
    type: 'password',
    id: 'password',
    placeholder: 'Password'
  })
  form.innerHTML += PassInput.render()
  const PassRepeat = new InputComponent({
    type: 'password',
    id: 'passwordRepeat',
    placeholder: 'Repeat your password'
  })
  form.innerHTML += PassRepeat.render()
  const avatarInput = new InputComponent({
    type: 'file',
    id: 'avatarInput',
    placeholder: 'Upload avatar'
  })
  // form.innerHTML += avatarInput.render();

  const SubmitButton = new ButtonComponent({
    href: '/',
    type: 'submit',
    text: 'Sign up!'
  })
  form.innerHTML += SubmitButton.render()

  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const email = form.elements.email.value
    const password = form.elements.password.value
    const passwordRepeat = form.elements.passwordRepeat.value
    if (password !== passwordRepeat) {
      alert("Passwords are'nt equal")
      return
    }
    if (password.length < 5) {
      alert('Password is too short')
    }
    if (!email) {
      alert('No email')
      return
    }

    AjaxModule._fetchPost(
      'http://93.171.139.196:780/signup/',
      JSON.stringify({
        username: email,
        password: password
      })
    )
      .then(rez => {
        if (rez.status === 200) {
          console.log(rez)
          StartScreen(application)
        }
      })
  })
}
