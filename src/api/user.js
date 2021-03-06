import request from '@/utils/request'

export function register(data) {
  return request({
    url: '/blogServer/user/register',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: '/blogServer/user/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/blogServer/user/logout',
    method: 'post'
  })
}

export function getInfo(token) {
  return request({
    url: '/blogServer/user/info',
    method: 'get',
    params: { token }
  })
}

export function updataInfo(data) {
  return request({
    url: '/blogServer/user/login',
    method: 'post',
    data
  })
}
