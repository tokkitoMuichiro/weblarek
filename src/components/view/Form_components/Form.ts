import { Component } from '../../base/Component'
import { ensureElement } from '../../../utils/utils'
import { IEvents } from '../../base/Events'

export abstract class Form<T> extends Component<T> {
  protected submitButton: HTMLButtonElement
  protected formErrors: HTMLElement

  constructor(
    protected events: IEvents,
    container: HTMLElement,
  ) {
    super(container)

    this.submitButton = ensureElement<HTMLButtonElement>('button[type=submit]', this.container)
    this.formErrors = ensureElement<HTMLElement>('.form__errors', this.container)

    this.container.addEventListener('submit', event => {
      event.preventDefault()
      this.onSubmit()
    })
  }
  public setErrors(errors: string) {
    this.formErrors.textContent = errors
  }

  public setSubmitDisabled(disabled: boolean) {
    this.submitButton.disabled = disabled
  }

  protected abstract onSubmit(): void
}
