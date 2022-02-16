<template>
  <div class="login-container">
    <div class="background">
      <vue-particles
        color="random"
        :particleOpacity="0.7"
        :particlesNumber="100"
        shapeType="circle"
        :particleSize="4"
        linesColor="#e6e6e6"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      />
    </div>
    <h1 class="h1">山美水库监测预警系统</h1>
    <div class="login">
      <div>
        <input v-model="loginInfoVo.username" placeholder="请输入账号" id="account" />
        <div class="inline label account">
          <i class="iconfont icon-yonghu"></i>
        </div>
      </div>
      <div>
        <input v-model="loginInfoVo.password" type="password" placeholder="请输入密码" id="pwd" />
        <div class="inline label pwd">
          <i class="iconfont icon-mima"></i>
        </div>
      </div>
      <div>
        <el-checkbox label="记住我" class="rememberMe"></el-checkbox>
      </div>
      <button @click="login">登陆</button>
    </div>
  </div>
</template>

<script>
import { login, getUserInfo } from '@/api/user'
import { setToken } from "@/utils/token";


export default {
  beforeRouteEnter(to, from, next) {
    // 添加背景色 margin:0;padding:0是为了解决vue四周有白边的问题
    document.querySelector('body').setAttribute('style','margin:0;padding:0')
    next()
  },
  beforeRouteLeave(to, from, next) {
    // 去除背景色
    document.querySelector('body').setAttribute('style','')
    next()
  },

  name: "login",
  data () {
    return {
      loginInfoVo: { username: null, password: null },
      responseResult: [],
    }
  },
  methods: {
    login () {
      // 异步请求第二种
      // const { data } = await login({
      //    username: this.loginInfoVo.username,
      //    password: this.loginInfoVo.password
      //  })
      //  console.log(data)
      //  setToken(data)
      //  const res = await getUserInfo(data)
      //  console.log(res)
      // 异步操作第一种
      login({
        username: this.loginInfoVo.username,
        password: this.loginInfoVo.password
      }).then(res => {
        const { data } = res
        setToken(data)
        getUserInfo({
          token: data
        }).then(userRes => {
          console.log(userRes)
          const userInfo = userRes.data
          localStorage.setItem('userInfo', JSON.stringify(userInfo))
          this.$router.push({ path: '/' })
        })
        // this.loading=false
        // if (getToken()){
        //   this.$router.push({path:'/Home'})
        //   this.$notify({
        //     title: '登录成功',
        //     message: `你好，欢迎回来！`,
        //     type: 'success',
        //     duration: '5000',
        //     offset: 100
        //   })
        // }else {
        //   console.log('error submit!!')
        //   return false
        // }
        // console.log(res.data)
      }).catch(res => {
        console.log(res)
      })
    }
  },

  function(){
    document.querySelector("#account").addEventListener("focus",function(){
      document.querySelector(".account").setAttribute("style","background-color:#54c5d8")
    })
    document.querySelector("#account").addEventListener("blur",function(){
      document.querySelector(".account").setAttribute("style","background-color:#b6ecf3")
    })
    document.querySelector("#pwd").addEventListener("focus",function(){
      document.querySelector(".pwd").setAttribute("style","background-color:#54c5d8")
    })
    document.querySelector("#pwd").addEventListener("blur",function(){
      document.querySelector(".pwd").setAttribute("style","background-color:#b6ecf3")
    })
  }


}
</script>

<style scoped>
.login-container {
  position: relative;
  height: inherit;
  width: inherit;
}
.background{
  width:100%;
  height:100%; /**宽高100%是为了图片铺满屏幕 */
  background-image: url("../Picture/loginback.jpg");
  background-size: 100% 100%;
  margin: 0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}

/*#particles-js {*/
/*  position: absolute;*/
/*  width: 100%;*/
/*  height: 100%;*/
/*  min-height: 100%;*/
/*}*/

.login {
  height: 400px;
  width: 361px;
  position: relative;
  top: 0;
  left: 0;
  text-align: center;
  margin: 13vh auto;
}
.login h2{
  font-size: 40px;
  letter-spacing: 20px;

}
.label {
  height: 44px;
  width: 40px;
  background-color: #b6ecf3;
  position: relative;
  top: -44px;
  left: -153px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

button {
  border: none;
  width: 96%;
  height: 40px;
  background-color: #54c5d8;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

button:focus {
  border: none;
  outline: none

}
.inline {
  display: inline-block;
}

.inline>img {
  margin: 10px;
}

input {
  width: 80%;
  border: none;
  padding-left: 50px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #e1fdff;
  cursor: pointer;
}

input:focus {
  outline: none;
  border: 1px solid #54c5d8
}
h2{
  color: #54c5d8;
  text-align: center;
  font-size: 18px;
  padding-bottom: 20px;
}

.rememberMe {
  color: #fff;
  position: relative;
  top: -30px;
  left: -142px;
}
.iconfont{
  position: relative;
  top: 9px;
  background-color: #b6ecf3;
  border-radius:5px ;
  border-style: solid;
  border-color: #b6ecf3;
  display: block;
}
@import url("../assets/fonts/iconfont.css");

.h1 {
  font-size: 3.5em;
  color: #fff;
  letter-spacing: 3px;
  text-align: center;
  font-style: italic;
  font-family: 'Josefin Sans', sans-serif;
  margin: 8vh 0 0 0;
}

</style>
