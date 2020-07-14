import request from '@/utils/request'

export class ProductImageApi {
  public async index(params?: any): Promise<any> {
    return await request({
      url: `/product-images`,
      method: 'get',
      params
    })
  }

  public async show(id: number): Promise<any> {
    return await request({
      url: `/product-images/${id}`,
      method: 'get'
    })
  }

  public async create(data: any): Promise<any> {
    return await request({
      url: `/product-images`,
      method: 'post',
      data
    })
  }

  public async update(data: any): Promise<any> {
    return request({
      url: `/product-images`,
      method: 'put',
      data
    })
  }

  public async delete(id: number): Promise<any> {
    return request({
      url: `/product-images/${id}`,
      method: 'delete'
    })
  }

  public async deleteTempoary(id: string): Promise<any> {
    return request({
      url: `/product-images/temporaries/${id}`,
      method: 'delete'
    })
  }
}
