import router from "@/router";
import nprogress from "nprogress";
import 'nprogress/nprogress.css';
import store from '@/store'

//请求的白名单
const whiteList=['/login','/404' ]
/**
 * @param to 到哪里去 from 从哪里来 next执行一定的逻辑后,必须执行的函数,类似放行
 */

//路由前置守卫,每一次跳转前都会执行这个函数,类似springmvc的拦截器,这是一个回调函数
router.beforeEach(async(to,from,next)=>{
    nprogress.start()
    if(store.getters.token){
        if(to.path=='/login'){
            //跳转到主页
            next('/')
            //执行完这个函数并没有执行后置守卫,所以要手动关闭进度条
            nprogress.done()
        }else{
            //判断是否获取了用户的资料, 因为没接口暂时注释掉
            // if(!store.getters.userId){
            //     await store.dispatch("user/getUserInfo")
            // }
            if(false){
                await store.dispatch("user/getUserInfo")
            }
            next()//放行
        }
    }else{
        //没有token
        if(whiteList.includes(to.path)){
            next()//放行
        }else{
            next('/login')
            nprogress.done()
        }
    }
})

// 路由导航守卫, 路由结束后执行的方法
router.afterEach(()=>{
    nprogress.done()//关闭进度条
})