import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/fonts/iconfont.css'
import Element from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import VueParticles from 'vue-particles'
import axios from './axios'
import dataV from '@jiaminghi/data-view'
import {Dropdown,DropdownItem,DropdownMenu} from "element-ui";
import moment from 'moment'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  loading:require('./Picture/jiazai.gif'),//加载中的图片
  attempt: 5//尝试计数
})
Vue.use(Viewer)
Viewer.setDefaults({
  Options: {
    'inline': true,
    'button': true,
    'navbar': true,
    'title': true,
    'toolbar': true,
    'tooltip': true,
    'movable': true,
    'zoomable': true,
    'rotatable': true,
    'scalable': true,
    'transition': true,
    'fullscreen': true,
    'keyboard': true,
    'url': 'data-source'
  }
})
Vue.prototype.$echarts=window.echarts
Vue.prototype.$moment = moment
Vue.config.productionTip=false
Vue.use(dataV)
Vue.prototype.$axios =axios
Vue.config.productionTip = false
Vue.use(VueParticles)
Vue.use(Element)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
require("./mock.js")

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
