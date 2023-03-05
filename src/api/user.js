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

export const login = (userAccount,userPassword) => request({url:`/api/user/login?userAccount=${userAccount}&userPassword=${userPassword}`,method:'get'})
export const getuserinfo = () => request({url:'/api/user/get/login',method:'get'})
export const logout = ()=> request({url:'/api/user/logout',method:"post"})