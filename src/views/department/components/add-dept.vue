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
                        <el-button size="mini" type="primary" @click="btnOK">确定</el-button>
                        <el-button size="mini" @click="close">取消</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import { getDepartment ,getManagerList,addDepartment,getDepartmentDetail} from '@/api/department';

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
        //没有接口,不能调用
        // created(){
        //     //创建初始化函数, 初始化的时候把部门负责人的数据从后端拉取下来
        //     this.getManagerList()
        // },
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
                            /**
                             * 
                             * @param rule 
                             * @param value 输入
                             * @param callback 
                             */
                            validator: async(rule,value,callback)=>{
                                //获取当前的数据,这边因为没有后端接口,应该先不启用
                                let result=await getDepartment()
                                //排除自身的数据
                                if(this.formData.id){
                                    //在result中不属于formData中的数据复写在新数组中
                                    result = result.filter(item=>item.id !== this.formData.id)
                                }
                                //判断新的数据有没有在旧的数据中
                                if(result.some(item=>item.code === value)){
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
                                    //判断当前是否是编辑模式
                                    if(this.formData.id){
                                        //编辑场景, 排除自身.不要被查重校验
                                        result=result.filter(item=>item.id!== this.formData.id)
                                    }
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
                //修改父组件的值 , 通过子组件修改父组件
                this.$refs.addDept.resetFields()//重置表单
                this.$emit('update:showDialog',false)
            },
            async getManagerList(){
                this.managerList = await getManagerList()
            },
            btnOK(){
                this.$refs.addDept.validate(async isOK=>{
                    if(isOK){
                        let msg='新增'
                        //通过formData中的id判断场景, 如果有id说明已从后端拿到数据
                        if(this.formData.id){
                            //编辑场景
                            msg='更新'
                            await updateDepartment(this.formData)
                        }else{
                            //新增场景
                            await addDepartment({...this.formData,pid: this.currentNodeId})
                            //通知父组件来更新?
                            this.$emit("updateDepartment")
                            this.$message.success('${msg}部门成功')
                            this.close()
                        }
                    }
                })
            },
            //获取组织的详细数据
            getDepartmentDetail(){
                //调用获取详细信息的api接口,但是因为没有对应的后端接口,暂时注释
                //const result = await getDepartmentDetail(this.currentNodeId)
                this.formData=result
                console.log("1234")
            }
        },
    }
</script>