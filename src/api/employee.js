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
/**
 * 
 * @returns 返回一个.xlsx文件
 */
export function getExportTemplate(){
    return request({
        url: '/sys/user/import/template',
        responseType: 'blob' //二进制文件流
    })
}

export function uploadExcel(data){
    return request({
        url: '/sys/user/import',
        method: 'post',
        data //form-data类型, 因为要上传文件类型
    })
}