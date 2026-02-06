import './scss/styles.scss'
import { Api } from './components/base/Api'
import { EventEmitter } from './components/base/Events'
import { ApiCommunication } from './components/communication/ApiCommunication'
import { Buyer } from './components/models/Buyer'
import { ProductList } from './components/models/ProdactList'
import { ShoppingCart } from './components/models/ShoppingCart'
import { Presenter } from './components/presenter/Presenter'
import { Basket } from './components/view/Basket'
import { Gellery } from './components/view/Gellery'
import { HeaderBasket } from './components/view/HeaderBasket'
import { ModalContainer } from './components/view/ModalContainer'
import { ContactForm } from './components/view/Form_components/ContactsForm'
import { PaymentForm } from './components/view/Form_components/PaymentForm'
import { API_URL } from './utils/constants'
import { cloneTemplate, ensureElement } from './utils/utils'

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

const basketView = new Basket(events, cloneTemplate('#basket'))
const paymentFormView = new PaymentForm(events, cloneTemplate('#order'))
const contactsFormView = new ContactForm(events, cloneTemplate('#contacts'))

const successTemplate = ensureElement<HTMLTemplateElement>('#success')

const presenter = new Presenter(
  apiCommunication,
  events,
  {
    productList,
    shoppingCart: shoppingCartModel,
    buyer: buyerModel,
  },
  {
    gelleryView,
    headerBasketView,
    modalContainerView,
    basketView,
    paymentFormView,
    contactsFormView,
    successTemplate,
  },
)

presenter.init()
