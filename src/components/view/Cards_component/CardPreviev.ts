import { Card } from './Card'
import { IEvents } from '../../base/Events'
import { ensureElement } from '../../../utils/utils'

export class CardPreviev extends Card {
  protected description: HTMLElement
  protected appendButton: HTMLButtonElement

  constructor(events: IEvents, container: HTMLElement) {
    super(events, container)

    this.description = ensureElement<HTMLElement>('.card__text', this.container)
    this.appendButton = ensureElement<HTMLButtonElement>('.card__button', this.container)

    this.appendButton.addEventListener('click', () => {
      this.events.emit('card:addToBucket')
    })
  }

  set descriptionValue(value: string) {
    this.description.textContent = value
  }
}
