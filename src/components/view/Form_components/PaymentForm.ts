import { Form } from './Form'
import { ensureElement } from '../../../utils/utils'
import { IEvents } from '../../base/Events'

interface IPayment {
  payment: string
  adress: string
}

export class PaymentForm extends Form<IPayment> {
  protected paymentsButtons: HTMLButtonElement[]
  protected orderAdressInput: HTMLInputElement

  constructor(events: IEvents, container: HTMLElement) {
    super(events, container)

    this.paymentsButtons = Array.from(this.container.querySelectorAll<HTMLButtonElement>('.payment__button'))
    this.orderAdressInput = ensureElement<HTMLInputElement>('input[name=address]', this.container)

    this.paymentsButtons.forEach(button =>
      button.addEventListener('click', () => {
        this.paymentsButtons.forEach(button => button.classList.remove('active'))
        button.classList.add('active')
      }),
    )
  }

  protected onSubmit() {
    const payment = this.paymentsButtons.find(button => button.classList.contains('active'))?.name

    const errors: string[] = []

    if (!this.orderAdressInput.value) errors.push('Введите адрес')
    if (!payment) errors.push('Выберите способ оплаты')

    this.setErrors(errors)

    if (errors.length === 0) {
      this.events.emit('order:payment', {
        address: this.orderAdressInput.value,
        payment,
      })
    }
  }
}
