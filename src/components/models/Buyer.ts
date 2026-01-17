import { IBuyer, TPayment, ValidationInfo } from '../../types'

export class Buyer {
  private _payment: TPayment | null = null

  private _email: string | null = null

  private _phone: string | null = null

  private _address: string | null = null

  constructor(buyerData?: Partial<IBuyer>) {
    if (buyerData) {
      this.setBuyerInfo(buyerData)
    }
  }

  setBuyerInfo(buyerData: Partial<IBuyer>): void {
    if (buyerData) {
      if (buyerData.payment) {
        this._payment = buyerData.payment
      }
      if (buyerData.email) {
        this._email = buyerData.email
      }
      if (buyerData.phone) {
        this._phone = buyerData.phone
      }
      if (buyerData.address) {
        this._address = buyerData.address
      }
    }
  }

  getBuyerInfo(): Partial<IBuyer> {
    return {
      ...(this._payment && { payment: this._payment }),
      ...(this._email && { email: this._email }),
      ...(this._phone && { phone: this._phone }),
      ...(this._address && { address: this._address }),
    }
  }

  clearBuyerInfo(): void {
    this._payment = null
    this._email = null
    this._phone = null
    this._address = null
  }

  validateBuyerInfo(): ValidationInfo | String {
    const validationInfo: ValidationInfo = {}
    let hasErrors = false

    if (!this._payment) {
      validationInfo.payment = 'Не выбран вид оплаты'
      hasErrors = true
    }

    if (!this._email) {
      validationInfo.email = 'Не заполнен Email'
      hasErrors = true
    }

    if (!this._phone) {
      validationInfo.phone = 'Не заполнен телефон'
      hasErrors = true
    }

    if (!this._address) {
      validationInfo.address = 'Не заполнен адрес'
      hasErrors = true
    }

    return hasErrors ? validationInfo : 'Вся информация заполнена'
  }
}
