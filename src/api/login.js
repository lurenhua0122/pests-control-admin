import request from '@/utils/request'
const api_name = '/educenter/member'

// 登录
export function login(data) {
// debugger
  return request({
    url: `${api_name}/login/${data.username}/${data.password}`,
    method: 'get'
  })
}

// 获取用户信息
export function getInfo(token) {
  return request({
    url: `${api_name}/getMemberInfo`,
    method: 'get',
    params: { token }
  })
}

// 登出
export function logout() {
  // debugger
  return request({
    url: `${api_name}/logout`,
    method: 'post'
  })
}
