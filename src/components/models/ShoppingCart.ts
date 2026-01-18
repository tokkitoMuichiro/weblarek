import { IProduct } from '../../types'

export class ShoppingCart {
  private products: IProduct[] = []

  constructor() {}

  getProducts(): IProduct[] {
    return this.products
  }

  addProduct(product: IProduct): void {
    this.products.push(product)
  }

  removeProduct(productId: String): void {
    this.products = this.products.filter(item => item.id !== productId)
  }

  removeShoppingCart(): void {
    this.products = []
  }

  getProductsPrise(): number {
    return this.products.reduce((acc, product) => acc + (product.price || 0), 0)
  }

  getTotalProducts(): number {
    return this.products.length
  }

  hasProductById(id: string): boolean {
    return this.products.some(product => (product.id = id))
  }
}
