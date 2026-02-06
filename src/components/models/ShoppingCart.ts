import { IProduct } from '../../types'
import { IEvents } from '../base/Events'

export class ShoppingCart {
  private products: IProduct[] = []

  constructor(protected events: IEvents) {}

  getProducts(): IProduct[] {
    return this.products
  }

  addProduct(product: IProduct): void {
    this.products.push(product)
    this.events.emit('cart:changed', { products: this.products })
  }

  removeProduct(productId: string): void {
    this.products = this.products.filter(item => item.id !== productId)
    this.events.emit('cart:changed', { products: this.products })
  }

  removeShoppingCart(): void {
    this.products = []
    this.events.emit('cart:changed', { products: this.products })
  }

  getProductsPrise(): number {
    return this.products.reduce((acc, product) => acc + (product.price || 0), 0)
  }

  getTotalProducts(): number {
    return this.products.length
  }

  hasProductById(id: string): boolean {
    return this.products.some(product => product.id === id)
  }
}
