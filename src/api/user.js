import request from '@/utils/request'

export function login(data){
  //返回promise对象
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
export function getUserInfo(){
  return request({
    url: '/sys/profile',
    method: 'get'
  })
}