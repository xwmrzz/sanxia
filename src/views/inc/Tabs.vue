<template>
  <el-tabs
    v-model="currenTab"
    type="card"
    closable
    @tab-click="clickTab"
    @tab-remove="removeTab">
    <el-tab-pane
      v-for="item in tabs"
      :key="item.title"
      :label="item.title"
      :name="item.path"
    />
  </el-tabs>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: "Tabs",
  data() {
    return {
      currenTab: null
    }
  },
  computed: {
    ...mapGetters({
      tabs: 'tabs'
    })
  },
  watch: {
    $route: {
      handler(newVal, oldVal) {
        const {name, meta, path} = newVal
        const {title} = meta
        const isNotExits = this.tabs.every(i => i.path !== path)

        if (isNotExits) {
          this.addTab({
            name,
            path,
            title
          })
        }

        this.currenTab = newVal.path
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions({
      addTab: 'addTab',
      deleteTab: 'deleteTab'
    }),
    clickTab(tab) {
      const path = tab.name
      this.$router.push({path: path, replace: true})
    },
    async removeTab(targetTab) {

      const ind = await this.deleteTab(targetTab)

      const len = this.tabs.length
      if (ind === len && len > 0) {
        await this.$router.push({path: this.tabs[ind - 1].path})
      } else if (ind === 0 && len > 0) {
        await this.$router.push({path: this.tabs[0].path})
      } else if (len > 0) {
        await this.$router.push({path: this.tabs[len - 1].path})
      }
    }
  }
}
</script>

<style scoped>
/*.el-tabs--card>.el-tabs__header .el-tabs__nav{*/
/*  border:0 ;*/
/*  background-color: #42b983;*/
/*}*/
</style>
