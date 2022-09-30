<template>
  <div id="Mapdiv">
    <!--中部抬头-->
    <div class="content-center">
      <dv-border-box-8 class="system-name" background-color="rgba(48, 65, 83,0.6)">
        <dv-decoration-5 :dur="3" style="height: 30%;" />
        <dv-decoration-7 style="height: 70%;color: #ffffff;font-size: 26px;">塔坪滑坡监测</dv-decoration-7>
      </dv-border-box-8>
      <!--天气-->
      <!-- <div class="system-weather">
        <div ref="he-plugin-standard" id="he-plugin-standard">

        </div>
      </div> -->
    </div>
    <!--    左边统计-->
    <div class="statistics-left" id="indexleft">
      <!-- <dv-border-box-11 title="预警信息" style="height: 30%;width: 100%;margin-top:5%" :color="['#13fedd','#3c05fc']">
        <div class="item-title">

          <WarningChart :key="$store.state.indextimer"></WarningChart>
        </div>
      </dv-border-box-11> -->
      <dv-border-box-11 title="监测站" :style=styleTest :color="['#13fedd','#3c05fc']">
      <!-- <dv-border-box-11 title="监测站" style="height: 30%;width: 100%;margin-top:5%" :color="['#13fedd','#3c05fc']"> -->
        <div class="item-title">
          <!--          <great-charts :autoresize="true" :options="permeate" :init-options="initOptions"-->
          <!--                        style="width: 100%; height: 100%;"/>-->

          <ObservationPointTable></ObservationPointTable>

        </div>
      </dv-border-box-11>
    </div>
    <!--    右边统计-->
    <div class="statistics-right" id="indexright">
      <dv-border-box-11 title="长江水位" :style=styleTest :color="['#13fedd','#3c05fc']">
        <div class="item-title">
          <WaterLevelChart @selectorVisible1='visibleChange'></WaterLevelChart>
        </div>
      </dv-border-box-11>
      <dv-border-box-11 title="降雨量" :style=styleTest :color="['#13fedd','#3c05fc']">
        <div class="item-title">
          <PrecipitationChart @selectorVisible2='visibleChange'></PrecipitationChart>
          <!-- <rainfall></rainfall> -->
        </div>
      </dv-border-box-11>
    </div>

  </div>

</template>
<script>
  import ObservationPointTable from "@/components/ObservationPoint/ObservationPointTable";
  import WarningChart from "@/components/Landslide/WarningChart";
  import WaterLevelChart from "@/components/YangtzeWaterlevel/WaterLevelChart";
  import PrecipitationChart from "@/components/Precipitation/PrecipitationChart";
  import EchartTest from "@/components/echartTest";
  import MapInit from "@/utils/MapInit";
  import GreatCharts from '@/extra/GreaChart';
  var map;
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
        styleTest:{
          width:'100%',
          height:'30%',
          'margin-top':'5%'
        },
        clientWidth:'',
        flag: true,
        timer: null,
        // 天地图参数配置
        // mapTypeApi 天地图API地址
        // mapService 天地图地图瓦片获取
        // mapKey     天地图Key值，后期应配置到数据库，通过接口动态配置
        map: {
          mapTypeApi: 'http://t0.tianditu.gov.cn/img_w/wmts?',
          mapService: 'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
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
      GreatCharts,
      EchartTest,
      PrecipitationChart,
      WaterLevelChart,
      WarningChart,
      ObservationPointTable
    },

    mounted() {
      this.clientWidth = document.getElementById('Mapdiv').clientWidth;
      window.addEventListener('resize', () => {
          this.resize();
      });
      // window.onresize = () => {
      //   this.resize();
      // };
      // window.onload = () => {
      //   return (() => {
      //       this.resize();
      //     })();
      // };
      console.log(this.$store.state.indextimer);
      if (this.$store.state.indextimer == 0) {
        setInterval(() => {
          this.$store.dispatch('changeIndexTimer').then(() => {
            console.log(this.$store.state.indextimer);
            console.log("success");
          });
        }, 1000 * 60 * 61);
      }


      // window.WIDGET = {
      //   CONFIG: {
      //     "layout": "1",
      //     "width": "450",
      //     "height": "120",
      //     "background": "1",
      //     "dataColor": "FFFFFF",
      //     "borderRadius": "5",
      //     "key": "b9270cd8088a41a5a2a2c2de943dc657"
      //   },
      // };
      // this.$nextTick(() => {
      //   setTimeout(() => {
      //     const dom = document.getElementById('he-plugin-standard')
      //     dom.style.width = '100%'
      //   }, 1000)
      // })

      // var script = document.createElement('script');
      // script.type = 'text/javascript';
      // script.src = 'https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0';
      // document.getElementsByTagName('head')[0].appendChild(script);


      this.roadMap()

    },
    destroyed() {
      window.removeEventListener('resize',this.removeResize(),true);
    },
    methods: {
      removeResize(){
        console.log("移除index窗口监听");
      },
      visibleChange(value) {
        console.log('父组件：' + value);
        if (value) {
          map.disableDrag();
        };
        if (!value) {
          map.enableDrag();
        }
      },
      resize(){
        if(this.$options.name=='index'){
          var ratio = document.getElementById('Mapdiv').clientWidth/this.clientWidth;
          this.styleTest.width = this.clientWidth*ratio*0.3+'px';
        }
      },
      // resize() {
      //   var o = document.getElementById('Mapdiv'),
      //     l = document.getElementById('indexleft'),
      //     r = document.getElementById('indexright');
      //   var ow = o.clientWidth,
      //     oh = o.clientHeight;
      //   l.style.transform = 'scale(' + ow / 1500 + ',' + oh / 750 + ')';
      //   r.style.transform = 'scale(' + ow / 1500 + ',' + oh / 750 + ')';
      // },
      roadMap() {
        MapInit.init().then((T) => {
          this.T = T
          // 初始化地图
          const imageURL2 = this.map1.mapTypeApi + this.map1.mapService + this.map1.mapKey
          const lay2 = new T.TileLayer(imageURL2, {
            minZoom: 1,
            maxZoom: 18
          })
          const imageURL = this.map.mapTypeApi + this.map.mapService + this.map.mapKey
          const lay = new T.TileLayer(imageURL, {
            minZoom: 1,
            maxZoom: 18
          })
          const config = {
            layers: [lay, lay2],
            name: 'TMAP_HYBRID_MAP',
            marker: [lay, lay2]
          }

          map = new T.Map('Mapdiv', config)
          // 设置中心点和级别
          const defaultZoom = 10.5
          // 中心位置：116°23′10″E，25°12′4″N 进行格式化，地图显示级别15
          const center = new T.LngLat(109.757147, 31.038806)
          map.centerAndZoom(center, defaultZoom)

          // 设置标点
          const icon = new T.Icon({
            iconUrl: more,
            iconSize: new T.Point(35, 35),
            iconAnchor: new T.Point(15, 25)
          })
          const marker = new T.Marker(center, {
            icon: icon
          })
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
            this.$router.push({
              path: '/model/displacementPrediction'
            })
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

  .system-name,
  .system-weather {
    color: #fff;
    margin: 0 auto;
    border-radius: 4px;
  }

  #he-plugin-standard {
    margin-top: 20px;
    height: 50%;
  }

  .statistics-left,
  .statistics-right {
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
