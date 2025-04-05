import layout from '@/layout'
export default {
  path: '/approval',
  name: 'approval',//name都是标识属性, 用在动态路由做对比的
  component: layout,
  children: [{
    path: '',
    name: 'approval',
    component: () => import('@/views/approval'),
    meta: {
      title: '审批',
      icon: 'tree-table'
    }
  }]
}
