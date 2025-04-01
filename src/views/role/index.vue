<template>
  <div class="container">
    <div class="app-container">
      <!-- 角色管理的内容 -->
      <!-- 表格 -->
      <div class="role-operate">
        <el-button size="mini" type="primary" @click="showDialog=true">添加角色</el-button>
      </div>
      <!-- 表单 -->
      <el-table :data="lsit">
        <!-- 放置列 -->
        <el-table-column prop="name" width="200" align="center" label="角色">
          <template v-slot="{row}">
            <!-- 条件判断 -->
            <el-input v-if="row.isEdit" size="mini" v-model="row.editRow.name"/>
            <span v-else>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" width="200" align="center" label="启用">
          <!-- 自定义列结构,这里自定义一个启用列 -->
          <template v-slot="{ row }">
            <!-- 开 1 关 0 -->
            <el-switch v-if="row.isEdit" v-model="row.editRow.state" :active-value="1" :inactive-value="0" />
            <span v-else>  {{ row.state === 1 ? "已启用" : row.state === 0 ? "未启用" : "无" }} </span>
          </template>
        </el-table-column>
        <el-table-column prop="description" align="center" label="描述">
          <template v-slot="{row}">
            <el-input v-if="row.isEdit" type="textarea" v-model="row.editRow.description" size="mini"/>
            <span v-else>{{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template v-slot="{row}">
            <template v-if="row.isEdit">
              <!-- 编辑状态下 -->
              <el-button type="primary" size="mini" @click="btnEditOK(row)">确定</el-button>
              <el-button size="mini" @click="row.isEdit=false">取消</el-button>
            </template>
            <template v-else>
              <!-- 非编辑状态 -->
              <el-button size="mini" type="text">分配权限</el-button>
              <el-button size="mini" type="text" @click="btnEditRow(row)">编辑</el-button>
              <el-button size="mini" type="text">删除</el-button>
            </template>
          </template>
          <!-- 放置操作按钮 -->
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
    <!-- 放置弹层 -->
    <el-dialog width="500px" title="新增角色" :visible.sync="showDialog" @close="btnCancel">
      <!-- 表单内容 -->
      <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="120px">
        <el-form-item prop="name" label="角色名称">
          <el-input v-model="roleForm.name" style="width:300px" size="mini" />
        </el-form-item>
        <el-form-item label="启用" prop="state">
          <!-- 重置表单数据 需要prop属性 -->
          <!-- 如果不需要校验 就不需要写 prop属性 -->
          <el-switch v-model="roleForm.state" :active-value="1" :inactive-value="0" size="mini" />
        </el-form-item>
        <el-form-item prop="description" label="角色描述">
          <el-input v-model="roleForm.description" type="textarea" :rows="3" style="width:300px" size="mini" />
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="center">
            <el-col :span="12">
              <el-button type="primary" size="mini" @click="btnOK">确定</el-button>
              <el-button size="mini" @click="btnCancel">取消</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {getRoleList,addRole} from '@/api/role'
export default {
  name: 'Role',
  data(){
    return {
      list:[],
      showDialog:false,//控制弹层显示
      pageParams:{
        page:1,
        pagesize:5,
        total:0 
      },
      roleForm:{
        name: '',
        description:'',
        state:0
      },
      rules:{
        name:[{required:true,message:'角色名称不能为空',trigger:'blur'}],
        description:[{required:true,message:'角色描述',trigger:'blur'}],
      },
      roleForm:{
        name: '',
        description:'',
        state:0
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
      //针对每一行添加一个编辑标记
      this.list.forEach(item=>{
        //item.isEdit=false //添加一个属性,初始值为false,这个是动态添加的属性
        //数据响应式的问题, 数据变化, 视图更新变化,添加动态属性是不具备响应式特点的,因为这些属性是没有被监控到的
        //this.$set(目标对象, 属性, 初始值)可以针对目标对象, 添加的属性添加响应式
        this.$set(item,"isEdit",false)
      })
    },
    //切换页面时请求新的数据
    changePage(newPage){
      this.pageParams.page=newPage //赋值当前页码
      this.getRoleList()
    },
    btnOK(){
      this.$refs.roleForm.validate(async isOK=>{
        if(isOK){
          await addRole(this.roleForm)
          this.$message.success('新增角色成功')
          this.getRoleList()
          this.btnCancel()
        }
      })
    },
    btnCancel(){
      this.$refs.roleForm.resetFields()//重置表单
      this.showDialog=false//关闭弹层
    },
    //点击编辑行
    btnEditRow(row){
      //改变行的编辑状态
      row.isEdit=true
    }
  }
}
</script>
<style scoped>
.role-operate{
  padding: 10px
}
</style>