import { getToken,setToken,removeToken } from "@/utils/auth"
import { login , getUserInfo} from '@/api/user'
import { constantRoutes } from "@/router"
import {resetRouter} from '@/router'

const state={//类似java中开一个线程存储信息.
  token: getToken(),
  userInfo: {},
  routes: constantRoutes //静态路由的数组
}

const mutations={
  setToken(state,token){
    state.token=token
    //同步数据到缓存
    setToken(token)
  },
  removeToken(state){
    state.token=null
    removeToken()
  },
  setUserInfo(state,userInfo){
    state.userInfo=userInfo
  },
  setRoutes(state,newRoutes){
    state.routes=[...constantRoutes, ...newRoutes] //静态路由+动态路由
  }
}

const actions={
  /**
   * @param
   * context:上下文
   * data: 传入参数
   */
  async login(context,data){
    console.log(data)
    //然后在这里调用登录接口
    //然后返回一个token
    //前端发起一个异步登录请求, 这是异步的.因为这里没有后端接口,所以暂时注释掉
    //const result = await login(data)
    console.log("设置token")
    context.commit('setToken',"666")//暂时把token设置为123456
  },
  //获取用户的基本信息
  async getUserInfo(context){
     const result = await getUserInfo()
     context.commit('setUserInfo',result)
     return result
  },
  //退出登录的action
  logout(context){
    context.commit('removeToken')//删除缓存中的token
    context.commit('setUserInfo',{})//设置用户信息为空对象
    //重置路由
    resetRouter()
  }
}

export default{
  //其他模块访问必须带路径,类似java遇到多重方法名的时候携带全类名
  namespaced: true,
  state,
  mutations,
  actions
}