import request from '@/utils/request'

export class BillDetailApi {
  public async index(params?: any): Promise<any> {
    return await request({
      url: `/bill-details`,
      method: 'get',
      params
    })
  }

  public async show(id: number): Promise<any> {
    return await request({
      url: `/bill-details/${id}`,
      method: 'get'
    })
  }

  public async create(data: any): Promise<any> {
    return await request({
      url: `/bill-details`,
      method: 'post',
      data
    })
  }

  public async update(data: any): Promise<any> {
    return request({
      url: `/bill-details`,
      method: 'put',
      data
    })
  }

  public async delete(id: number): Promise<any> {
    return request({
      url: `/bill-details/${id}`,
      method: 'delete'
    })
  }
}
