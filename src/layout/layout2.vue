<template>
  <el-container>
    <el-aside width="auto" style="height: 100%; background-color: #434343">
      <NavMenu2/>
    </el-aside>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main style="padding: 0px">
        <!-- <Tabs style="height: 42px;"></Tabs> -->
        <router-view style="height: 100%;"/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import NavMenu2 from '@/components/NavMenu/NavMenu2'
import Header from "@/components/Header";
import Tabs from "@/views/inc/Tabs"
export default {

  // 添加背景色 margin:0;padding:0是为了解决vue四周有白边的问题
  beforeRouteEnter(to, from, next) {
    document.querySelector('body').setAttribute('style', 'margin:0;padding:0')
    next()
  },
  // 去除背景色
  beforeRouteLeave(to, from, next) {
    document.querySelector('body').setAttribute('style', '')
    next()
  },
  name: "Layout2",
  components: {
    NavMenu2,
    Header,
    Tabs
  }
}
</script>

<style scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;

}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
