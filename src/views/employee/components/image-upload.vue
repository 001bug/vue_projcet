<template>
    <el-upload
        class="avatar-uploader"
        action=""
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"    
    >
    <img v-if="value" :src="value" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"/>
    </el-upload>
</template>

<script>
export default{
    props:{
        value:{
            type: String,
            default: ''
        }
    },
    methods:{
        //检查函数 判断文件的类型还有大小 return  true(继续上传)/false(停止上传)
        //这个个触发是在标签<el-upload/>中触发的
        beforeAvatarUpload(file){
            const isJPG=['image/jpeg','image/png','image/gif','image/bmp'].includes(file.type)
            const isLt2M = file.size/1024/1024<5
            if(!isJPG){
                this.$message.error("上传头像图片只能是JPG PNG GIF BMP格式")
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 5MB!')
            }
            return isJPG&&isLt2M
        }
    }
}
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>