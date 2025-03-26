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
/**
 * 
 * @param {*} data 
 * @returns 这个data发给后端的数据,包括了新旧密码
 */
export function updatePassword(data){
  return request({
    url:'/sys/user/updatePass',
    method: 'put',
    data
  })
}