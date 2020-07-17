import request from '@/utils/request'

export class AuthenticateApi {
  public login = async(data: any) =>
    request({
      url: '/auth/login',
      method: 'post',
      data
    })

  public register = async(data: any) => {
    request({
      url: '/auth/register',
      method: 'post',
      data
    })
  }

  public getUserInfo = () =>
    request({
      url: '/auth/user',
      method: 'get'
    })

  public logout = async() =>
    request({
      url: '/auth/logout',
      method: 'post'
    })
}
