import { Component } from '../base/Component'
import { ensureElement } from '../../utils/utils'
import { IEvents } from '../base/Events'

export class ModalContainer extends Component<HTMLElement> {
  private closeButton: HTMLButtonElement
  private contentContainer: HTMLElement

  constructor(
    protected events: IEvents,
    container: HTMLElement,
  ) {
    super(container)

    this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.container)
    this.contentContainer = ensureElement<HTMLElement>('.modal__content', this.container)

    this.closeButton.addEventListener('click', () => {
      this.closeModal()
    })

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        this.closeModal()
      }
    })
  }

  set modalData(data: HTMLElement) {
    this.contentContainer.replaceChildren(data)
  }

  openModal(): void {
    this.container.classList.add('modal_active')
    this.events.emit('modal:open')
  }

  closeModal(): void {
    this.container.classList.remove('modal_active')
    this.events.emit('modal:close')
  }
}
