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
        <el-table-column prop="name" width="200" align="center" label="角色"/>
        <el-table-column prop="state" width="200" align="center" label="启用">
          <!-- 自定义列结构,这里自定义一个启用列 -->
          <template v-slot="{row}">
            <!-- 条件渲染 -->
            <span>{{ row.state===1?"已启用":row.state===0?"末启用":"无" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="description" align="center" label="描述"/>
        <el-table-column align="center" label="操作">
          <!-- 放置操作按钮 -->
           <template>
            <el-button size="mini" type="text">分配权限</el-button>
            <el-button size="mini" type="text">编辑</el-button>
            <el-button size="mini" type="text">删除</el-button>
           </template>
        </el-table-column>
      </el-table>
      <!-- 放置分页组件 -->
      <el-row type="flex" justify="end" style="height: 60px" align="middle">
        <el-pagination 
          :page-size="pageParams.pagesize"
          :current-page="pageParams.page"
          :total = "pageParams.total"
          @current-change="changePage"
          layout="prev,pager,next"/>
      </el-row>
    </div>
  </div>
</template>
<script>
import {getRoleList} from '@/api/role'
export default {
  name: 'Role',
  data(){
    return {
      list:[],
      pageParams:{
        page:1,
        pagesize:5,
        total:0
      }
    }
  },
  created(){
    //因为暂时没有接口, 这里先暂时注释掉
    //this.getRoleList()
    console.log("yes")
  },
  methods:{
    async getRoleList(){
      const {rows,total}=await getRoleList(this.pageParams)
      this.list=rows//赋值数据
      this.pageParams.total=total
    },
    //切换页面时请求新的数据
    changePage(newPage){
      this.pageParams.page=newPage //赋值当前页码
      this.getRoleList()
    }
  }
}
</script>
<style scoped>
.role-operate{
  padding: 10px
}
</style>