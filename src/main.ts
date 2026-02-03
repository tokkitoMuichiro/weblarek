import './scss/styles.scss'
import { apiProducts } from './utils/data'
import { ProductList } from './components/models/ProdactList'
import { ShoppingCart, ShoppingCart } from './components/models/ShoppingCart'
import { Buyer } from './components/models/Buyer'
import { ApiCommunication } from './components/communication/ApiCommunication'
import { Api } from './components/base/Api'
import { API_URL } from './utils/constants'
import { EventEmitter } from './components/base/Events'
import { Basket } from './components/view/Basket'
import { Gellery } from './components/view/Gellery'
import { cloneTemplate } from './utils/utils'
import { HeaderBasket } from './components/view/HeaderBasket'
import { CardBasket } from './components/view/Cards_component/CardBasket'
import { CardCatalog } from './components/view/Cards_component/CardCatalog'
import { ensureElement } from './utils/utils'
import { ModalContainer } from './components/view/ModalContainer'
import { CardPreviev } from './components/view/Cards_component/CardPreviev'
import { PaymentForm } from './components/view/Form_components/PaymentForm'
import { ContactForm } from './components/view/Form_components/ContactsForm'

// реализация presinter

const api = new Api(API_URL)
const apiCommunication = new ApiCommunication(api)

const events = new EventEmitter()

const productList = new ProductList(events)
const buyerModel = new Buyer(events)
const shoppingCartModel = new ShoppingCart(events)

const pageContainer = document.body
const gelleryView = new Gellery(pageContainer)
const headerBasketView = new HeaderBasket(events, ensureElement<HTMLElement>('.header__container'))
const modalContainerView = new ModalContainer(events, ensureElement<HTMLElement>('#modal-container'))

//const cardBasketView = new CardBasket(events, cloneTemplate('#card-basket'))
//const cardCatalogView = new CardCatalog(events, cloneTemplate('#card-catalog'))
//const cardPrevievView = new CardPreviev(events, cloneTemplate('#card-preview'))

const paymentFormView = new PaymentForm(events, cloneTemplate('#order'))
const contactsFormView = new ContactForm(events, cloneTemplate('#contacts'))

try {
  const products = await apiCommunication.getProducts()
  productList.setProducts(products)
  console.log(
    'Инициализированные товары:',
    productList.getProducts().map(item => item.title),
  )
} catch (error) {
  console.log(error)
}

events.on('productList:changed', () => {
  const products = productList.getProducts()
  const cards = products.map(p => {
    const cardView = new CardCatalog(events, cloneTemplate('#card-catalog'))
    return cardView.render(p)
  })

  gelleryView.render({ productCards: cards })
})
