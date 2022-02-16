<template>
  <div id="Mapdiv">
    <!--中部抬头-->
    <div class="content-center">
      <dv-border-box-8 class="system-name" background-color="rgba(48, 65, 83,0.6)">
        <dv-decoration-5 :dur="3"   style="height: 30%;" />
        <dv-decoration-7 style="height: 70%;color: #ffffff;font-size: 26px;">山美水库监测预警平台</dv-decoration-7>
      </dv-border-box-8>
      <!--天气-->
      <div class="system-weather">
        <div ref="he-plugin-standard" id="he-plugin-standard">

          <!--                  <dv-border-box-12 style="margin-top: 20px">-->
          <!--                  <iframe allowtransparency="true" frameborder="0" width="100%" height="120" scrolling="no" src="//tianqi.2345.com/plugin/widget/index.htm?s=2&z=1&t=0&v=0&d=3&bd=0&k=&f=ffffff&ltf=009944&htf=cc0000&q=1&e=1&a=1&c=60304&w=385&h=96&align=center"></iframe>-->
          <!--                </dv-border-box-12>-->
        </div>
      </div>
    </div>
    <!--    左边统计-->
    <div class="statistics-left">
      <dv-border-box-11 title="预警信息" style="height: 30%;margin-top:5%" :color="['#13fedd','#3c05fc']">
        <div class="item-title">
<!--          <great-charts :autoresize="true" :options="warning" :init-options="initOptions"-->
<!--                        style="width: 100%; height: 100%;"/>-->
          <EarlyWarning></EarlyWarning>
        </div>
      </dv-border-box-11>

      <dv-border-box-11 title="渗流量" style="height: 30%; margin-top:5%" :color="['#13fedd','#3c05fc']">
        <div class="item-title">
          <!--          <great-charts :autoresize="true" :options="permeate" :init-options="initOptions"-->
          <!--                        style="width: 100%; height: 100%;"/>-->

          <SeepageFlow></SeepageFlow>

        </div>
      </dv-border-box-11>
    </div>
    <!--    右边统计-->
    <div class="statistics-right">
      <dv-border-box-11 title="水位" style="height: 30%;margin-top:5%;border-color: #4a90e2"
                        :color="['#13fedd','#3c05fc']">
        <div class="item-title">
          <waterlevel></waterlevel>
        </div>
      </dv-border-box-11>
      <dv-border-box-11 title="雨量" style="height: 30%; margin-top:5%" :color="['#13fedd','#3c05fc']">
        <div class="item-title">
          <rainfall></rainfall>
        </div>
      </dv-border-box-11>
    </div>

  </div>

</template>
<script>
import MapInit from "@/utils/MapInit";
import GreatCharts from '@/extra/GreaChart'
import waterlevel from "@/components/waterlevel";
import rainfall from "@/components/rainfall";
import SeepageFlow from "@/components/SeepageFlow";
import EarlyWarning from "@/components/EarlyWarning";
const more = require('@/Picture/more.svg')
export default {
  name: "index",

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
  data() {
    return {
      // 天地图参数配置
      // mapTypeApi 天地图API地址
      // mapService 天地图地图瓦片获取
      // mapKey     天地图Key值，后期应配置到数据库，通过接口动态配置
      map: {
        mapTypeApi: 'http://t0.tianditu.gov.cn/img_w/wmts?',
        mapService:
          'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
        mapKey: '&tk=73fc0025e279ed1f73ddef80e18b989b',
      },
      map1: {
        mapTypeApi: 'http://t0.tianditu.gov.cn/cia_w/wmts?',
        mapService: 'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
        mapKey: '&tk=73fc0025e279ed1f73ddef80e18b989b'
      },
    }
  },
  components: {
    waterlevel,
    GreatCharts,
    rainfall,
    SeepageFlow,
    EarlyWarning

  },
  mounted() {
    window.WIDGET = {
      CONFIG: {
        "layout": "1",
        "width": "450",
        "height": "120",
        "background": "1",
        "dataColor": "FFFFFF",
        "borderRadius": "5",
        "key": "b9270cd8088a41a5a2a2c2de943dc657"
      },
    };
    this.$nextTick(() => {
      setTimeout(() => {
        const dom = document.getElementById('he-plugin-standard')
        dom.style.width = '100%'
      }, 1000)
    })

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0';
    document.getElementsByTagName('head')[0].appendChild(script);


    this.roadMap()

  },
  methods: {
    roadMap() {
      MapInit.init().then((T) => {
        this.T = T
        // 初始化地图
        const imageURL2 = this.map1.mapTypeApi + this.map1.mapService + this.map1.mapKey
        const lay2 = new T.TileLayer(imageURL2, {minZoom: 1, maxZoom: 18})
        const imageURL = this.map.mapTypeApi + this.map.mapService + this.map.mapKey
        const lay = new T.TileLayer(imageURL, {minZoom: 1, maxZoom: 18})
        const config = {layers: [lay, lay2], name: 'TMAP_HYBRID_MAP', marker: [lay, lay2]}

        const map = new T.Map('Mapdiv', config)
        // 设置中心点和级别
        const defaultZoom = 17
        // 中心位置：116°23′10″E，25°12′4″N 进行格式化，地图显示级别15
        const center = new T.LngLat(118.4124, 25.162)
        map.centerAndZoom(center, defaultZoom)

        // 设置标点
        const icon = new T.Icon({
          iconUrl: more,
          iconSize: new T.Point(35, 35),
          iconAnchor: new T.Point(15, 25)
        })
        const marker = new T.Marker(center, { icon: icon })
        map.addOverLay(marker)
        // 创建信息窗口
        const infoWin = new T.InfoWindow()
        const infoContent = '点击进入地图模型'
        infoWin.setContent(infoContent)
        marker.addEventListener('mousemove', (t) => {
          marker.openInfoWindow(infoWin)
        })
        marker.addEventListener('mouseout', () => {
          marker.closeInfoWindow(infoWin)
        })
        marker.addEventListener('click', () => {
          this.$router.push({path: '/model/displacementPrediction'})
        })
      }).catch()
    },
  },
}
</script>

<style scoped>

#Mapdiv {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: relative;
  top: 0;
  left: 0;

}

.content-center {
  width: 23vw;
  position: absolute;
  left: 49%;
  transform: translateX(-50%);
  z-index: 2021;
  margin-top: 1vh;
  height: 10vh;
}

.system-name, .system-weather {
  color: #fff;
  margin: 0 auto;
  border-radius: 4px;
}

#he-plugin-standard {
  margin-top: 20px;
  height: 50%;
}

.statistics-left, .statistics-right {
  height: 100vh;
  width: 25vw;
  min-width: 350px;
  position: absolute;
  z-index: 2021;
  padding: 5px 10px;

}

.dv-border-box-11 {
  padding: 60px 5px 0 5px;
}

.item-title {
  color: #ffffff;
  height: 100%;
  width: 100%
}

.statistics-left {
  left: 3%;
}

.statistics-right {
  right: 5%;

}

</style>
