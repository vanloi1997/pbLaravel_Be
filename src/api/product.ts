import request from '@/utils/request'

export class ProductApi {
  public async index(params?: any): Promise<any> {
    return await request({
      url: `auth/products`,
      method: 'get',
      params
    })
  }

  public async show(id: number): Promise<any> {
    return await request({
      url: `auth/products/${id}`,
      method: 'get'
    })
  }

  public async showPv(pv: string): Promise<any> {
    return await request({
      url: `auth/products/pv`,
      method: 'get',
      params: { pv }
    })
  }

  public async create(data: any): Promise<any> {
    return await request({
      url: `auth/products`,
      method: 'post',
      data
    })
  }

  public async update(id: number ,data: any): Promise<any> {
    return request({
      url: `auth/products/${id}`,
      method: 'post',
      data
    })
  }

  public async delete(id: number): Promise<any> {
    return request({
      url: `auth/products/${id}`,
      method: 'delete'
    })
  }
}
