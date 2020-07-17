import request from '@/utils/request'

export class CategoryApi {
  public async index(params?: any): Promise<any> {
    return await request({
      url: `auth/categories`,
      method: 'get',
      params
    })
  }

  public async show(id: number): Promise<any> {
    return await request({
      url: `auth/categories/${id}`,
      method: 'get'
    })
  }

  public async create(data: any): Promise<any> {
    return await request({
      url: `auth/categories`,
      method: 'post',
      data
    })
  }

  public async update(data: any): Promise<any> {
    return request({
      url: `auth/categories/${data.id}`,
      method: 'put',
      data
    })
  }

  public async delete(id: number): Promise<any> {
    return request({
      url: `/categories/${id}`,
      method: 'delete'
    })
  }
}
