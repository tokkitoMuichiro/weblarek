import { Component } from '../../base/Component'
import { ensureElement } from '../../../utils/utils'
import { categoryMap } from '../../../utils/constants'
import { IEvents } from '../../base/Events'

type categoryKeys = 'софт-скил' | 'хард-скил' | 'кнопка' | 'дополнительное' | 'другое'

interface ICard {
  id: string
  description: string
  image: string
  title: string
  category: string
  price: number | null
}

export abstract class Card extends Component<ICard> {
  protected title: HTMLElement
  protected category: HTMLElement
  protected price: HTMLElement
  protected image?: HTMLImageElement

  constructor(
    protected events: IEvents,
    container: HTMLElement,
  ) {
    super(container)

    this.title = ensureElement<HTMLElement>('.card__title', this.container)
    this.category = ensureElement<HTMLElement>('.card__category', this.container)
    this.price = ensureElement<HTMLElement>('.card__price', this.container)
    this.image = ensureElement<HTMLImageElement>('.card__image', this.container)
  }

  set titleValue(value: string) {
    this.title.textContent = value
  }

  set categoryValue(value: categoryKeys) {
    this.category.textContent = value
    this.category.className = `card__category ${categoryMap[value]}`
  }

  set priceValue(value: number | null) {
    this.price.textContent = value === null ? 'Бесценно' : `${value} синапсов`
  }

  set imageValue(value: string) {
    if (this.image) {
      this.setImage(this.image, value, this.title.textContent ?? '')
    }
  }
}
