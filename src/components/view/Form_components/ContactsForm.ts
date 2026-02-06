import { Form } from './Form'
import { ensureElement } from '../../../utils/utils'
import { IEvents } from '../../base/Events'

interface IContacts {
  email: string
  phone: string
}

export class ContactForm extends Form<IContacts> {
  protected emailAdressInput: HTMLInputElement
  protected phoneNumberInput: HTMLInputElement

  constructor(events: IEvents, container: HTMLElement) {
    super(events, container)

    this.emailAdressInput = ensureElement<HTMLInputElement>('input[name=email]', this.container)
    this.phoneNumberInput = ensureElement<HTMLInputElement>('input[name=phone]', this.container)

    this.emailAdressInput.addEventListener('input', () => {
      this.emitChange()
    })

    this.phoneNumberInput.addEventListener('input', () => {
      this.emitChange()
    })
  }

  protected onSubmit() {
    const errors: string[] = []

    if (!this.emailAdressInput.value) errors.push('Введите email')
    if (!this.phoneNumberInput.value) errors.push('Введите телефон')

    this.setErrors(errors)

    if (errors.length === 0) {
      this.events.emit('order:customer', {
        email: this.emailAdressInput.value,
        phone: this.phoneNumberInput.value,
      })
    }
  }

  private emitChange() {
    const errors: string[] = []

    if (!this.emailAdressInput.value) errors.push('Введите email')
    if (!this.phoneNumberInput.value) errors.push('Введите телефон')

    this.setErrors(errors)

    this.events.emit('contacts:change', {
      email: this.emailAdressInput.value,
      phone: this.phoneNumberInput.value,
    })
  }
}
