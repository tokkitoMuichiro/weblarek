import { Component } from '../../base/Component'
import { ensureElement } from '../../../utils/utils'
import { categoryMap } from '../../../utils/constants'
import { IProduct } from '../../../types'

type categoryKeys = 'софт-скил' | 'хард-скил' | 'кнопка' | 'дополнительное' | 'другое'

export abstract class Card extends Component<IProduct> {
  protected titleElement: HTMLElement
  protected categoryElement?: HTMLElement
  protected priceElement: HTMLElement
  protected imageElement?: HTMLImageElement

  constructor(container: HTMLElement) {
    super(container)

    this.titleElement = ensureElement<HTMLElement>('.card__title', this.container)
    this.priceElement = ensureElement<HTMLElement>('.card__price', this.container)
    this.categoryElement = this.container.querySelector<HTMLElement>('.card__category') ?? undefined
    this.imageElement = this.container.querySelector<HTMLImageElement>('.card__image') ?? undefined
  }

  set title(value: string) {
    this.titleElement.textContent = value
  }

  set category(value: categoryKeys) {
    if (!this.categoryElement) {
      return
    }
    this.categoryElement.textContent = value
    this.categoryElement.className = `card__category ${categoryMap[value]}`
  }

  set price(value: number | null) {
    this.priceElement.textContent = value === null ? 'Бесценно' : `${value} синапсов`
  }

  set image(value: string) {
    if (this.imageElement) {
      this.setImage(this.imageElement, value, this.titleElement.textContent ?? '')
    }
  }
}
