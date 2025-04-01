<template>
  <div class="container">
    <div class="app-container">
      <div class="left">
        <el-input style="margin-bottom:10px" type="text" prefix-icon="el-icon-search" size="small" placeholder="输入员工姓名全员搜索"/>
        <!-- 树形组件 -->
        <el-tree
          :data="depts"
          :props="defaultProps"
          default-expand-all
          :expand-on-click-node="false"
          hightlight-current
        />
      </div>
      <div class="right">
        <el-row class="opeate-tools" type="flex" justify="end">
          <el-button size="mini" type="primary">添加员工</el-button>
          <el-button size="mini">excel导入</el-button>
          <el-button size="mini">excel导出</el-button>
        </el-row>
        <!-- 表格组件 -->
        <!-- 分页 -->
      </div>
    </div>
  </div>
</template>
<script>
import {getDepartment} from '@/api/department' 
import { transListToTreeData } from '@/utils'
export default {
  name: 'Employee',
  data(){
    return {
      depts:[], //组织数据
      defaultProps:{
        label: 'name',
        children: 'children'
      }
    }
  },
  created(){
    //this.getDepartment(),因为没有对应的后端接口,所以暂时先注销
  },
  methods:{
    async getDepartment(){
      //递归方法将列表转化为树形
      this.depts=transListToTreeData(await getDepartment(),0)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  background: #fff;
  display: flex;
  .left {
    width: 280px;
    padding: 20px;
    border-right: 1px solid #eaeef4;
  }
  .right {
    flex: 1;
    padding: 20px;
    .opeate-tools {
      margin:10px ;
    }
    .username {
      height: 30px;
      width: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 50%;
      color: #fff;
      background: #04C9BE;
      font-size: 12px;
      display:inline-block;
    }
  }
}

</style>