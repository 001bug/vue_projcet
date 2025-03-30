import request from '@/utils/request'
/**
 * 获取角色列表
 */
export function getRoleList(params){
    return request({
        url:'/sys/role',
        params //查询参数
    })
}