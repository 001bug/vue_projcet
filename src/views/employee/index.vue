<template>
  <div class="container">
    <div class="app-container">
      <div class="left">
        <el-input style="margin-bottom:10px" type="text" prefix-icon="el-icon-search" size="small" placeholder="输入员工姓名全员搜索"/>
        <!-- 树形组件 -->
        <el-tree
          ref="deptTree"
          node-key="id"
          :data="depts"
          :props="defaultProps"
          default-expand-all
          :expand-on-click-node="false"
          hightlight-current
          @current-change="selectNode"
        />
      </div>
      <div class="right">
        <el-row class="opeate-tools" type="flex" justify="end">
          <el-button size="mini" type="primary">添加员工</el-button>
          <el-button size="mini">excel导入</el-button>
          <el-button size="mini">excel导出</el-button>
        </el-row>
        <!-- 表格组件 -->
        <el-table :data="list">
          <el-table-column align="center" label="头像" prop="staffPhoto">
            <template v-slot="{row}">
              <el-avatar v-if="row.staffPhoto" :src="row.staffPhoto" :size="30"/>
              <span v-else class="username">{{ row.username.charAt(0) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="姓名" prop="username"/>
          <el-table-column label="手机号" sortable prop="mobile"/>
          <el-table-column label="工号" sortable prop="workNumber"/>
          <el-table-column label="聘用形式" prop="formOfEmployment">
            <template v-slot="{row}">
              <span v-if="row.formOfEmployment===1">正式</span>
              <span v-else-if="row.formOfEmployment===2">非正式</span>
              <span v-else>无</span>
            </template>
          </el-table-column>
          <el-table-column label="部门" prop="departmentName"/>
          <el-table-column label="入职时间" sortable prop="timeOfEntry"/>
          <el-table-column label="操作" width="280px">
            <template>
              <el-button size="mini" type="text">查看</el-button>
              <el-button size="mini" type="text">角色</el-button>
              <el-button size="mini" type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
         <el-row style="height: 60px" align="middle" type="flex" justify="end">
            <el-pagination
              layout="total,prev,pager,next"
              :total="1000"
            />
         </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import {getDepartment} from '@/api/department' 
import { transListToTreeData } from '@/utils'
import {getEmployeeList} from '@/api/employee'
export default {
  name: 'Employee',
  data(){
    return {
      depts:[], //组织数据
      defaultProps:{
        label: 'name',
        children: 'children'
      },
      queryParams:{
        departmentId: null
      },
      list:[]
    }
  },
  created(){
    //this.getDepartment(),因为没有对应的后端接口,所以暂时先注销
  },
  methods:{
    async getDepartment(){
      //递归方法将列表转化为树形
      this.depts=transListToTreeData(await getDepartment(),0)
      console.log(this.depts[0])
      this.queryParams.departmentId=this.depts[0].id
      //设置选中节点
      //树组件渲染是异步的. 等到更新完毕,nextTick回调函数执行的时候才有数据
      this.$nextTick(()=>{
        //此时意味着树渲染完毕
        this.$refs.deptTree.setCurrentKey(this.queryParams.departmentId)
      })
      //这个时候参数记录了id
      this.getEmployeeList()
    },
    //获取员工列表的方法
    async getEmployeeList(){
      const {rows}=await getEmployeeList(this.queryParams)
      this.list=rows
    },
    selectNode(node){
      this.queryParams.departmentId=node.id //重新记录参数
      //在切换左侧栏的时候,重新请求更新数据
      this.getEmployeeList()
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