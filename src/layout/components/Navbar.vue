<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- 右上角头像和用户名称 -->
          <img v-if="avatar" :src="avatar" class="user-avatar">
          <span v-else class="username">{{ name?.charAt(0) }}</span>
          <!-- 用户名称 -->
          <span class="name">{{ name }}</span>
          <i class="el-icon-setting" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/001bug/vue_projcet">
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <!-- prevent阻止默认事件 -->
          <a target="_blank" @click.prevent="updatePassword()">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </a>
          <!-- native事件的修饰符 -->
           <!-- 注册组件的根元素的原生事件 -->
          <el-dropdown-item  @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 放置dialog -->
    <!-- sync修饰可以接受子组件传过来的事件和值 -->
     <el-dialog width="500px" title="修改密码" :visible.sync="showDialog">
        <el-form label-width="120px">
          <el-form-item label="旧密码">
            <el-input show-password size="small"/>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input show-password size="small"/>
          </el-form-item>
          <el-form-item label="重复密码">
            <el-input show-password size="small"/>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" type="primayr">确认修改</el-button>
            <el-button size="mini">取消</el-button>
          </el-form-item>
        </el-form>
     </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  data(){
    return {
      passForm:{
        oldPassword: '',//旧密码
        newPassword: '',//新密码
        confirmPasword: ''//确认密码
      },
      rules:{
        oldPassword:[{required:true,message:'旧密码不能为空',trigger:'blur'}],
        newPassword:[{required:true,message:'新密码不能为空',trigger:'blur'},{
          trigger:'blur',
          min:6,
          max:16,
          message:'新密码的长度为6-16'
        }],//新密码
        confirmPasword:[{required:true,message:'重复密码不能为空',trigger:'blur'},
          {
            trigger:'blur',
            /**
             * 自定义校验规则,这里为什么要用箭头函数
             * @param rule 规则
             * @param value 传入的参数,这里是重复密码
             * @param callback 必须调用的回调函数
             */
            validator:(rule,value,callback)=>{
              if(this.passForm.newPassword===value){
                callback()
              }else{
                callback(new Error('重复密码和新密码输入不一致'))
              }
            }
          }
        ]
      },
      showDialog: false
    }
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    // 引入头像和用户名
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    updatePassword(){
      this.showDialog=true
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        .name{
          margin-right: 10px;
          font-size: 16px;
          align-items: center;
        }
        .uesrname{
          width: 30px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          background-color: #04c9be;
          color: white;
          border-radius: 50%;
          margin-right: 4px;
        }
        .el-icon-setting{
          font-size: 20px;
        }
        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
