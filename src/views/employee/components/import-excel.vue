<template>
    <el-dialog
        width="500px"
        title="员工导入"
        :visible="showExcelDialog"
        @close="$emit('update:showExcelDialog',false)">

        <el-row type="flex" justify="center">
            <div class="upload-excel">
                <input
                    ref="excel-upload-input"
                    class="excel-upload-input"
                    type="file"
                    accept=".xlsx,.xls"
                    @change="uploadChange"
                >
                <div class="drop">
                    <i class="el-icon-upload"/>
                    <el-button type="text" @click="getTemplate">下载导入模版</el-button>
                    <span>将文件拖到此处
                        <el-button type="text" @click="handleUpload">点击上传</el-button>
                    </span>
                </div>
            </div>
        </el-row>
        <el-row type="flex" justify="end">
            <el-button size="mini" type="primary" @click="$emit('update:showExcelDialog',false)">取消</el-button>
        </el-row>
    </el-dialog>
</template>

<script>
import {getExportTemplate,uploadExcel} from '@/api/employee'
    export default{
        props:{
            showExcelDialog:{
                type: Boolean,
                default: false
            }
        },
        methods:{
            async getTemplate(){
                alert("ok")
                const data=await getExportTemplate()
                FilSaver.saveAs(data,'员工导入模版.xlsx')
            },
            handleUpload(){
                //alert('文件上传')
                this.$refs['excel-upload-input'].click() 
            },
            async uploadChange(event){
                alert("监听关闭弹层的触发")
                //input的文件列表
                const files=event.target.files
                if(files.length>0){
                    //大于0说明有文件要上传
                    const data=new FormData()
                    //file: file类型
                    data.append('file',files[0])
                    try{
                        alert("上传成功")
                        await uploadExcel(data)
                        //成功
                        this.$emit('uploadSuccess') // 通知父组件 我上传成功
                        this.$emit('update:showExcelDialog', false) // 关闭弹层
                    }catch(error){
                        alert('出现异常')
                    }finally{
                        //清空文件的选择
                        this.$refs['excel-upload-input'].value = ''
                    }
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .upload-excel {
      display: flex;
      justify-content: center;
      margin: 20px;
      width: 360px;
      height: 180px;
      align-items: center;
      color: #697086;
      .excel-upload-input {
        display: none;
        z-index: -9999;
      }
      .btn-upload,
      .drop {
        border: 1px dashed #dcdfe6;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 160px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .drop {
        line-height: 40px;
        color: #bbb;
        i {
          font-size: 60px;
          display: block;
          color: #c0c4cc;
        }
      }
    }
</style>