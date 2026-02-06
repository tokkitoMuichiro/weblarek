import { Component } from '../base/Component'
import { ensureElement } from '../../utils/utils'
import { IEvents } from '../base/Events'

export class Basket extends Component<HTMLElement> {
  private basketList: HTMLElement
  private orderButton: HTMLButtonElement
  private orderPrice: HTMLElement

  constructor(
    protected events: IEvents,
    container: HTMLElement,
  ) {
    super(container)

    this.basketList = ensureElement<HTMLElement>('.basket__list', this.container)
    this.orderButton = ensureElement<HTMLButtonElement>('.basket__button', this.container)
    this.orderPrice = ensureElement<HTMLElement>('.basket__price', this.container)

    this.orderButton.addEventListener('click', () => {
      this.events.emit('basket:order')
    })
  }

  set priceValue(value: number) {
    this.orderPrice.textContent = `${value} синапсов`
  }

  set basketListItems(value: HTMLElement[]) {
    this.basketList.replaceChildren(...value)
  }

  set isOrderDisabled(value: boolean) {
    this.orderButton.disabled = value
  }
}
