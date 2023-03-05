import request from '@/utils/request'

export const getIstInterfaceInfoByPage = (data)=>request({url:'/api/interface/list/page',method:'post',data})

export const getInfo = (id)=>request({url:`/api/interface/get?id=${id}`,method:'get'})