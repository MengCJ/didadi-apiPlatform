import request from '@/utils/request'

export const getIstInterfaceInfoByPage = (data)=>request({url:'/interface/list/page',method:'post',data})

export const getInfo = (id)=>request({url:`/interface/get?id=${id}`,method:'get'})


// 添加或者修改SPU
export const reqAddOrUpdataInterface = (data)=>{
    // 修改spu
    if(data.id){
        return request({url:'/interface/update',method:'post',data:data})
    }else{
        return request({url:'/interface/add',method:'post',data:data})
    }
}
// 删除接口

export const deleteInterface = (data) => request({url:"/interface/delete",method:'post',data}) 

// 上架接口
export const onlineInterface = (data) => request({url:'/interface/online',method:'post',data})
// 下架接口 /interface/offline
export const offlineInterface = (data) => request({url:'/interface/offline',method:"post",data})

// 注册接口 /user/register
export const userRegister = (data)=> request({url:'/user/register',method:'post',data})

// 用户中心
export const getLoginInfo = ()=>request({url:'/user/get/login',method:'get'})

// 获取图表信息 /api/analysis/
export const getAnalysis = ()=>request({url:'/analysis/',method:"get"})

// 获取调试的接口 /api/interface/invoke
export const getInvoke = (name,methods,data=null)=>request({url:`/invoke/interface/${name} `,method:`${methods}`,data})

// 获取用户的信息 /api/user/get
export const getUser = (id)=>request({url:`/user/get?id=${id}`,method:'get'})