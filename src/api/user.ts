import request from '@/utils/request'

export class UserApi {
  public async index(params?: any): Promise<any> {
    return await request({
      url: `auth/users`,
      method: 'get',
      params
    })
  }

  public async show(id: number): Promise<any> {
    return await request({
      url: `auth/users/${id}`,
      method: 'get'
    })
  }

  public async create(data: any): Promise<any> {
    return await request({
      url: `auth/users`,
      method: 'post',
      data
    })
  }

  public async update(id: number, data: any): Promise<any> {
    return request({
      url: `auth/users/${id}`,
      method: 'post',
      data
    })
  }

  public async delete(id: number): Promise<any> {
    return request({
      url: `auth/users/${id}`,
      method: 'delete'
    })
  }
}
