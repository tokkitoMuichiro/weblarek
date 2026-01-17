import { IProduct } from '../../types'

export class ShoppingCart {
  private _products: IProduct[] = []

  constructor(products?: IProduct[]) {
    if (products) {
      this._products = [...products]
    }
  }

  getProducts(): IProduct[] {
    return this._products ? [...this._products] : []
  }

  addProduct(product: IProduct): void {
    this._products ? this._products.push({ ...product }) : undefined
  }

  removeProduct(productId: String): void {
    const index = this._products.findIndex(item => item.id === productId)
    if (index > -1) {
      this._products.splice(index, 1)
    }
  }

  removeShoppingCart(): void {
    this._products = []
  }

  getProductsPrise(): number {
    return this._products.reduce((acc, product) => acc + (product.price || 0), 0)
  }

  getTotalProducts(): number {
    return this._products.length
  }

  hasProductById(id: string): boolean {
    return this._products.some(product => (product.id = id))
  }
}
