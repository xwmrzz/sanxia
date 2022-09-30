<template>
  <div class="nav-menu">
    <el-scrollbar style="height: 100%">
      <el-menu
        :default-active="currentRoute"
        mode="vertical"
        background-color="#434343"
        text-color="#ffffff"
        :collapse="isCollapse"
        :style="{width: (isCollapse ? '60px':'200px')}"
        :collapse-transition="false"
        router
      >
        <template v-for="route in routes">
          <Menu v-if="route.level==1" :key="route.path" :item="route"/>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import Menu from './components/Menu'
import { mapState } from 'vuex'

export default {
  name: 'NavMenu',
  components: {
    Menu,
  },
  computed: {
    ...mapState({
      isCollapse: state => state.tab.isCollapse
    }),
    routes() {
      return this.$router.options.routes
    },
    currentRoute() {
      return this.$route.path
    },
  },
}
</script>

<style>
.nav-menu {
  height: 100vh;
}

.el-menu-item,
.el-submenu__title {
  overflow: hidden;
}

.el-menu-item .iconfont,
.el-submenu__title .iconfont {
  margin-right: 5px;
}

.el-scrollbar__wrap {
  overflow-x: hidden;
}

.el-menu--collapse {
  width: 200px;
}

.el-menu--collapse .el-menu-item,
.el-menu--collapse .el-submenu__title {
  text-align: center;
}

.el-menu--collapse .el-submenu__icon-arrow,
.el-menu--collapse span {
  display: none;
}


</style>
