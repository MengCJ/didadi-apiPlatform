import request from '@/utils/request'

// export function login(data) {
//   return request({
//     url: '/vue-admin-template/user/login',
//     method: 'post',
//     data
//   })
// }

// export function getInfo(token) {
//   return request({
//     url: '/vue-admin-template/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }

export const login = (data) => request({url:"/api/user/login",method:'post', data})
export const getuserinfo = (data) => request({url:'/api/user/userLogin',method:'post',data})
export const logout = ()=> request({url:'/api/user/logout',method:"post"})