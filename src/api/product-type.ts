import request from '@/utils/request'

export class ProductTypeApi {
  public async index(params?: any): Promise<any> {
    return await request({
      url: `auth/product-types`,
      method: 'get',
      params
    })
  }

  public async show(id: number): Promise<any> {
    return await request({
      url: `auth/product-types/${id}`,
      method: 'get'
    })
  }

  public async create(data: any): Promise<any> {
    return await request({
      url: `auth/product-types`,
      method: 'post',
      data
    })
  }

  public async update(data: any): Promise<any> {
    return request({
      url: `auth/product-types/${data.id}`,
      method: 'put',
      data
    })
  }

  public async delete(id: number): Promise<any> {
    return request({
      url: `auth/product-types/${id}`,
      method: 'delete'
    })
  }
}
