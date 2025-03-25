<template>
  <div class="login-container">
    <div class="logo" />
    <div class="form">
      <h1>登录</h1>
      <el-card shadow="never" class="login-card">
        <!--登录表单-->
        <!-- 注册登录表单组件,引用名为"form" -->
        <el-form ref="form" :model="loginForm" :rules="loginRules">
          <el-form-item prop="mobile">
            <!-- v-model类似java中的getter/setter方法 -->
            <el-input v-model="loginForm.mobile" placeholder="请输入手机号"/>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" show-password placeholder="请输入密码"/>
          </el-form-item>
          <el-form-item prop="isAgree">
            <el-checkbox v-model="loginForm.isAgree">
              用户平台使用协议
            </el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button @click="login" sytle="350" type="primary">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
import request from '@/utils/request'
export default {
  name : "Login",
  //类似java中的POJO类, 比如LoginForm
  data(){
    return {
      loginForm: {
        mobile: process.env.NODE_ENV==="development"? '13800000002':'',
        password: process.env.NODE_ENV==="development"? '123456':'',
        isAgree: process.env.NODE_ENV==="development" ? true : false
      },
      //这是表单的验证机制,类似springboot中的@NotNull,@Pattern,@Valid
      loginRules: {
        mobile: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        },
        {
          pattern: /^1[3-9]\d{9}$/,
          message: "手机号格式错误",
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        },{
          min:5,
          max:16,
          message: '密码长度5-16位之间',
          trigger: 'blur'
        }],
        //required只能检测null,undefined
        //这里写一个自定义校验属性
        isAgree: [{
          /*
          @Param:rule校验规则
          value:校验的值
          callback回调函数 - 通知校验结果的方法 ,成功返回回调接口,失败返回错误信息
          */
          validator:(rule,value,callback)=>{
            value ? callback() : callback(new Error("您必须勾选用户平台使用协议"))
          }
        }]
      }
    }
  },
  created(){
    this.$store.dispatch('user/getUserInfo')
  },
  methods: {
    login(){
      console.log('@@@',process.env.NODE_ENV);
      alert(process.env.NODE_ENV)
      //validate类似Elements-UI内部的方法
      this.$refs.form.validate(async(isOK)=>{
        if(isOK){
          //user模块名称(namespaces的名称),login是action
          await this.$store.dispatch('user/login',this.loginForm)
          //Vuex中的action 返回的是promise
          //跳转主页
          this.$router.push('/')
        }
      })
    }
  }
}
</script>
<style lang="scss">
.login-container {
  display: flex;
  align-items: stretch;
  height: 100vh;
  .logo {
    flex: 3;
    background: rgba(38, 72, 176) url(../../assets/common/login_back.png)
      no-repeat center / cover;
    border-top-right-radius: 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding: 0 100px;
    .icon {
      background: url(../../assets/common/logo.png) no-repeat 70px center /
        contain;
      width: 300px;
      height: 50px;
      margin-bottom: 50px;
    }
    p {
      color: #fff;
      font-size: 18px;
      margin-top: 20px;
      width: 300px;
      text-align: center;
    }
  }
  .form {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 176px;
    .el-card {
      border: none;
      padding: 0;
    }
    h1 {
      padding-left: 20px;
      font-size: 24px;
    }
    .el-input {
      width: 350px;
      height: 44px;
      .el-input__inner {
        background: #f4f5fb;
      }
    }
    .el-checkbox {
      color:#606266;
    }
  }
}
</style>
