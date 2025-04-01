import request from '@/utils/request'
export function getEmployeeList(params){
    return request({
        url: '/sys/user',
        params
    })
}