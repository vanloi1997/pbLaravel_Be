import request from '@/utils/request'

export class ProviderApi {
  public async index(params?: any): Promise<any> {
    return await request({
      url: `/providers`,
      method: 'get',
      params
    })
  }

  public async show(id: number): Promise<any> {
    return await request({
      url: `/providers/${id}`,
      method: 'get'
    })
  }

  public async create(data: any): Promise<any> {
    return await request({
      url: `/providers`,
      method: 'post',
      data
    })
  }

  public async update(data: any): Promise<any> {
    return request({
      url: `/providers`,
      method: 'put',
      data
    })
  }

  public async delete(id: number): Promise<any> {
    return request({
      url: `/providers/${id}`,
      method: 'delete'
    })
  }
}
