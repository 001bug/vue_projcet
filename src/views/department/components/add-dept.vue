<template>
    <el-dialog title="新增部门" :visible="showDialog" @class="close">
        <el-form label-width="120px" ref="addDept" :model="formData" :rules="rules">
            <el-form-item prop="name" label="部门名称">
                <el-input v-model="formData.name" placeholder="2-10个字符" style="width:80%" size="mini"/>
            </el-form-item>
            <el-form-item prop="code" label="部门编码">
                <el-input v-model="formData.code" placeholder="2-10个字符" style="width:80%" size="mini"/>
            </el-form-item>
            <el-form-item prop="managerId" label="部门负责人">
                <el-select v-model="formData.managerId" placeholder="请选择负责人" style="width:80%" size="mini"/>
                <!-- 下拉选项 循环 负责人数据 label 表示显示的字段 value 存储字段 -->
                <el-option v-for="item in managerList" :key="item.id" :label="item.username" :value="item.id"/>
            </el-form-item>
            <el-form-item prop="introduce"label="部门介绍">
                <el-input v-model="formData.introduce" palceholder="1-100个字符" type="textarea" size="mini":rows="4" style="width: 80%"/>
            </el-form-item>
            <el-form-item>
                <!-- 按钮 justify水平方向的设置-->
                <el-row type="flex" justify="center">
                    <el-col :span="12">
                        <el-button size="mini" type="primary">确定</el-button>
                        <el-button size="mini">取消</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import { getDepartment ,getManagerList} from '@/api/department';

    export default{
        name: 'AddDept',
        props:{
            showDialog:{
                type: Boolean,
                default: false
            },
            currentNodeId:{
                type: Number,
                default:null
            }
        },
        created(){
            //创建初始化函数, 初始化的时候把部门负责人的数据从后端拉取下来
            this.getManagerList()
        },
        data(){
            return{
                managerList:[],//存储负责人列表
                formData:{
                    code:'',//部门编号
                    introduce: '',//部门介绍
                    managerId: '',//部门负责人id
                    name: '',//部门名称
                    pid: ''//父级部门的id
                },
                rules:{
                    code:[{required:true,message:'部门编码不能为空',trigger:'blur'},
                        {
                            min:2,max:10,message:'部门编码的长度为2-10个字符',trigger:'blur'
                        },{
                            //失去焦点就触发
                            trigger:'blur',
                            //这里写一个回调函数,用来向后端获取数据然后校验数据是否重复
                            validator: async(rule,value,callback)=>{
                                //调用api的getDepartment方法
                                let result=await getDepartment()
                                if(result.some(item=>item.code===value)){
                                    callback(new Error('部门中已经有该编码了'))
                                }else{
                                    callback()
                                }
                            }
                        }
                    ],//部门编码
                    introduce:[{required:true,message:'部门介绍不能为空',trigger:'blur'},
                        {
                            min:1,max:100,message:'部门介绍的长度为1-100个字符',trigger:'blur'
                        }
                    ],//部门介绍
                    managerId:[{required:true,message:'部门的负责人不能为空',trigger:'blur'},
                        {
                            min:2,max:10,message:'部门介绍要在1-100字符以内',trigger:'blur'
                        }
                    ],
                    name:[{required:true,message:'部门的名称不能为空',trigger:'blur'},
                        {
                            min:2,max:10,message:'部门名称要在1-10z字符以内',trigger:'blur'
                        },{
                                trigger:'blur',
                                validator: async(rule,value,callback)=>{
                                    let result=await getDepartment()
                                    if(result.some(item=>item.name===value)){
                                        callback(new Error('部门中已经有该名称了'))
                                    }else{
                                        callback()
                                    }
                                }
                        }
                    ]//部门名称
                }
            }
        },
        methods :{
            close(){
                this.$emit('update:showDialog',false)
            },
            async getManagerList(){
                this.managerList = await getManagerList()
            }
        },
    }
</script>