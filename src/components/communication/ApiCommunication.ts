import { IApi, IProduct, ApiProductsResponse, ApiBuyerSending, ApiBuyerResponse } from '../../types'
export class ApiCommunication {
  private _api: IApi

  constructor(api: IApi) {
    this._api = api
  }

  async getProducts(): Promise<IProduct[]> {
    try {
      const response = await this._api.get<ApiProductsResponse>('/product/')
      return response.items
    } catch (error) {
      throw new Error(`Не удалось получить данные о товарах с сервера`)
    }
  }

  async createOrder(sendingInfo: ApiBuyerSending): Promise<ApiBuyerResponse> {
    try {
      const response = await this._api.post<ApiBuyerResponse>('/order/', sendingInfo)
      return response
    } catch (error) {
      throw new Error(`Возникла ошибка при создании заказа`)
    }
  }
}
