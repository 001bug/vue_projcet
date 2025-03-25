import axios from 'axios'//引入一些对应的包
import store from '@/store'
const service =axios.create({
  baseURL: '/api',
  timeout: 10000,
})//创建一个新的axios实例,这个东西能够伪装请求

//创建请求拦截器
/**
 * @param 两个回调函数,成功1,失败2
 */
service.interceptors.request.user((config)=>{
  //注入token
  if(store.getters.token){
    config.headers.Authorization=`Bearer ${store.getters.token}`
  }
  return config
},(error)=>{
  return Promise.reject(error)
})

export default service