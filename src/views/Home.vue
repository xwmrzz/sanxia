<!--<template>-->
<!--  <el-container>-->
<!--&lt;!&ndash;    菜单栏&ndash;&gt;-->
<!--    <SideMenu></SideMenu>-->
<!--    <el-container>-->
<!--      <el-header>-->
<!--        <Header></Header>-->
<!--      </el-header>-->

<!--      <el-main style="padding: 0px">-->
<!--        <Tabs></Tabs>-->
<!--        <router-view></router-view>-->
<!--      </el-main>-->
<!--    </el-container>-->
<!--  </el-container>-->
<!--</template>-->

<!--<script>-->
<!--import SideMenu from "@/components/SideMenu/SideMenu";-->
<!--import Tabs from "@/views/inc/Tabs";-->
<!--import Header from '@/components/Header'-->
<!--export default {-->
<!--  name: "Home",-->
<!--  // 添加背景色 margin:0;padding:0是为了解决vue四周有白边的问题-->
<!--  beforeRouteEnter(to, from, next) {-->
<!--    document.querySelector('body').setAttribute('style', 'margin:0;padding:0')-->
<!--    next()-->
<!--  },-->
<!--  // 去除背景色-->
<!--  beforeRouteLeave(to, from, next) {-->

<!--    document.querySelector('body').setAttribute('style', '')-->
<!--    next()-->
<!--  },-->
<!--  components: {-->
<!--    SideMenu,-->
<!--    Tabs,-->
<!--    Header-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      isCollapsed: false,-->
<!--    }-->
<!--  },-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.el-container{-->
<!--  padding: 0;-->
<!--  margin: 0;-->
<!--  height: 100vh;-->
<!--}-->
<!--.header-avatar{-->
<!--  float: right;-->
<!--  width: 130px;-->
<!--  display: flex;-->
<!--  justify-content: space-around;-->
<!--  align-items: center;-->
<!--}-->
<!--.el-dropdown-link {-->
<!--  cursor: pointer;-->
<!--  color: #80b1eb;-->
<!--}-->

<!--.el-header{-->
<!--  /*background-image: url("../Picture/background2.jpg");*/-->
<!--}-->
<!--.el-header, .el-footer {-->
<!--  background-color: #fff;-->
<!--  color: #333;-->
<!--  text-align: center;-->
<!--  line-height: 60px;-->
<!--}-->

<!--.el-main {-->
<!--  background-color: #E9EEF3;-->
<!--  color: #333;-->
<!--  text-align: center;-->

<!--}-->

<!--body > .el-container {-->
<!--  margin-bottom: 40px;-->
<!--}-->

<!--.el-container:nth-child(5) .el-aside,-->
<!--.el-container:nth-child(6) .el-aside {-->
<!--  line-height: 260px;-->
<!--}-->

<!--.el-container:nth-child(7) .el-aside {-->
<!--  line-height: 320px;-->
<!--}-->

<!--a{-->
<!--  text-decoration: none;-->
<!--}-->
<!--</style>-->
