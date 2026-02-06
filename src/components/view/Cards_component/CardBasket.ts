import { Card } from './Card'
import { IEvents } from '../../base/Events'
import { ensureElement } from '../../../utils/utils'

export class CardBasket extends Card {
  protected itemIndexElement: HTMLElement
  protected removeButton: HTMLButtonElement

  constructor(events: IEvents, container: HTMLElement) {
    super(events, container)

    this.itemIndexElement = ensureElement<HTMLElement>('.basket__item-index', this.container)
    this.removeButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container)

    this.removeButton.addEventListener('click', () => {
      this.events.emit('card:remove', { id: this.container.dataset.id })
    })
  }

  set itemIndex(value: string) {
    this.itemIndexElement.textContent = value
  }
}
