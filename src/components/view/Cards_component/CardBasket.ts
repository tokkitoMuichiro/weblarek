import { Card } from './Card'
import { ensureElement } from '../../../utils/utils'

export class CardBasket extends Card {
  protected itemIndexElement: HTMLElement
  protected removeButton: HTMLButtonElement

  constructor(container: HTMLElement, onClick: () => void) {
    super(container)

    this.itemIndexElement = ensureElement<HTMLElement>('.basket__item-index', this.container)
    this.removeButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container)

    this.removeButton.addEventListener('click', onClick)
  }

  set itemIndex(value: string) {
    this.itemIndexElement.textContent = value
  }
}
