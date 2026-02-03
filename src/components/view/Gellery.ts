import { Component } from '../base/Component'
import { ensureElement } from '../../utils/utils'

interface IGellery {
  productCards: HTMLElement[]
}

export class Gellery extends Component<IGellery> {
  private gelleryContainer: HTMLElement

  constructor(container: HTMLElement) {
    super(container)

    this.gelleryContainer = ensureElement<HTMLElement>('.gallery')
  }

  set productList(productCards: HTMLElement[]) {
    this.gelleryContainer.replaceChildren(...productCards)
  }
}
