import { Component } from "../base/Component"
import { IEvents } from "../base/Events"
import { ensureElement } from "../../utils/utils"


interface IHeader {
  counter: number
}

export class HeaderBasket extends Component<IHeader>{
  private counterElement: HTMLElement;
  private buttonElement: HTMLButtonElement;

  constructor(protected event: IEvents, container: HTMLElement){
    super(container)

    this.counterElement = ensureElement<HTMLElement>(".header__basket-counter", this.container)
    this.buttonElement = ensureElement<HTMLButtonElement>(".header__basket", this.container)

    this.buttonElement.addEventListener('click', ()=>{
      this.event.emit("basket.open")
    })
  }

  set counter(value: number){
    this.counterElement.textContent = String(value)
  }
}
