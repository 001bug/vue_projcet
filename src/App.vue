<template>
  <div id="app">
    <!-- 占位符,动态渲染当前路由匹配到的组件,根据当前的URL,自动加载对应的组件 -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
