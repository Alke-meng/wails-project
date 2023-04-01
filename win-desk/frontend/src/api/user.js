import request from '@/utils/request.js'
import qs from 'qs'
export function login(data) {
  return  request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/getUserInfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getMenu() {
  return request({
    url: '/getMenu',
    method: 'get'
  })
}
export function getDict(params) {
  return request({
    url: '/getDict',
    method: 'get',
    params
  })
}

export function getList(data) {
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: '/list',
    method: 'post',
    data:qs.stringify(data)
  })
}