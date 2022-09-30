import Vue from 'vue'
import VueRouter from "vue-router";
import Layout from '@/layout'
import Layout2 from '@/layout/layout2'
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
  // {
  //   path: '/DigitalAnalogue',
  //   hidden: true,
  //   component: () => import('@/components/Model/DigitalAnalogue'),
  // },
  // {
  //   path: '/',
  //   component: Layout,
  //   name:"index",
  //   meta: {

  //     title: '首页',
  //     icon: 'iconfont icon-shouye',
  //   },
  //   children: [
  //     {
  //       name:"index1",
  //       path: '/',
  //       component: () => import('@/views/index'),
  //       meta: {

  //         title: '首页',
  //         icon: 'iconfont icon-shouye',
  //       },
  //     }
  //   ]
  // },
  {
    path: '/',
    level:1,
    component: Layout,
    name:"首页",
    meta: {
      keepAlive:true,
      title: '首页',
      icon: 'iconfont icon-shouye',
    },
    children: [
      {
        name:"index",
        path: '/',
        component: () => import('@/components/index'),//import('@/views/index'),
        meta: {
          keepAlive:true,
          title: '首页',
          icon: 'iconfont icon-shouye',
        },
      }
    ]
  },
  {
    path: '/test',
    level:1,
    component: Layout,
    name:"test",
    meta: {
      keepAlive:true,
      title: '测试',
      icon: 'iconfont icon-shouye',
    },
    children: [
      {
        name:"test1",
        path: '/1',
        component: () => import('@/components/echartTest'),//import('@/views/index'),
        meta: {
          keepAlive:true,
          title: '测试',
          icon: 'iconfont icon-shouye',
        },
      },
      {
        name:"test2",
        path: '/2',
        component: () => import('@/components/Model/SanxiaModel'),//import('@/views/index'),
        meta: {
          keepAlive:true,
          title: '测试2',
          icon: 'iconfont icon-shouye',
        },
      }
    ]
  },
  {
    path: '/index',
    level:2,
    component: Layout2,
    name:"index",
    meta: {

      title: '单体监测',
      icon: 'iconfont icon-shouye',
    },
    children: [
      {
        name:"index1",
        path: '/',
        component: () => import('@/views/index'),
        meta: {

          title: '单体监测首页',
          icon: 'iconfont icon-shouye',
        },
      }
    ]
  },
  // {
  //   path: '/monomer',
  //   level:2,
  //   component: Layout2,
  //   name:"/",
  //   meta: {
  //     title: '单体监测',
  //     icon: 'iconfont icon-jiance',
  //   },
  //   children: [
  //     {
  //       name:"AdjacentPlane",
  //       path: '/AdjacentPlane',
  //       component: () => import('@/components/AdjacentPlane/AdjacentPlane'),
  //       meta: {
  //         title: '平面位移变化量(mm)',
  //         icon: 'iconfont icon-shouye',
  //       },
  //     },
  //     {
  //       name:"AdjacentVertical",
  //       path: '/AdjacentVertical',
  //       component: () => import('@/components/AdjacentVertical/AdjacentVertical'),
  //       meta: {
  //         title: '垂直位移变化量(mm)',
  //         icon: 'iconfont icon-shouye',
  //       },
  //     },
  //     {
  //       name:"xAdjacent",
  //       path: '/δxAdjacent',
  //       component: () => import('@/components/δxAdjacent/δxAdjacent'),
  //       meta: {
  //         title: 'δx变化量(mm)',
  //         icon: 'iconfont icon-shouye',
  //       },
  //     },
  //     {
  //       name:"yAdjacent",
  //       path: '/δyAdjacent',
  //       component: () => import('@/components/δyAdjacent/δyAdjacent'),
  //       meta: {
  //         title: 'δy变化量(mm)',
  //         icon: 'iconfont icon-shouye',
  //       },
  //     },
  //     {
  //       name:"FirstPlane",
  //       path: '/FirstPlane',
  //       component: () => import('@/components/FirstPlane/FirstPlane'),
  //       meta: {
  //         title: '平面位移累计量(mm)',
  //         icon: 'iconfont icon-shouye',
  //       },
  //     },
  //     {
  //       name:"FirstVertical",
  //       path: '/FirstVertical',
  //       component: () => import('@/components/FirstVertical/FirstVertical'),
  //       meta: {
  //         title: '垂直位移累计量(mm)',
  //         icon: 'iconfont icon-shouye',
  //       },
  //     },
  //     {
  //       name:"xFirst",
  //       path: '/δxFirst',
  //       component: () => import('@/components/δxFirst/δxFirst'),
  //       meta: {
  //         title: 'δx累计量(mm)',
  //         icon: 'iconfont icon-shouye',
  //       },
  //     },
  //     {
  //       name:"yFirst",
  //       path: '/δyFirst',
  //       component: () => import('@/components/δyFirst/δyFirst'),
  //       meta: {
  //         title: 'δy累计量(mm)',
  //         icon: 'iconfont icon-shouye',
  //       },
  //     },
  //     {
  //       name:"Precipitation1",
  //       path: '/Precipitation',
  //       component: () => import('@/components/Precipitation/Precipitation'),
  //       meta: {
  //         title: '降雨量(mm)',
  //         icon: 'iconfont icon-shouye',
  //       },
  //     },
  //     {
  //       name:"YangtzeWaterlevel1",
  //       path: '/YangtzeWaterlevel',
  //       component: () => import('@/components/YangtzeWaterlevel/YangtzeWaterlevel'),
  //       meta: {
  //         title: '长江水位(m)',
  //         icon: 'iconfont icon-shouye',
  //       },
  //     },
  //   ]
  // },
  {
    path: '/Monomer',
    level:3,
    component: Layout2,
    name:"单体",
    meta: {
      title: '单体',
      icon: 'iconfont icon-yuceyujinggaoliang',
    },
    children: [
      {
        name:"单体2",
        path: '/',
        component: () => import('@/components/Monomer'),//import('@/views/index'),
        meta: {
          title: '单体2',
          icon: 'iconfont icon-yuceyujinggaoliang',
        },
      }
    ]
  },
  {
    path: '/numerical',
    level:3,
    component: Layout2,
    name:"数值模拟",
    meta: {
      keepAlive:true,
      title: '数值模拟',
      icon: 'iconfont icon-yuceyujinggaoliang',
    },
    children: [
      {
        name:"数值模拟1",
        path: '/',
        component: () => import('@/components/Model/NumericalSimulation'),//import('@/views/index'),
        meta: {
          keepAlive:true,
          title: '数值模拟1',
          icon: 'iconfont icon-yuceyujinggaoliang',
        },
      }
    ]
  },
  {
    path: '/CAD',
    level:2,
    component: Layout2,
    name:"坡面图",
    meta: {
      keepAlive:true,
      title: '坡面图',
      icon: 'iconfont icon-yuceyujinggaoliang',
    },
    children: [
      {
        name:"坡面图1",
        path: '/',
        component: () => import('@/components/Model/CAD'),//import('@/views/index'),
        meta: {
          keepAlive:true,
          title: '坡面图1',
          icon: 'iconfont icon-yuceyujinggaoliang',
        },
      }
    ]
  },
  {
    path: '/Bmap',
    level:2,
    component: Layout,
    name:"区域监测",
    meta: {
      keepAlive:true,
      title: '区域监测',
      icon: 'iconfont icon-yuceyujinggaoliang',
    },
    children: [
      {
        name:"Bmap",
        path: '/',
        component: () => import('@/components/Landslide/Bmap'),//import('@/views/index'),
        meta: {
          keepAlive:true,
          title: '区域预警',
          icon: 'iconfont icon-yuceyujinggaoliang',
        },
      }
    ]
  },
  // {
  //   path: '/Bmap',
  //   level:1,
  //   component: Layout,
  //   name:"区域监测",
  //   meta: {
  //     keepAlive:true,
  //     title: '区域监测',
  //     icon: 'iconfont icon-yuceyujinggaoliang',
  //   },
  //   children: [
  //     {
  //       name:"Bmap",
  //       path: '/',
  //       component: () => import('@/components/Landslide/Bmap'),//import('@/views/index'),
  //       meta: {
  //         keepAlive:true,
  //         title: '区域预警',
  //         icon: 'iconfont icon-yuceyujinggaoliang',
  //       },
  //     }
  //   ]
  // },
]

// export const constantRoutes2 = [

// ]

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
