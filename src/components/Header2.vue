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
    <el-badge :is-dot="dot" class="item" >
      <el-button class="messagebutton" @click="showMessage" type="primary" icon="el-icon-message" circle></el-button>
    </el-badge>
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

    <el-dialog title="短信发送状态" width="70%" :visible.sync="messageWindow">
      <el-table :data="messageData" id="messageTable" height="380px">
        <el-table-column
          prop="send_time"
          label="发送时间"
          class="From"
          min-width="65"
        >
        </el-table-column>
        <el-table-column
          prop="send_state"
          label="发送状态"
          class="From"
          min-width="55"
        >
        </el-table-column>

      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 30]"
        :current-page="queryInfo.pageNum"
        :page-size="queryInfo.pageSize"
        :total="total">
      </el-pagination>
    </el-dialog>
  </header>

</template>

<script>
import Breadcrumb from '@/components/Breadcrumb/index'
import {GetList} from '@/api/Message/Message'
export default {
  name: "Header",
  data(){
    return{
      breadCrumbList:[],
      userImg:require("@/Picture/HeadPortrait.jpeg"),
      dot:this.$store.state.dot,
      messageWindow:false,
      queryInfo: {
        query:'',
        // 当前每页显示多少条数据
        pageSize: 10,
        // 当前的页数
        pageNum: 1,
      },
      total:0,
      messageData:[],
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
  watch: {
    "$store.state.dot":{
      handler:function(nl,ol){
        this.dot = nl;
      }
    }
  },
  methods:{
    handleSizeChange(newSize) {
      this.queryInfo.pageSize =newSize
      GetList({
        pageNum: this.queryInfo.pageNum,
        pageSize: this.queryInfo.pageSize,
      }).then(res => {
        console.log(res)
        // const {data} = res
        // const { list, total } = data
        if(res.status == 200){
          this.messageData = res.data.records
          this.total = res.data.total
        }
        if(res.status == 400){
          this.$message.error('查询失败！');
        }

      })
    },
    handleCurrentChange(val) {

      this.queryInfo.pageNum = val
      GetList({
        pageNum: this.queryInfo.pageNum,
        pageSize: this.queryInfo.pageSize,
      }).then(res => {
        console.log(res)
        // const {data} = res
        // const { list, total } = data
        if(res.status == 200){
          this.messageData = res.data.records
          this.total = res.data.total
        }
        if(res.status == 400){
          this.$message.error('查询失败！');
        }

      })
      console.log(`当前页: ${val}`);
    },
    showMessage(){
      this.$store.dispatch('changeDot',false);
      this.dot = this.$store.state.dot;
      this.messageWindow = true;
      GetList({
        pageNum: this.queryInfo.pageNum,
        pageSize: this.queryInfo.pageSize,
      }).then(res => {
        console.log(res)
        // const {data} = res
        // const { list, total } = data
        if(res.status == 200){
          this.messageData = res.data.records
          this.total = res.data.total
        }
        if(res.status == 400){
          this.$message.error('查询失败！');
        }

      })
    },
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
.item {
  margin-top: -20px;
  margin-right: -800px;
}
.messagebutton {
  margin-top: -10px;
  position: absolute;
}
</style>
