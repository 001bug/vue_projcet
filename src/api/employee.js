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
/**
 * 
 * @param {*} data 需要上传的数据
 * @returns promise,因为这个是axios的方法
 */
export function uploadExcel(data){
    return request({
        url: '/sys/user/import',
        method: 'post',
        data //form-data类型, 因为要上传文件类型
    })
}
/**
 * 
 * @param {*} id 删除员工的id
 * @returns promise
 */
export function delEmployee(id){
    return request({
        method: 'delete',
        url: `/sys/user/${id}`
    })
}
/**
 * 新增员工
 * @param {*} data 
 * @returns 
 */
export function addEmployee(data){
    return request({
        url: '/sys/user',
        method: 'post',
        data
    })
}

/**
 * 获取员工的详细信息
 * @param {*} id 
 * @returns 
 */
export function getEmployeeDetail(id){
    return request({
        url: `/sys/user/${id}`
    })
}
/**
 * 更新员工的api
 * @param {*} data 
 * @returns 
 */
export function updateEmployee(data){
    return request({
        url: `/sys/user/${data.id}`,
        method: 'put',
        data
    })
}

/**
 * 获取可用的角色
 * @returns 
 */
export function getEnableRoleList(){
    return request({
        url: '/sys/role/list/enabled'
    })
}

/**
 * 分配员工角色
 * @param {*} data 在checkbox勾选的角色
 * @returns 
 */
export function assignRole(data) {
    return request({
      url: '/sys/user/assignRoles',
      method: 'put',
      data
    })
  }