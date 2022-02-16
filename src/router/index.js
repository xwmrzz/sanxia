import Vue from 'vue'
import VueRouter from "vue-router";
import Layout from '@/layout'
import {getToken} from "@/utils/token";
import axios from "@/axios";

Vue.use(VueRouter)

export const constantRoutes = [
  {
    path: '/login',
    hidden: true,
    component: () => import('@/views/Login'),
    meta: {
      title: '登录',
      icon: 'text'
    },
  },
  {
    path: '/DigitalAnalogue',
    hidden: true,
    component: () => import('@/components/Model/DigitalAnalogue'),
  },
  {
    path: '/',
    component: Layout,
    name:"Index",
    meta: {
      title: '首页',
      icon: 'iconfont icon-shouye',
    },
    children: [
      {
        path: '/',
        component: () => import('@/views/index'),
        meta: {
          title: '首页',
          icon: 'iconfont icon-shouye',
        },
      }
    ]
  },

  {
    path: '/Displacement',
    component: Layout,
    meta: {
      title: '位移数据',
      icon: 'iconfont icon-duanmianweiyi',
    },
    redirect: '/Displacement/AnnualDisplacement',
    children: [
      {
        path: '/Horizontal/',
        name: 'Horizontal',
        meta: {
          title: '水平位移数据',
          icon: 'iconfont icon-shensuofengweiyi'
        },
        component: () => import('@/components/Displacement/Horizontal')
      },
      {
        path: '/Displacement/Longitudinal',
        name: 'Longitudinal',
        meta: {
          title: '纵向位移数据',
          icon: 'iconfont icon-zongxiangweiyi'
        },
        component: () => import('@/components/Displacement/Longitudinal')
      },
    ]
  },
  {
    path: '/rainfall',
    component: Layout,
    name:"rainfall",
    meta: {
      title: '雨量数据',
      icon: 'iconfont icon-precipitation',
    },
    children: [
      {
        path: '/rainfall',
        component: () => import('@/components/RainfallAmount'),
        meta: {
          title: '雨量数据',
          icon: 'iconfont icon-precipitation',
        },
      }
    ]
  },
  // {
  //   path: '/test',
  //   component: Layout,
  //   name:"test",
  //   meta: {
  //     title: '测试',
  //     icon: 'iconfont icon-precipitation',
  //   },
  //   children: [
  //     {
  //       path: '/test',
  //       component: () => import('@/components/Model/test'),
  //       meta: {
  //         title: '测试',
  //         icon: 'iconfont icon-precipitation',
  //       },
  //     }
  //   ]
  // },
  {
    path: '/seepageflowdata',
    component: Layout,
    name:"seepageflowdata",
    meta: {
      title: '渗流量数据',
      icon: 'iconfont icon-shenliuliangyuebaobiao',
    },
    children: [
      {
        path: '/seepageflowdata',
        component: () => import('@/components/SeepageFlowdata'),
        meta: {
          title: '渗流量数据',
          icon: 'iconfont icon-shenliuliangyuebaobiao',
        },
      }
    ]
  },

  {
    path: '/comprehensiveData',
    component: Layout,
    name:"comprehensiveData",
    meta: {
      title: '综合数据',
      icon: 'iconfont icon-zongheshuju',
    },
    children: [
      {
        path: '/comprehensiveData',
        component: () => import('@/components/ComprehensiveData'),
        meta: {
          title: '综合数据',
          icon: 'iconfont icon-zongheshuju',
        },
      }
    ]
  },
  {
    path: '/waterLevel',
    component: Layout,
    name:"waterLevel",
    meta: {
      title: '水位数据',
      icon: 'iconfont icon-shuiwei1',
    },
    children: [
      {
        path: '/waterLevel',
        component: () => import('@/components/WaterLevelData'),
        meta: {
          title: '水位数据',
          icon: 'iconfont icon-shuiwei1',
        },
      }
    ]
  },
  {
    path: '/model',
    component: Layout,
    meta: {
      title: '预测预警模型',
      icon: 'iconfont icon-yuceyujinggaoliang',
    },
    redirect: '/model/displacementPrediction',
    children: [
      {
        path: '/model/displacementPrediction',
        name: 'DisplacementPrediction',
        meta: {
          title: '模型展示',
          icon: 'iconfont icon-weiyi'
        },
        component: () => import('@/components/Model/DisplacementPrediction')
      },
      {
        path: '/model/waterLevelPrediction',
        name: 'WaterLevelPrediction',
        meta: {
          title: '水位预测',
          icon: 'iconfont icon-shuiwei'
        },
        component: () => import('@/components/Model/WterLevelPredivtion')
      },
      {
        path: '/model/StorageCapacity',
        name: 'StorageCapacity',
        meta: {
          title: '库容预测',
          icon: 'iconfont icon-kurong'
        },
        component: () => import('@/components/Model/StorageCapacity')
      },
      {
        path: '/model/escapeWarning',
        name: 'EscapeWarning',
        meta: {
          title: '泄洪模拟',
          icon: 'iconfont icon-weiyi'
        },
        component: () => import('@/components/Model/Escapewarning')
      },
    ]
  }
]


const router = createRouter()


function createRouter(routes = constantRoutes) {
  return new VueRouter({
    base: '/',
    mode: 'hash',
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: routes,
  })
}

router.beforeEach((to, from, next) =>{
  console.log("router before")
  const token = getToken()
  if (token) {
    next()
  } else {
    if (to.path === '/Login') {
      next()
    } else {
      next({ path: '/Login' })
    }
  }
} )



const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch((err) => err)
}


export default router
