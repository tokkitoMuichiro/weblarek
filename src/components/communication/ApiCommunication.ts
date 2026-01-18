import { IApi, IProduct, TApiProductsResponse, IApiBuyerSending, TApiBuyerResponse } from '../../types'
export class ApiCommunication {
  private _api: IApi

  constructor(api: IApi) {
    this._api = api
  }

  async getProducts(): Promise<IProduct[]> {
    try {
      const response = await this._api.get<TApiProductsResponse>('/product/')
      return response.items
    } catch (error) {
      throw new Error(`Не удалось получить данные о товарах с сервера`)
    }
  }

  async createOrder(sendingInfo: IApiBuyerSending): Promise<TApiBuyerResponse> {
    try {
      const response = await this._api.post<TApiBuyerResponse>('/order/', sendingInfo)
      return response
    } catch (error) {
      throw new Error(`Возникла ошибка при создании заказа`)
    }
  }
}
