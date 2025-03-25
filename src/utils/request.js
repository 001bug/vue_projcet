import axios from 'axios'//引入一些对应的包
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
const service =axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000,
})//创建一个新的axios实例,这个东西能够伪装请求

//创建请求拦截器
/**
 * @param 两个回调函数,成功1,失败2
 */
service.interceptors.request.use((config)=>{
  //注入token
  if(store.getters.token){
    config.headers.Authorization=`Bearer ${store.getters.token}`
  }
  return config
},(error)=>{
  return Promise.reject(error)
})

//创建响应拦截器
/**
 * @param 两个回调函数,成功1,失败2
 */
service.interceptors.response.use((response)=>{
  const {data,message,success}=response.data
  if(success){
    return data
  }
  else{
    Message({type:'error',message:error.message})
    return Promise.reject(new Error(message))
  }
},async(error)=>{
  if(error.response.status==401){
    //说明token超时
    Message({type:'warning',message:'token超时了'})
    await store.dispatch('user/logout')//调用action退出登录
    //主动跳到登录页面
    router.push('/login')
    return Promise.reject(error)
  }
  Message({type:'error',message: error.message})
  return Promise.reject(error)
})
export default service