import { Card } from './Card'

import { ensureElement } from '../../../utils/utils'

export class CardPreviev extends Card {
  protected descriptionElement: HTMLElement
  protected appendButton: HTMLButtonElement

  constructor(container: HTMLElement, onClick: () => void) {
    super(container)

    this.descriptionElement = ensureElement<HTMLElement>('.card__text', this.container)
    this.appendButton = ensureElement<HTMLButtonElement>('.card__button', this.container)

    this.appendButton.addEventListener('click', onClick)
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
