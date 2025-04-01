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

/**
 * 新增接口
 */
export function addRole(data){
    return request({
        url: '/sys/role',
        method: 'post',
        data
    })
}

/**
 * 更新角色
 */
export function updateRole(data){
    return request({
        url: `/sys/role/${data.id}`,
        method: 'put',
        data
    })
}