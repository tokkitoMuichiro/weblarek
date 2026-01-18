import { IBuyer, TPayment, IValidationInfo } from '../../types'

export class Buyer {
  private payment: TPayment | '' = ''

  private email: string = ''

  private phone: string = ''

  private address: string = ''

  constructor() {}

  setBuyerInfo(buyerData: Partial<IBuyer>): void {
    if (buyerData) {
      if (buyerData.payment) {
        this.payment = buyerData.payment
      }
      if (buyerData.email) {
        this.email = buyerData.email
      }
      if (buyerData.phone) {
        this.phone = buyerData.phone
      }
      if (buyerData.address) {
        this.address = buyerData.address
      }
    }
  }

  getBuyerInfo(): IBuyer {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address,
    }
  }

  clearBuyerInfo(): void {
    this.payment = ''
    this.email = ''
    this.phone = ''
    this.address = ''
  }

  validateBuyerInfo(): IValidationInfo | String {
    const validationInfo: IValidationInfo = {}
    let hasErrors = false

    if (!this.payment) {
      validationInfo.payment = 'Не выбран вид оплаты'
      hasErrors = true
    }

    if (!this.email) {
      validationInfo.email = 'Не заполнен Email'
      hasErrors = true
    }

    if (!this.phone) {
      validationInfo.phone = 'Не заполнен телефон'
      hasErrors = true
    }

    if (!this.address) {
      validationInfo.address = 'Не заполнен адрес'
      hasErrors = true
    }

    return hasErrors ? validationInfo : 'Вся информация заполнена'
  }
}
