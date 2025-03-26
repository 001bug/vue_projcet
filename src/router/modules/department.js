import layout from '@/layout'
export default{
    //路由信息
    path: '/department',//相当于java中的@RequestMapping("/department")
    component: layout,//一级路由,相当于父级模版,所有子页面的外壳
    children:[{
        path:'',//二级路由地址为空时 表示/department 显示一级路由+二级路由
        name: 'department',//可以用来跳转 也可以标记路由
        component:()=>import('@/views/department'),//表示懒加载,加载department.vue组件
        meta:{
            //路由元信息 存储数据的,相当于java中的注解获取额外的属性
            title:'组织',//图标
            icon:'tree'//标题
        }
    }]//用户代理,服务器,电子邮件的协议
}