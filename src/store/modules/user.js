import { getToken,setToken,removeToken } from "@/utils/auth"
const state={//类似java中开一个线程存储信息.
  token: getToken()
}

const mutations={
  setToken(state,token){
    state.token=token
    //同步数据到缓存
    setToken()
  },
  removeToken(){
    state.token=null
    removeToken()
  }
}

const actions={
  /**
   * @param
   * context:上下文
   * data: 传入参数
   */
  login(context,data){
    console.log(data)
    //然后在这里调用登录接口
    //然后返回一个token
    context.commit('setToken','123456')//暂时把token设置为123456
  }
}

export default{
  //其他模块访问必须带路径,类似java遇到多重方法名的时候携带全类名
  namespaced: true,
  state,
  mutations,
  actions
}