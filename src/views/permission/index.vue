<template>
  <div class="container">
    <div class="app-container">
      <el-button class="btn-add" size="mini" type="primary">添加权限</el-button>
      <!-- default-expand-all ui的特定属性, 是否展开所有子节点 -->
      <el-table default-expand-all :data="list" row-key="id">
        <el-table-column label="名称" prop="name"/>
        <el-table-column label="标识" prop="code"/>
        <el-table-column label="描述" prop="description"/>
        <el-table-column label="操作">
          <!-- 这个三列有template包起来的原因是因为要展示数据,用v-slot -->
          <template v-slot="{row}">
            <el-button v-if="row.type===1" size="mini" type="text">添加</el-button>
            <el-button size="mini" type="text">编辑</el-button>
            <el-button size="mini" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import {getPermissionList} from '@/api/permission'
import { transListToTreeData } from '@/utils';
export default {
  name: 'Permission',
  data(){
    return{
      list:[]
    }
  },
  created(){
    //因为没有后端对应的接口,所以先注释
    //this.getPermissionList()
  },
  methods:{
    async getPermissionList(){
      this.list = transListToTreeData(await getPermissionList(), 0) // 将列表数据转化成树形结构
    }
  }
}
</script>
<style>
.btn-add {
  margin: 10px;
}
</style>
