import request from '@/utils/request'

export class BillApi {
  public async index(params?: any): Promise<any> {
    return await request({
      url: `/bills`,
      method: 'get',
      params
    })
  }

  public async show(id: number): Promise<any> {
    return await request({
      url: `/bills/${id}`,
      method: 'get'
    })
  }

  public async create(data: any): Promise<any> {
    return await request({
      url: `/bills`,
      method: 'post',
      data
    })
  }

  public async update(data: any): Promise<any> {
    return request({
      url: `/bills`,
      method: 'put',
      data
    })
  }

  public async delete(id: number): Promise<any> {
    return request({
      url: `/bills/${id}`,
      method: 'delete'
    })
  }
}
