import { Form } from './Form'
import { ensureElement } from '../../../utils/utils'
import { IEvents } from '../../base/Events'

interface IPayment {
  payment: string
  address: string
}

export class PaymentForm extends Form<IPayment> {
  protected paymentsButtons: HTMLButtonElement[]
  protected orderAdressInput: HTMLInputElement

  constructor(events: IEvents, container: HTMLElement) {
    super(events, container)

    this.paymentsButtons = this.paymentsButtons = Array.from(
      this.container.querySelectorAll<HTMLButtonElement>('.order__buttons .button'),
    )
    this.orderAdressInput = ensureElement<HTMLInputElement>('input[name=address]', this.container)

    this.paymentsButtons.forEach(button =>
      button.addEventListener('click', () => {
        this.events.emit('order:change', { payment: button.name })
      }),
    )

    this.orderAdressInput.addEventListener('input', () => {
      this.events.emit('order:change', { address: this.orderAdressInput.value })
    })
  }

  protected onSubmit() {
    const payment = this.paymentsButtons.find(button => button.classList.contains('button_alt-active'))?.name

    this.events.emit('order:payment', {
      address: this.orderAdressInput.value,
      payment: payment ?? '',
    })
  }

  set payment(value: string) {
    this.paymentsButtons.forEach(button => {
      const isActive = button.name === value
      button.classList.toggle('button_alt-active', isActive)
    })
  }

  set address(value: string) {
    this.orderAdressInput.value = value
  }
}
