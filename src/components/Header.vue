<template>
  <header>
    <div class="l-content">
    <el-button plain icon="el-icon-menu" size="mini" @click="handleMenu"></el-button>
   <index></index>
      <el-breadcrumb separator="/" :replace="true">
        <el-breadcrumb-item
          v-for="item in breadCrumbList"
          :key="item.name"
          :to="{ path: item.path }"
        >
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
      <span class="el-dropdown-link">
        <img :src="userImg" class="user" />
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item><router-link :to="{path:'/'}">项目首页</router-link></el-dropdown-item>
        <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>

  </header>

</template>

<script>
import Breadcrumb from '@/components/Breadcrumb/index'

export default {
  name: "Header",
  data(){
    return{
      breadCrumbList:[],
      userImg:require("@/Picture/HeadPortrait.jpeg")
    };
  },
  watch: {
    $route: {
      handler(newVal, oldVal) {
        this.updateBreadcrumbList()
      },
      immediate: true
    }
  },
  methods:{
    updateBreadcrumbList() {
      const routes = this.$router.options.routes
      const base = this.$router.options.base
      let matched = this.$route.matched.filter((item) => item.name)
      let baseRoute = {}

      // 根据router提供的base找到根路由，默认为 /
      routes.find((item) => {
        if (item.path === base) {
          return (baseRoute = item)
        }
      })

      // 比对根路由，得出根路径的title等数据
      const first = matched[0]
      if (first && first.path !== base) {
        matched = [
          {
            path: '/',
            meta: {
              title:
                baseRoute && baseRoute.meta ? baseRoute.meta.title : 'Root',
            },
          },
        ].concat(matched)
        this.breadCrumbList = matched
      }
    },
    handleMenu(){
      this.$store.commit('collapseMenu');
    },

    logout(){
      this.$axios.post("/logout").then(res=>{
        localStorage.clear()
        sessionStorage.clear()
       this.$router.push("/login")
      })
    }
  }
}
</script>

<style scoped>
header{
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
}
.l-content{
  display: flex;
  align-items: center;
}
.l-content,el-button{
  margin-right: 20px;
}
.user{
  width:40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown{
  font-size: 80px;
}
.el-main{
  padding: 0;
}
::v-deep .el-breadcrumb__separator {
  color: #000;
}
</style>
