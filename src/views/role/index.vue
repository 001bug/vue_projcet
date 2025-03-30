<template>
  <div class="container">
    <div class="app-container">
      <!-- 角色管理的内容 -->
      <!-- 表格 -->
      <div class="role-operate">
        <el-button size="mini" type="primary">添加角色</el-button>
      </div>
      <!-- 表单 -->
      <el-table>
        <el-table-column width="200" align="center" label="角色"/>
        <el-table-column width="200" align="center" label="启用"/>
        <el-table-column align="center" label="描述"/>
        <el-table-column align="center" label="操作"/>
      </el-table>
      <!-- 放置分页组件 -->
      <el-row type="flex" justify="end" style="height: 60px" align="middle">
        <el-pagination layout="prev,pager,next"/>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Role'
}
</script>
<style scoped>
.role-operate{
  padding: 10px
}
</style>