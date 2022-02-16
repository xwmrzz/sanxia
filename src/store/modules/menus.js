import Vue from 'vue'
import Vuex from 'vuex'
import th from "element-ui/src/locale/lang/th";

Vue.use(Vuex)

const getTabs = () => {
  let tabs = []
  if (localStorage.getItem('test-tabs')) tabs = JSON.parse(localStorage.getItem('test-tabs'))
  return tabs
}

export default {
  state: {
    editableTabsValue: 'Index',
    editableTabs: [{
      title: '首页',
      name: 'Index',
    }],
    tabs: getTabs()
  },
  getters: {
    tabs: state => {
      return state.tabs
    }
  },
  mutations: {
    addTab(state, tab) {
      state.tabs.push(tab)
      localStorage.setItem('test-tabs', JSON.stringify(state.tabs))
    },
    deleteTab(state, delIndex) {
      state.tabs.splice(delIndex, 1)
      localStorage.setItem('test-tabs', JSON.stringify(state.tabs))
    }
  },
  actions: {
    addTab({commit}, tab) {
      commit('addTab', tab)
    },
    async deleteTab({commit}, tab) {
      const tabs = getTabs()

      let ind = null
      tabs.some((i, index) => {
        if (i.path === tab) {
          ind = index
          return true
        }
      })

      commit('deleteTab', ind)
      return Promise.resolve(ind)
    }
  }
}
