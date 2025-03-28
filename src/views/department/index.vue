<template>
    <div class="container">
        <div class="app-container">
            <!-- 展示树形结构 default-expand-all表示是否默认展开树形结构-->
            <el-tree default-expand-all :data="depts" :props="defaultProps" :expand-on-click-node="false">
                <!-- 节点结构 -->
                <!-- v-slot="{node,data}"只能作用在template , 为了获取data里面的数据-->
                <template v-slot="{data}">
                    <el-row style="width:100%;height:40px"type="flex" justify="space-between" align="middle">
                        <el-col>{{ data.name }}</el-col>
                        <el-col :span="4">
                            <span class="tree-manager">{{ data.managerName }}</span>
                            <!-- 下拉菜单 -->
                            <el-dropdown @command="operateDept($event,data.id)">
                                <span class="el-dropdown-link">
                                    操作<i class="el-icon-arrow-down el-icon--right"/>
                                </span>
                                <!-- 下拉菜单的内容 -->
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                                    <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                                    <el-dropdown-item command="del">删除</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </el-col>
                    </el-row>
                </template>
            </el-tree>
        </div>
        <!-- 放置弹层 -->
        <!-- 表示会接受子组件的事件 update:showDialog,值=>属性 -->
        <add-dept :current-node-id="currentNodeId" :show-dialog.sync="showDialog" @udpateDepartment="getDepartment"/>
    </div>
</template>
<script>
import {getDepartment} from '@/api/department'
import {transListToTreeDate} from '@/utils'
import AddDept from './components/add-dept.vue'
    export default{
        name: 'Department',
        components:{AddDept},
        data(){
            return {
                depts:[{name:'日汐科技', managerName:'管理员',children:[{
                    name: '总裁办',
                    managerName: '张三'
                },{
                    name: '技术部',
                    managerName: '小李'
                }]}],//数据属性
                defaultProps:{
                    children: 'children',
                    label: 'name' //要显示的字段的名字
                },
                showDialog: false
            }
        },
        methods: {
            async getDepartment(){
                const result = await getDepartment()
                this.depts=transListToTreeDate(result,0)
            },
            //操作部门的方法
            operateDept(type,id){
                if(type==='add'){
                    //添加子部门
                    this.showDialog=true //显示弹层
                    this.currentNodeId=id
                }
            }
        }
    }
</script>

<style scoped>
.app-container{
    padding: 30px 140px;
    font-size: 14px;
}
.tree-manager{
    width: 50px;
    display: inline-block;
    margin: 10px;
}
</style>