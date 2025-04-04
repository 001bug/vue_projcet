<template>
    <div class="dashboard-container">
      <div class="app-container">
        <div class="edit-form">
          <el-form ref="userForm" label-width="220px">
            <!-- 姓名 部门 -->
            <el-row>
              <el-col :span="12">
                <el-form-item label="姓名" prop="username">
                  <el-input v-model="userInfo.username" size="mini" class="inputW" />
                </el-form-item>
              </el-col>
  
            </el-row>
            <!-- 工号 入职时间 -->
            <el-row>
              <el-col :span="12">
                <el-form-item label="工号" prop="workNumber">
                  <!-- diabled size="mini" 表示这个选择框不能被修改 -->
                  <el-input v-model="userInfo.workNumber" disabled size="mini" class="inputW" />
                </el-form-item>
              </el-col>
            </el-row>
            <!--手机 聘用形式  -->
            <el-row>
              <el-col :span="12">
                <el-form-item label="手机" prop="mobile">
                  <el-input
                    v-model="userInfo.mobile"
                    :disabled="!!$route.params.id"
                    size="mini"
                    class="inputW"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="部门" prop="departmentId">
                  <!-- 放置及联部门组件 -->
                   <select-tree v-model = "userInfo.departmentId" class="inputW"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="聘用形式" prop="formOfEmployment">
                  <el-select v-model="userInfo.formOfEmployment" size="mini" class="inputW">
                    <el-option label="正式" :value="1" />
                    <el-option label="非正式" :value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="入职时间" prop="timeOfEntry">
                  <el-date-picker
                    size="mini"
                    type="date"
                    value-format="yyyy-MM-dd"
                    class="inputW"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="转正时间">
                  <el-date-picker
                    v-model="userInfo.correctionTime"
                    size="mini"
                    type="date"
                    class="inputW"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 员工照片 -->
            <el-row>
              <el-col :span="12">
                <el-form-item label="员工头像">
                  <image-upload v-model="userInfo.staffPhoto"/>
                  <!-- 放置上传图片 -->
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 保存个人信息 -->
            <el-row type="flex">
              <el-col :span="12" style="margin-left:220px">
                <el-button size="mini" type="primary" @click="saveData">保存更新</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
  
      </div>
    </div>
  </template>
  
  <script>
  import SelectTree from './components/select-tree.vue';
  import ImageUpload from './components/image-upload.vue'
  import {addEmployee,getEmployeeDetail} from '@/api/employee'
  export default {
    components: {SelectTree,ImageUpload},
    data(){
      return {
        userInfo:{
          username: '',
          mobile: '',
          workNumber: '',
          formOfEmployment: null, // 聘用形式
          departmentId: null, // 部门id
          timeOfEntry: '', // 入职时间
          correctionTime: '', // 转正时间
          staffPhoto: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALcAwQMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAEAAECAwUGB//EAEQQAAEDAgIGBwYDBQcEAwAAAAEAAgMEERIhBRMxQVFhBiJxgZGh8DJCUrHB0RQj4QdTYoLxFTNykpOy0hZVoqNDVGX/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQIDBAX/xAAhEQEBAAMAAwADAAMAAAAAAAAAAQIREgMhMRMiQQQyUf/aAAwDAQACEQMRAD8AGwKQjV4YpBi6nnhxGpBiJaxSEaewHDE+rRAjUxGhFCiNSEaKEakI0bIIGKQYiTEnEaYD6tOGIkRpxGgg4jUtWiBGpBiE0Nq0+BEiNPq0ALq0tWisCWBACatMY0XgTFiADMaiWIwsUDGg4DLFEsRhjUDGgwuBJE6tJAREacRK8MVrWrNqGESkGIoMU9UjZBhGpapECJTaxGxoKI1IMRYjS1KNjkMI0tWihClqnJ7LkOI1IRq8MUg1Gy5UCNPq0RhU8GSNnyF1aqmkgp4zJPIxjL2xONh+qI0hPHRU7p5Dk3Jrb2udwC4HSNZPW1GsmkuNrW3yGV8h4I2vDxdtmq6SwtDhTwOk3B7ur5d6C/6nmMzCIGtZsLcVyfLJYpHtDcBY9pzTAYXEcwh0zw4R1FB0ihmk1dRFq7XAN1ux4JY2yMdiadi88afzzle4DvXreuk6JVTm1EtDIbtzLORH6fJG2fk8M1uOgMaiY0Xq02rT25dAjGomNHGJRMaNjQLVpIvVpI2NKBGpiNGCNSESz235CtYrGhXiJTESVpzFU1rTkpiFWCJWNYp2rlTqU+qRAYpiNGz5CiNSwonVJjEjocBzGomJFapNgR0XAUstmnGeSK1abVI6HDk+mMoMkEI9hoLj23+3zXIS9WRzXbRkewhdV0tzr3Ae7Hf6LmqkAuxbcIAPP1mqjpxx1AmLFnxydyPoJgbuHbf15p2C/VdscAe/1fxSN7Eb259/r5KzJ3Vex/K31Wvow6rSUEzdz239d6zMOMEDfYj5fXyWhRAvsBtLG/b6JZX0NbeiFliQ3YEgxWUhE9LFKNj2Bw7fVwrxGp247iEMaiY0aWKpzUdFyE1aSIwpkdDkhGpiNECNTEajbTkOI1IRogRqYjS2cgcR8FaImCO+K7y72bZWVojUwxLatBxGpCNXhikGo2elIYpCNWhilgRs5Ar4khCi8Kpqammo246maKIbeuQL9inauVJDCXtxtu0AuGLNoN9vgfBNCI34TFJHIw+803HkuF6WaYpjWyz07pC6SAQmN46sgDrhxba+V8r5d6ydD1dZperioTLenY/WyOJxEgDO5JyvkMueSr1Jt0T/ABsrjsd0mma6qmexzXmWRwbyY0kfcrm4nh5lcdmQ+f2W30hhczE5o67gABvA3eWazaemMcb2n2g0E+arHKFcdQHga3D8QyHruSecEgcrdX+XH2FVyAYcR2YrLTadJsHWaOBI7j/VHUPVc0fwnyzQMYL4D8Qz9ePmtOmZjfG4c/MBTlfQn16Fon+5dH7oOJnY7P8A3YvBHhqC0QLwU7x78NndosR/uctLCstscsfaksVEjLI4NSMaOi4ZySO1TUkdDg4YpBqpkrYIdJRaPOLXSsc9thcWHNElzBk7ep2vkgxSDEww+65WtRscohikGK1oyUgxGxypDE+BXhifAgaUhifArsCfCg9KMK830/K+l01pBtc1hfK1zYZZBi1YIOFwvstden4VRUUVPORr4IpcGYL4w7DzCVbeDyTxZbs28SrNC18Wj2aQrG2gmkwslJBDnZ2PxYTY7VsdBoqejdXVFfPHFGxjQ6R7rCxdnbts0c12P7Rvw46NvNW4hwmbqmD3nZ5eGI8rLx6omfKAy9mC2EWtZaTHuNfzbmo73SukdGVVbO6OUzMsHYmN6o4euGaypqyJ0zHCB0LZGhuIuDgT3cx5rD0HVCOZ8Exu2VpDc7WdwVtIS6lFJKOvjc1gJ+HfyPrcnPHIyud+LHM6jmk2wP28jZQeGu1jQLXF7cFbHKybC5gu112O87E+t54KErC2cHe5uE9vr5rREU09g4X2XLfXl4LX0ew6uInaJA0nle9/MLIideSRp2tIstrRPWdLG3bYStPMbVOfxUd/0dOLRlPf/wCOQt7jf/l5LcwNXO9FCJaWaJu3F9St8yOw+xtzXPKnKaPqc0jGgq3S0VHUUsM0cgNTJgZbZe10aKmMp7K42fUdWkrNa1JGy0wC3WdOYm/udHnf8T/0XRaphyIXP6N/M6baVP7mmij8bldKAptXpQaYe5lySFO5EhOCiBS2NzVY0KwFSCZaV2T2VlkkDSKVlJPZqY0hhSLVYGp8KBp5j+16otJo2nb7NnyntyA+q80mNs+K9G/bCy2kKCT4qdw8HfqvN3bFv4/9VSKytCirWmqhfO7Nt2mRu0hwtnzHH+qzymG1UvTUieYal7ZGguvhkaNgPEcjkVpuaXRC3tcfkVhwyiZgY7qzNGGN/wATfhP0K2Iy7UMLeqWYTbhtBHySZ2aoWRpZXX91zLeH9FraLzqabP2gYie0ZeuaBmAkdDN/FY9mxFaNdglLNrmuu3t2g+VlOXw47bom9xqJw3ItfjtxabfIZ+K7ENwAYswMwVwmgJhTaZkcPZD2f5ScPysV22lxNDoWtfA7BLHTyGN3AhpsfJc0VlGL0pa0VWg3f/osb4tctt9MXXLMK5/pax34LQs5GJw0jTl27aF0LzLAMbQ5wHuovyFpV+Gk+FJL+0n/AP15ElO4OWP0bdreknSGXE42lYy24WFsl0wXJdCH45NNVH7yvf6811IkUZZ6rSxcCpKkSKQlR+RNxq0BLCoCVqcTNVdxOqswJ9W1V69qkKiNX1imzI4iUwxREzU+uanMsS1klgalg47FEStv7SfWN4qpliWq4D9r9G1+jKKrHtxzGPnhIv8ANvmvIZB1ivWv2vVbY6bRkIzEj5CR3AA/+S8lqOq8jh6+q2w+NsZ+sVlMkkqMlsaPqNbSSRu9pjcuew/QrHV1HKY5wT7DuqewoKxsyewGjjfxv+ivDrVAe33s++90NHctbjPInidn0V9y0ttkcVr8doU5CR0tO4Ged49n8GHeA+y9HbI6r6NCZ/tTUeI9rmX+q8yY+OKIVMv9zLTYX8szceHrJesT4fwUjWDqiMgeC55Zuq8vyOa6SP1nRPRU/wAM1LJ5hdZga4LhtNy3/ZpQy/DDTHwwruIn4o2niAUpZWNlhalvwpKeNMr/AETuvDtHaRZRUzWGrfE5xxENkLe3wWlQ6Yqahzyysq8MQxSlkhkwNG0nguRlpjqzUEAhrgACL33/AFWpQzQtLWVMrIoZTEJgxmZaRcnwyWmeEk21x93Tbm6QTU7MRr6h+ezH9Lqqn6YVkry2Oeawzu5wNvJZ9ZHQQUU1FoR4qo5Xtc6SSIBwFtx3b1mUVNPFid1dlvbGanDDDKe4M7cb6dzQ9IK2eLWa2SQuuWnEG5DLZh5FJ+ndJRSauatAk34bG3kueopp6ZkbHwNbhaWDMZ7efNSr4mRQaxjG4o5Dc4ScQyPFRfHP5BPJv1XRt07XM9qtc4DIuwA28lc3pHXOp2v1kGE5YsOY9WK4r+13xU8cLIqdjnOJ1oFnW8dmWXakNLVr9CzmeZrm65sYxtcSw5nqm9hv2pXxz/jT1HdM6Q6QvYSQODRnYZqw9KJIWg1L6YcLut9VwehpDJU3mk1kUkLtcXxXbG21g/aLEHfffsVVI2hFXHbWS4H3189ix1rWLo7Hq/zZg7kXxTZWx3E3TijbcdR7htwNOfegajp8Q7DT0INxYFzyD8lzdZoOojx1D5afDYSPEB6keIm2y4HCyHlpquslggaymY6JmqxxENDrbyfePNH4cDnkR6XaaqdMfhH1IjaWF7Q2Ntt7Tncrn5HY24ve2O9ePitPT7dQyjpjh1kLXa3CPfcbnPlkP5SsgZFdGM1NJ3skk7utmmVAkkkk4GvSvMsH8W7t/r80cyzmNdvGR5kWWZoo3EjeJv4LYe3VUetF9pOXZdZZ3+HjGjpXGej4ZBtsHC+wiwJHdYHLLNdAP2gxsgbAKRxDW6slzhmbWXFaXrcP4UwvcGNOB5A34g4Zdh2cgn0PUgaQZU3kET8bZdUW4rEbsWzd3LKePcXnZ/W5U9IYajoXDodrLzsY1txezQ11wfBbNR05p3aLbBRySQ1TGNGN7RbIC+1cBgfFLK8i8ersLG+f27FCFj5Kpr4JWQkDGHPJGYtsTvgmkyy11/8A1dpX/uZ/02p1kf2pp3/v8H+ZMo/FirUZ2mKOOiFWxlXC90UgAYHjE69jdo4DPyWbLM4Mj/Pa8YA84L2YdgBy2iypqWuNQHZ/yssoxslkD3MGIMscIsMuQXXpjNT416Js5hxMjneXDrFrbg+SNoWyuja2SnnA3l7Dl5ISjra6ggjidHA1js261llsaM0pPNUNFRFHqw05QjMndtPalZ6ZXP2jWVlPJTCnbA5k7ZMWsc7JzbCwA7fms5umYqh0z6nR801MGEEseWgOtkS4buS6apipKyN1PMCw4RkGXdblZF6LjpqDR+wmGFps3iBy4781Mm/Sbnr3p5tK+MzA04IiADmNls7MDMZWyv2bkXQwvrCTVDVUOsD5XRgNvbaGDYTY8LcVpVo0DUxvqIqKSleX4sLKi4twItYd3O2WayNI1xlAYwYGNFmsaLADhbvT1/G8tvtfVVUN2U1GHiJrsnON3Ecz3fNWRySU78cT3teBYOacOR3ZLEY9+IYRc3yC2ntkbCwvjdG62TXCx80/gsbGj9OalrY6tgqIQScEgxAE9xt4FEaQqwIDUMhpW0YN8ccIa953MIzseO4rl2uNzi9evotCkrNUS2UNcxzbPDxkRzS5/qWFWTGaZ73Euc44jxVU0eqdbsOSN0nT08MxdSzNka84sGd4899/68eYILrlWuI3STkJklQkhtSSQB+iXWeQM7/a3zW82bWaMqoW3Ordl4ZHllfvXMUcphlDj7BBDuxHNrJIJXxu6zX5g8QTl9/FRnjtUBSzl92u4g8jbL7eCa6Z1tc2/WYc2uG23r5JPhexpf7pO7arnxGX0iP4lG+aQjc4XDXWTe11cKfSeafH/EmT4ZPgd4JJ7HsQaoEkGJrgbXVzjTNjxe1lkLEE96LjomxtuGix23upfhIHNLSWtvlvWX5D5ZsNbgPWiY6Pc0m6u1xfmMLAesGtj+q0DFCy35eJwFhl91DWvaerTC3Oyc8hXBRTy5HPG63VGE7VqaMr52wy0tQ2TUyAguDfZvvHrhwQgE5za2JoO5KScxscQ5ji0ElrbfdLvdK4TQWp0VWsrGQiFmGR/ULXjACd/IfZRm0PUwzuilt1HW6puPFUO0lWucT+Je3gGHAB4Imj05I12GtvUQu2u2SD+YWPiVV2c3pOCkFNUNcxkgeyx1gdcjsyWhPrqiJjJIgBGyzXAuLiNtzcdvini0h0da38yOreDnqxK/b35Kqv0pop1KafRT6mkac/zBe7tl8Qcd3JT+xTVvtnuF3E/Ch535G3D1dElszWN1zHNeRe5GTha4cDzH1QEhzk/wANvr91cPSkn3RsOfeopJIXCSSSQCSSSPPIc0Cn3KZdrYmtedl8JP1TCN+F7sDyy2bsJIBvsRkOj6huF8kD3ACwDDfCd1wjcIVoqmiiLJqr+8Ny1habM52Wv+Ij91mIf4UDNLGTEI5SJMxYvPWPC1sv0Upqd78LmynF7zb2At27Se1Y3Hf9Pa97onZ6tneLKrWhpsyAs7AM0PHFKHucbWdsc6QDuz+ik5xa1oc14dnisch5FHFHS78U74XeSSF1sXxv8D/xSRxR0tFJXvthp6kgi4tCbEeCpc6WNx1hwubk5rgb+C0xU0kFRSU5p4AXt/NdidZpzsL4rbLX5lZdRO8yyRNjDXh1sAIIB7c+e9Xyna+N7sJe6+Qu7qnfwTiqgkaSXYHO9m5AHeb2QDZ6i5bG0Y/4W3UXhzLuljMbrl2037exPiDa6Soa5pzLi47L3BHrgFU6R1i1724TlhxA/JV47guxOc85nPK3gma/MNwbM7N2Ki2FkDWuOH9VC6NJeSXC1xnct7Nyotcna923IbEz2pSHgrwwNzezluCn+Xb8uNoO8h33sgbWyVsz6amgc78ulbg7i79B4KmQtPWbvT2wNDXOa92RzbmDbjZVxtcSG8bpQVT7xSUnizi3gooVCSG1JMRcWQK0NHUsVRC90pcXNI6g4HZ9VowwwxZNjaByGfiszRUmGpMfuSNy7RmPqtMdUkKLfao0DCJ9H1MJ2GO4y4WP0WZ+NlY9r2wyGxO/rEcif1WpQuxO1fxCy5tjwWASv6oO0Nz3cM/XNLGfU5N5ul6d7Lvkcb7n2FjuuLO8fNTqKmklhD3VMbjLwLmAeRHkFhEFzQ7Hk4D3XWPZfb2qtwbfC2ncL5e0Myq5S3ZmxOY+SKqIkLfbbhc3Pd4BUfhJ4XYpZnvjNw4sab2PZ3LNaTECyQQFhysS3bnnls7+KlES0lrbOw87gHuHYnoh2Jnx/wDqd9klnWn/AHr/APVKdGqQp1VHbWT0cIc8kAZZ7ODcvHeUPjZPUWEUUMZORcXFosLHieaZJUIZ2pEzmsfJIA0YThwXy4XySLKiJoqCSxkl7ODrnbn8k6SDV4MUOss6zciS69zc2+Xl2JnXfa4Lg3JpLs0kkA5bgcGusDa5Fr7VY2MvaLOA2ZgZnkkkgKZsEUha0EG5b1tt9+zsRUcLmP68QeWbS12eXvZ9vHuSSSoWvEZeIm2xWvwvs5IdpmMYezVMacm2aBfD2DtSSQYaemexpllcOsd19uX1KGISSQDJJJIVEon6uVj/AIXA+C36gYJXBOkpv1eK2lf1m9oWNO8tqpWkBzQ93WO0ZpJIx+p8nxZTTzuDzZsgtm47ee3vTxMbUDJrS6+RLcgPHgmSVfxmi2MQvaA4l17W3jh8uKk57o/z7Yvd3DK3rckkgF+Ki/cN8vskkkqD/9k='
        },
        rules:{
          username: [{ required: true, message: '请输入姓名', trigger: 'blur' }, {
            min: 1, max: 4, message: '姓名为1-4位'
          }],
          mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }, {
            //   pattern 正则表达式
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }],
          formOfEmployment: [{ required: true, message: '请选择聘用形式', trigger: 'blur' }],
          departmentId: [{ required: true, message: '请选择部门', trigger: 'blur' }],
          timeOfEntry: [{ required: true, message: '请选择入职时间', trigger: 'blur' }],
          correctionTime: [{required:true,message:'请选择转正时间',trigger:'blur'},{
            validator:(rule,value,timeOfEntry)=>{
              if (this.userInfo.timeOfEntry) {
                if (new Date(this.userInfo.timeOfEntry) > new Date(value)) {
                  callback(new Error('转正时间不能小于入职时间'))
                  return
                }
              }
              callback()
            }
          }]
        }
      }
    },
    created(){
      //this.$route.params.id&&this.getEmployeeDetail() //如果有id,就获取一次数据
    },
    methods:{
      saveData(){
        //校验通过成功的写法,类似java的lambada表达式
        this.$refs.userForm.validate(async isOK=>{
          if(isOK){
            if (this.$route.params.id) {
            // 编辑模式
            await updateEmployee(this.userInfo)
            this.$message.success('更新员工成功')
            } else {
              // 新增模式
              // 校验通过
              await addEmployee(this.userInfo)
              this.$message.success('新增员工成功')
            }
            this.$router.push('/employee')
          }
        })
      },
      async getEmployeeDetail(){
        this.userInfo=await getEmployeeDetail(this.$route.params.id)
      }
    }
  }
  </script>
  
  <style scoped lang="scss">
      .edit-form {
        background: #fff;
        padding: 20px;
        .inputW {
          width: 380px
        }
      }
  
  </style>