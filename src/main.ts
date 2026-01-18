import './scss/styles.scss'
import { apiProducts } from './utils/data'
import { ProductList } from './components/models/ProdactList'
import { ShoppingCart } from './components/models/ShoppingCart'
import { Buyer } from './components/models/Buyer'
import { ApiCommunication } from './components/communication/ApiCommunication'
import { Api } from './components/base/Api'
import { API_URL } from './utils/constants'

function testModels(): void {
  console.log('=== Тестирование моделей данных ===\n')

  // 1. Тестирование ProductList
  console.log('1. Тестирование ProductList')
  const productList = new ProductList()
  productList.setProducts(apiProducts.items)

  console.log('Массив товаров из каталога:', productList.getProducts())

  // Поиск товара по ID
  const sampleProductId = apiProducts.items[0].id
  const foundProduct = productList.getProductById(sampleProductId)
  console.log(`Найден товар с ID "${sampleProductId}":`, foundProduct?.title)

  // Сохранение выбранного товара
  if (foundProduct) {
    productList.setSelectedProduct(foundProduct)
    console.log('Выбранный товар:', productList.getSelectedProduct()?.title)
  }

  console.log('\n---\n')

  // 2. Тестирование ShoppingCart
  console.log('2. Тестирование ShoppingCart')
  const cart = new ShoppingCart()

  // Добавление товаров в корзину
  apiProducts.items.slice(0, 2).forEach(product => {
    cart.addProduct(product)
  })

  console.log(
    'Товары в корзине:',
    cart.getProducts().map(item => item.title),
  )
  console.log('Количество товаров в корзине:', cart.getTotalProducts())
  console.log('Общая стоимость корзины:', cart.getProductsPrise())

  // Проверка наличия товара
  const testProductId = apiProducts.items[0].id
  console.log(`Товар с ID "${testProductId}" в корзине:`, cart.hasProductById(testProductId))

  // Удаление товара

  cart.removeProduct(testProductId)
  console.log('Количество товаров после удаления:', cart.getTotalProducts())
  console.log(
    'Товары в корзине после удаления',
    cart.getProducts().map(item => item.title),
  )

  // Очистка корзины
  cart.removeShoppingCart()
  console.log('Колличество товаров после очитки:', cart.getTotalProducts())

  console.log('\n---\n')

  // 3. Тестирование Buyer
  console.log('3. Тестирование Buyer')
  const buyer = new Buyer()

  buyer.setBuyerInfo({ email: 'anton@mail.ru,', phone: '8800555', address: 'SPB Vostaniya' })

  console.log('Данные покупателя:', buyer.getBuyerInfo())
  console.log('Валидность данных покупателя:', buyer.validateBuyerInfo())

  // Очистка данных
  buyer.clearBuyerInfo()
  console.log('Данные покупателя после очистки:', buyer.getBuyerInfo())

  console.log('\n=== Тестирование завершено ===')
}

// Запуск тестирования
document.addEventListener('DOMContentLoaded', () => {
  console.log('Начало тестов')
  testModels()
})

// Проверка получения данных о товарах с сервера

const api = new Api(API_URL)
const apiCommunication = new ApiCommunication(api)
const productListApiTest = new ProductList()

try {
  const products = await apiCommunication.getProducts()
  productListApiTest.setProducts(products)
  console.log(
    'Инициализированные товары:',
    productListApiTest.getProducts().map(item => item.title),
  )
} catch (error) {
  console.log(error)
}
