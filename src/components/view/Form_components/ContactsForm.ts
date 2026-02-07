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
      this.events.emit('contacts:change', { email: this.emailAdressInput.value })
    })

    this.phoneNumberInput.addEventListener('input', () => {
      this.events.emit('contacts:change', { phone: this.phoneNumberInput.value })
    })
  }

  protected onSubmit() {
    this.events.emit('order:customer', {
      email: this.emailAdressInput.value,
      phone: this.phoneNumberInput.value,
    })
  }

  set email(value: string) {
    this.emailAdressInput.value = value
  }

  set phone(value: string) {
    this.phoneNumberInput.value = value
  }
}
