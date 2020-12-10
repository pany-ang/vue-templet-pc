import request from '@/utils/request'
import qs from 'qs'

// 登录认证
export function homeLogin(data) {
  return request({
    url: '/api/home',
    method: 'post',
    data: data,
    transformRequest: [function(data) {
      return qs.stringify(data)
    }]
  })
}

// 获取登录状态
export function getLoginStatus() {
  return request({
    url: '/api/getLoginStatus',
    method: 'get'
  })
}

// 获取登录的用户详情
export function getLoginUserInfo() {
  return request({
    url: '/api/getLoginUserInfo',
    method: 'get'
  })
}
