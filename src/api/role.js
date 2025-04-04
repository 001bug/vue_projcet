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

/**
 * 删除角色
 */
export function delRole(id){
    return request({
        url: `/sys/role/${id}`,
        method: 'delete'
    })
}

/**
 * 获取角色的详细信息, 这里包括了权限信息
 * @param {*} id 
 * @returns 
 */
export function getRoleDetail(id) {
    return request({
      url: `/sys/role/${id}`
    })
  }

  /**
   * 给角色分配权限
   * @param {*} data 
   * @returns 
   */
  export function assignPerm(data) {
    return request({
      url: '/sys/role/assignPrem',
      method: 'put',
      data
    })
  }