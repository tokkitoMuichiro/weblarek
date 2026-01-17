import { IProduct } from '../../types'

export class ProductList {
  private _products: IProduct[] = []
  private _selectedProduct: IProduct | null = null

  constructor(products?: IProduct[], selectedProduct?: IProduct) {
    if (products) {
      this._products = [...products]
    }
    if (selectedProduct) {
      this._selectedProduct = { ...selectedProduct }
    }
  }

  setProducts(products: IProduct[]): void {
    this._products = [...products]
  }

  getProducts(): IProduct[] {
    return this._products ? [...this._products] : []
  }

  getProductById(id: string): IProduct | undefined {
    if (!this._products) {
      return undefined
    }
    return this._products.find(product => product.id === id)
  }

  setSelectedProduct(product: IProduct): void {
    this._selectedProduct = { ...product }
  }

  getSelectedProduct(): IProduct | null {
    if (this._selectedProduct) {
      return this._selectedProduct
    } else {
      return null
    }
  }
}
