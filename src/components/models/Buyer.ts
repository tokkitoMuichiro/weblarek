import { IBuyer, TPayment, IValidationInfo } from '../../types'
import { IEvents } from '../base/Events'

export class Buyer {
  private payment: TPayment | '' = ''

  private email: string = ''

  private phone: string = ''

  private address: string = ''

  constructor(protected events: IEvents) {}

  setBuyerInfo(buyerData: Partial<IBuyer>): void {
    if (buyerData) {
      if (buyerData.payment !== undefined) {
        this.payment = buyerData.payment
      }
      if (buyerData.email !== undefined) {
        this.email = buyerData.email
      }
      if (buyerData.phone !== undefined) {
        this.phone = buyerData.phone
      }
      if (buyerData.address !== undefined) {
        this.address = buyerData.address
      }
    }
    this.events.emit('buyerInfo:changed')
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
    this.events.emit('buyerInfo:changed')
  }

  validateBuyerInfo(): IValidationInfo {
    const validationInfo: IValidationInfo = {}

    if (!this.payment) {
      validationInfo.payment = 'Не выбран вид оплаты'
    }

    if (!this.email) {
      validationInfo.email = 'Не заполнен Email'
    }

    if (!this.phone) {
      validationInfo.phone = 'Не заполнен телефон'
    }

    if (!this.address) {
      validationInfo.address = 'Не заполнен адрес'
    }

    return validationInfo
  }
}
