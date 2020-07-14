import request from '@/utils/request'

export class BillStateApi {
  public async index(params?: any): Promise<any> {
    return await request({
      url: `/bill-states`,
      method: 'get',
      params
    })
  }

  public async show(id: number): Promise<any> {
    return await request({
      url: `/bill-states/${id}`,
      method: 'get'
    })
  }

  public async create(data: any): Promise<any> {
    return await request({
      url: `/bill-states`,
      method: 'post',
      data
    })
  }

  public async update(data: any): Promise<any> {
    return request({
      url: `/bill-states`,
      method: 'put',
      data
    })
  }

  public async delete(id: number): Promise<any> {
    return request({
      url: `/bill-states/${id}`,
      method: 'delete'
    })
  }
}
