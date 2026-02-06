import { ApiCommunication } from '../communication/ApiCommunication'
import { IEvents } from '../base/Events'
import { ProductList } from '../models/ProdactList'
import { ShoppingCart } from '../models/ShoppingCart'
import { Buyer } from '../models/Buyer'
import { Gellery } from '../view/Gellery'
import { HeaderBasket } from '../view/HeaderBasket'
import { ModalContainer } from '../view/ModalContainer'
import { Basket } from '../view/Basket'
import { PaymentForm } from '../view/Form_components/PaymentForm'
import { ContactForm } from '../view/Form_components/ContactsForm'
import { CardCatalog } from '../view/Cards_component/CardCatalog'
import { CardPreviev } from '../view/Cards_component/CardPreviev'
import { CardBasket } from '../view/Cards_component/CardBasket'
import { cloneTemplate } from '../../utils/utils'
import { CDN_URL } from '../../utils/constants'
import { IBuyer } from '../../types'

interface PresenterViews {
  gelleryView: Gellery
  headerBasketView: HeaderBasket
  modalContainerView: ModalContainer
  basketView: Basket
  paymentFormView: PaymentForm
  contactsFormView: ContactForm
  successTemplate: HTMLTemplateElement
}

interface PresenterModels {
  productList: ProductList
  shoppingCart: ShoppingCart
  buyer: Buyer
}

export class Presenter {
  constructor(
    private apiCommunication: ApiCommunication,
    private events: IEvents,
    private models: PresenterModels,
    private views: PresenterViews,
  ) {
    this.registerEvents()
  }

  async init() {
    try {
      const products = await this.apiCommunication.getProducts()
      this.models.productList.setProducts(products)
    } catch (error) {
      console.error(error)
    }
  }

  private registerEvents() {
    this.events.on('productList:changed', () => {
      this.renderCatalog()
    })

    this.events.on('product:selected', () => {
      this.renderPreview()
    })

    this.events.on('cart:changed', () => {
      this.renderBasketState()
    })

    this.events.on('buyerInfo:changed', () => {
      // Buyer info updates can be used for debugging or future UI sync
    })

    this.events.on<{ id?: string }>('card:select', data => {
      if (!data?.id) {
        return
      }
      const product = this.models.productList.getProductById(data.id)
      if (product) {
        this.models.productList.setSelectedProduct(product)
      }
    })

    this.events.on<{ id?: string }>('card:addToBucket', data => {
      if (!data?.id) {
        return
      }
      const product = this.models.productList.getProductById(data.id)
      if (!product) {
        return
      }
      if (this.models.shoppingCart.hasProductById(product.id)) {
        this.models.shoppingCart.removeProduct(product.id)
      } else {
        this.models.shoppingCart.addProduct(product)
      }
      if (this.models.productList.getSelectedProduct()?.id === product.id) {
        this.renderPreview()
      }
    })

    this.events.on<{ id?: string }>('card:remove', data => {
      if (!data?.id) {
        return
      }
      this.models.shoppingCart.removeProduct(data.id)
    })

    const openBasket = () => {
      this.renderBasketState()
      this.views.modalContainerView.modalData = this.views.basketView.render()
      this.views.modalContainerView.openModal()
    }

    this.events.on('basket.open', openBasket)
    this.events.on('basket:open', openBasket)

    const openPayment = () => {
      this.views.modalContainerView.modalData = this.views.paymentFormView.render()
      this.views.modalContainerView.openModal()
    }

    this.events.on('basket: order', openPayment)
    this.events.on('basket:order', openPayment)

    this.events.on<Partial<IBuyer>>('order:change', data => {
      this.models.buyer.setBuyerInfo({
        address: data.address,
        payment: data.payment,
      })
    })

    this.events.on<Partial<IBuyer>>('contacts:change', data => {
      this.models.buyer.setBuyerInfo({
        email: data.email,
        phone: data.phone,
      })
    })

    this.events.on<Partial<IBuyer>>('order:payment', data => {
      this.models.buyer.setBuyerInfo({
        address: data.address,
        payment: data.payment,
      })
      this.views.modalContainerView.modalData = this.views.contactsFormView.render()
      this.views.modalContainerView.openModal()
    })

    this.events.on<Partial<IBuyer>>('order:customer', async data => {
      this.models.buyer.setBuyerInfo({
        email: data.email,
        phone: data.phone,
      })

      const buyerInfo = this.models.buyer.getBuyerInfo()
      const products = this.models.shoppingCart.getProducts()

      if (!products.length) {
        return
      }

      try {
        const orderResponse = await this.apiCommunication.createOrder({
          ...buyerInfo,
          total: this.models.shoppingCart.getProductsPrise(),
          items: products.map(product => product.id),
        })

        this.renderSuccess(orderResponse.total)
        this.models.shoppingCart.removeShoppingCart()
        this.models.buyer.clearBuyerInfo()
      } catch (error) {
        console.error(error)
      }
    })
  }

  private renderCatalog() {
    const products = this.models.productList.getProducts()
    const cards = products.map(product => {
      const cardView = new CardCatalog(this.events, cloneTemplate('#card-catalog'))
      return cardView.render({
        ...product,
        image: `${CDN_URL}${product.image}`,
      })
    })

    this.views.gelleryView.render({ productList: cards })
  }

  private renderPreview() {
    const product = this.models.productList.getSelectedProduct()
    if (!product) {
      return
    }

    const cardView = new CardPreviev(this.events, cloneTemplate('#card-preview'))
    const card = cardView.render({
      ...product,
      image: `${CDN_URL}${product.image}`,
    })

    if (product.price === null) {
      cardView.buttonDisabled = true
      cardView.buttonText = 'Недоступно'
    } else if (this.models.shoppingCart.hasProductById(product.id)) {
      cardView.buttonDisabled = false
      cardView.buttonText = 'Удалить из корзины'
    } else {
      cardView.buttonDisabled = false
      cardView.buttonText = 'В корзину'
    }

    this.views.modalContainerView.modalData = card
    this.views.modalContainerView.openModal()
  }

  private renderBasketState() {
    const products = this.models.shoppingCart.getProducts()
    const totalPrice = this.models.shoppingCart.getProductsPrise()

    const items = products.map((product, index) => {
      const cardView = new CardBasket(this.events, cloneTemplate('#card-basket'))
      const card = cardView.render(product)
      cardView.itemIndex = String(index + 1)
      return card
    })

    this.views.headerBasketView.counter = products.length
    this.views.basketView.basketListItems = items
    this.views.basketView.priceValue = totalPrice
    this.views.basketView.isOrderDisabled = products.length === 0
  }

  private renderSuccess(total: number) {
    const success = cloneTemplate<HTMLDivElement>(this.views.successTemplate)
    const description = success.querySelector<HTMLElement>('.order-success__description')
    const button = success.querySelector<HTMLButtonElement>('.order-success__close')

    if (description) {
      description.textContent = `Списано ${total} синапсов`
    }

    if (button) {
      button.addEventListener('click', () => {
        this.views.modalContainerView.closeModal()
      })
    }

    this.views.modalContainerView.modalData = success
    this.views.modalContainerView.openModal()
  }
}
