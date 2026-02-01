import { Card } from './Card'
import { IEvents } from '../../base/Events'

export class CardCatalog extends Card {
  constructor(events: IEvents, container: HTMLElement) {
    super(events, container)

    this.container.addEventListener('click', () => {
      this.events.emit('card:select')
    })
  }
}
