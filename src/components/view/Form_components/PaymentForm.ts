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

    this.paymentsButtons = this.paymentsButtons = Array.from(
      this.container.querySelectorAll<HTMLButtonElement>('.order__buttons .button'),
    )
    this.orderAdressInput = ensureElement<HTMLInputElement>('input[name=address]', this.container)

    this.paymentsButtons.forEach(button =>
      button.addEventListener('click', () => {
        this.paymentsButtons.forEach(button => button.classList.remove('button_alt-active'))
        button.classList.add('button_alt-active')
        this.emitChange()
      }),
    )

    this.orderAdressInput.addEventListener('input', () => {
      this.emitChange()
    })
  }

  protected onSubmit() {
    const payment = this.paymentsButtons.find(button => button.classList.contains('button_alt-active'))?.name

    const errors: string[] = []

    if (!this.orderAdressInput.value) errors.push('Необходимо указать адресс')
    if (!payment) errors.push('Выберите способ оплаты')

    this.setErrors(errors)

    if (errors.length === 0) {
      this.events.emit('order:payment', {
        address: this.orderAdressInput.value,
        payment,
      })
    }
  }
  private emitChange() {
    const payment = this.paymentsButtons.find(button => button.classList.contains('button_alt-active'))?.name
    const errors: string[] = []

    if (!this.orderAdressInput.value) errors.push('Введите адрес')
    if (!payment) errors.push('Выберите способ оплаты')

    this.setErrors(errors)

    this.events.emit('order:change', {
      address: this.orderAdressInput.value,
      payment,
    })
  }

  protected setErrors(errors: string[]) {
    this.formErrors.textContent = errors.join(', ')
    this.submitButton.disabled = errors.length > 0
  }
}
