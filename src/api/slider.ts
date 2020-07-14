import request from '@/utils/request'

export class SliderApi {
  public async index(params?: any): Promise<any> {
    return await request({
      url: `/sliders`,
      method: 'get',
      params
    })
  }

  public async show(id: number): Promise<any> {
    return await request({
      url: `/sliders/${id}`,
      method: 'get'
    })
  }

  public async create(data: any): Promise<any> {
    return await request({
      url: `/sliders`,
      method: 'post',
      data
    })
  }

  public async update(data: any): Promise<any> {
    return request({
      url: `/sliders`,
      method: 'put',
      data
    })
  }

  public async delete(id: number): Promise<any> {
    return request({
      url: `/sliders/${id}`,
      method: 'delete'
    })
  }
}
