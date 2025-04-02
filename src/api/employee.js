import request from '@/utils/request'
export function getEmployeeList(params){
    return request({
        url: '/sys/user',
        params
    })
}
/**
 * 
 * @returns 导出员工的excel
 */
export function exportEmployee(){
    return request({
        url: '/sys/user/export',
        //使用blob接收二进制文件流
        responseType: 'blob'
    })
}