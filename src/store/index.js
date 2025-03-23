import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)
//存储所需要共享的状态. 类似springboot中的全局单例Bean或Context
const store = new Vuex.Store({
  //模块化拆分sotre,类似java中的Service分层
  modules: {
    app,
    settings,
    user
  },
  getters
})

export default store
