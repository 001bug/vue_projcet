import request from '@/utils/request'

/**
 * 获取权限列表
 */
export function getPermissionList(){
    return request({
        url: '/sys/permission'
    })
}