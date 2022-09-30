import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/fonts/iconfont.css'
import './assets/fonts2/iconfont.css'
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
import { VueJsonp } from 'vue-jsonp'
import axios2 from 'axios'
import VueAppend from 'vue-append'
import $ from 'jquery'


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
Vue.prototype.$echarts=window.echarts//echarts全局引入
Vue.prototype.$moment = moment//时间、日期组件
Vue.config.productionTip=false//阻止启动生产消息，建议开发时设为true
Vue.use(dataV)//数据可视化组件，<dv->
Vue.prototype.$axios =axios
Vue.config.productionTip = false
Vue.use(VueParticles)//粒子背景插件，一般用于登陆页面
Vue.use(Element)
Vue.use(Dropdown)//下拉框组件
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(VueJsonp)
require("./mock.js")//随机生成数据模拟后端接口
Vue.prototype.$http = axios2
Vue.use(VueAppend)
window.jQuery = $
window.$ = $

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
