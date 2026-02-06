import { Card } from './Card'
import { IEvents } from '../../base/Events'
import { ensureElement } from '../../../utils/utils'

export class CardPreviev extends Card {
  protected descriptionElement: HTMLElement
  protected appendButton: HTMLButtonElement

  constructor(events: IEvents, container: HTMLElement) {
    super(events, container)

    this.descriptionElement = ensureElement<HTMLElement>('.card__text', this.container)
    this.appendButton = ensureElement<HTMLButtonElement>('.card__button', this.container)

    this.appendButton.addEventListener('click', () => {
      this.events.emit('card:addToBucket', { id: this.container.dataset.id })
    })
  }

  set description(value: string) {
    this.descriptionElement.textContent = value
  }

  set buttonDisabled(value: boolean) {
    this.appendButton.disabled = value
  }

  set buttonText(value: string) {
    this.appendButton.textContent = value
  }
}
