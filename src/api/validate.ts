import request from '@/utils/request'

export const unique = async(
  value: string,
  model: string,
  id?: string
): Promise<any> => {
  return request({
    url: `auth/${model}/check-slug?slug=${value}${
      id !== 'undefined' ? '&id=' + id : ''
    }`,
    method: 'get'
  })
}

export const uniqueEmail = async(
  value: string,
  model: string,
  id?: string
): Promise<any> => {
  return request({
    url: `${model}/email-check?email=${value}${
      id !== 'undefined' ? '&id=' + id : ''
    }`,
    method: 'get'
  })
}
