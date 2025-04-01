Vue.config.productionTip=true
import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {//process.env.NODE_ENV是环境变量.
// 在java中是放在application.yml管理,这种操作类似springboot使用@Profile来根据不同环境加载不同的bean
  const { mockXHR } = require('../mock')//引入模拟请求模块,类似与Import
  mockXHR()//启用模拟请求
}

// set ElementUI lang to EN
//Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
 Vue.use(ElementUI)//全局注册element-ui

Vue.config.productionTip = false
//创建一个vue实例, 并挂载到页面上的#app元素,同时配置路由,状态管理和根组件渲染
new Vue({
  el: '#app',//挂载到id="app"的dom元素上
  router, //引用定义号的Vue Router实例, 控制url和组件之间的映射,相当于springmvc的Controller
  store, //相当于Spring的全局Bean或缓存容器
  render: h => h(App)//渲染页面的根组件 , 指App. 可以理解为启动后加载首页的JSP模版
})
