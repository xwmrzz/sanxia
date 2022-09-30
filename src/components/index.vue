<template>
  <div>
    <div class="content-center" >
      <dv-border-box-8 class="system-name" background-color="rgba(48, 65, 83,0.6)" :key="key" >
        <dv-decoration-5 :dur="3" style="height: 30%;" />
        <dv-decoration-7 style="height: 70%;color: #ffffff;font-size: 26px;">三峡库区预警平台</dv-decoration-7>
      </dv-border-box-8>
    </div>
    <div ref="testChart" id="Test" style="width: 100%;height: 100%;background-image: url(static/loginBg.jpg);">

    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {
    GetJC17List
  } from '@/api/AdjacentPlane/AdjacentPlane';
  import * as echarts from 'echarts';
  require('echarts/extension/bmap/bmap');

  export default {
    name: "testChart",
    data() {
      return {
        timer:null,
        key: 1,
        data: [{
            name: '城口县',
            value: 0,
            color: '#C0C0C0',
            itemStyle: {
              "normal": {
                "areaColor": '#C0C0C0'
              }
            }
          },
          {
            name: '巫溪县',
            value: 0,
            color: '#C0C0C0',
            itemStyle: {
              "normal": {
                "areaColor": '#C0C0C0'
              }
            }
          },
          {
            name: '巫山县',
            value: 0,
            color: '#C0C0C0',
            itemStyle: {
              "normal": {
                "areaColor": '#C0C0C0'
              }
            }
          },
          {
            name: '奉节县',
            value: 0,
            color: '#C0C0C0',
            itemStyle: {
              "normal": {
                "areaColor": '#C0C0C0'
              }
            }
          },
          {
            name: '云阳县',
            value: 1,
            color: '#55aaff',
            itemStyle: {
              "normal": {
                "areaColor": '#55aaff'
              }
            }
          },
          {
            name: '开州区',
            value: 0,
            color: '#C0C0C0',
            itemStyle: {
              "normal": {
                "areaColor": '#C0C0C0'
              }
            }
          },
          {
            name: '万州区',
            value: 0,
            color: '#C0C0C0',
            itemStyle: {
              "normal": {
                "areaColor": '#C0C0C0'
              }
            }
          },
          {
            name: '梁平区',
            value: 0,
            color: '#C0C0C0',
            itemStyle: {
              "normal": {
                "areaColor": '#C0C0C0'
              }
            }
          },
          {
            name: '忠县',
            value: 0,
            color: '#C0C0C0',
            itemStyle: {
              "normal": {
                "areaColor": '#C0C0C0'
              }
            }
          },
          {
            name: '石柱土家族自治县',
            value: 0,
            color: '#C0C0C0',
            itemStyle: {
              "normal": {
                "areaColor": '#C0C0C0'
              }
            }
          },
          {
            name: '垫江县',
            value: 0,
            color: '#C0C0C0',
            itemStyle: {
              "normal": {
                "areaColor": '#C0C0C0'
              }
            }
          },
          {
            name: '丰都县',
            value: 0,
            color: '#C0C0C0',
            itemStyle: {
              "normal": {
                "areaColor": '#C0C0C0'
              }
            }
          },
          {
            name: '彭水苗族土家族自治县',
            value: 0,
            color: '#C0C0C0',
            itemStyle: {
              "normal": {
                "areaColor": '#C0C0C0'
              }
            }
          },
          {
            name: '黔江区',
            value: 0,
            color: '#C0C0C0',
            itemStyle: {
              "normal": {
                "areaColor": '#C0C0C0'
              }
            }
          },
          {
            name: '酉阳土家族苗族自治县',
            value: 0,
            color: '#C0C0C0',
            itemStyle: {
              "normal": {
                "areaColor": '#C0C0C0'
              }
            }
          },
          {
            name: '秀山土家族苗族自治县',
            value: 0,
            color: '#C0C0C0',
            itemStyle: {
              "normal": {
                "areaColor": '#C0C0C0'
              }
            }
          },
          {
            name: '长寿区',
            value: 0,
            color: '#C0C0C0',
            itemStyle: {
              "normal": {
                "areaColor": '#C0C0C0'
              }
            }
          },
          {
            name: '涪陵区',
            value: 0,
            color: '#C0C0C0',
            itemStyle: {
              "normal": {
                "areaColor": '#C0C0C0'
              }
            }
          },
          {
            name: '武隆区',
            value: 0,
            color: '#C0C0C0',
            itemStyle: {
              "normal": {
                "areaColor": '#C0C0C0'
              }
            }
          },
          {
            name: '渝北区',
            value: 0,
            color: '#C0C0C0',
            itemStyle: {
              "normal": {
                "areaColor": '#C0C0C0'
              }
            }
          },
          {
            name: '江北区',
            value: 0,
            color: '#C0C0C0',
            itemStyle: {
              "normal": {
                "areaColor": '#C0C0C0'
              }
            }
          },
          {
            name: '南岸区',
            value: 0,
            color: '#C0C0C0',
            itemStyle: {
              "normal": {
                "areaColor": '#C0C0C0'
              }
            }
          },
          {
            name: '巴南区',
            value: 0,
            color: '#C0C0C0',
            itemStyle: {
              "normal": {
                "areaColor": '#C0C0C0'
              }
            }
          },
          {
            name: '南川区',
            value: 0,
            color: '#C0C0C0',
            itemStyle: {
              "normal": {
                "areaColor": '#C0C0C0'
              }
            }
          },
          {
            name: '合川区',
            value: 0,
            color: '#C0C0C0',
            itemStyle: {
              "normal": {
                "areaColor": '#C0C0C0'
              }
            }
          },
          {
            name: '北碚区',
            value: 0,
            color: '#C0C0C0',
            itemStyle: {
              "normal": {
                "areaColor": '#C0C0C0'
              }
            }
          },
          {
            name: '沙坪坝区',
            value: 0,
            color: '#C0C0C0',
            itemStyle: {
              "normal": {
                "areaColor": '#C0C0C0'
              }
            }
          },
          {
            name: '渝中区',
            value: 0,
            color: '#C0C0C0',
            itemStyle: {
              "normal": {
                "areaColor": '#C0C0C0'
              }
            }
          },
          {
            name: '大渡口区',
            value: 0,
            color: '#C0C0C0',
            itemStyle: {
              "normal": {
                "areaColor": '#C0C0C0'
              }
            }
          },
          {
            name: '九龙坡区',
            value: 0,
            color: '#C0C0C0',
            itemStyle: {
              "normal": {
                "areaColor": '#C0C0C0'
              }
            }
          },
          {
            name: '江津区',
            value: 0,
            color: '#C0C0C0',
            itemStyle: {
              "normal": {
                "areaColor": '#C0C0C0'
              }
            }
          },
          {
            name: '綦江区',
            value: 0,
            color: '#C0C0C0',
            itemStyle: {
              "normal": {
                "areaColor": '#C0C0C0'
              }
            }
          },
          {
            name: '璧山区',
            value: 0,
            color: '#C0C0C0',
            itemStyle: {
              "normal": {
                "areaColor": '#C0C0C0'
              }
            }
          },
          {
            name: '潼南区',
            value: 0,
            color: '#C0C0C0',
            itemStyle: {
              "normal": {
                "areaColor": '#C0C0C0'
              }
            }
          },
          {
            name: '铜梁区',
            value: 0,
            color: '#C0C0C0',
            itemStyle: {
              "normal": {
                "areaColor": '#C0C0C0'
              }
            }
          },
          {
            name: '永川区',
            value: 0,
            color: '#C0C0C0',
            itemStyle: {
              "normal": {
                "areaColor": '#C0C0C0'
              }
            }
          },
          {
            name: '大足区',
            value: 0,
            color: '#C0C0C0',
            itemStyle: {
              "normal": {
                "areaColor": '#C0C0C0'
              }
            }
          },
          {
            name: '荣昌区',
            value: 0,
            color: '#C0C0C0',
            itemStyle: {
              "normal": {
                "areaColor": '#C0C0C0'
              }
            }
          },
        ],
      }
    },

    mounted() {
      // this.clear();
      this.GetWarnData();
      this.reSize();
      this.init2();
      console.log('1:'+this.timer);
      if(this.timer == null){
        this.timer = setInterval(()=>{
          this.GetWarnData();
        },1000*60*60);
      };
    },
    methods: {
      async GetWarnData(){
        this.$store.dispatch('getWarningDataArray');
      },
      reSize() {
        var _this = this
        window.addEventListener('resize', function(e) {
          _this.$nextTick(() => {
            _this.key++
          })
        })
      },
      changetest() {
        this.$router.push({ //核心语句
          path: '/Bmap', //跳转的路径
          // query:{           //路由传参时push和query搭配使用 ，作用时传递参数
          //   id:this.id ,
          // }
        })
      },
      clear() {
        var myChart = echarts.init(this.$refs.testChart);
        myChart.dispose();
      },
      init2() {
        // 基于准备好的dom，初始化echarts实例
        var customSettings = [];
        var myChart = echarts.init(this.$refs.testChart);
        // 绘制图表
        axios.get('static/map/重庆市2.json').then(res => {
          console.log(res);
          echarts.registerMap('重庆市', res.data);
          this.data.forEach(function(item, index) {
            customSettings.push({
              name: item.name,
              itemStyle: {
                areaColor: item.color,
                color: item.color
              }
            })
          });
          console.log(customSettings);
          myChart.setOption({

            series: [{
              name: '三峡库区重庆市范围',
              zoom: 0.9,
              center:[108.1,30.5],
              type: 'map',
              map: '重庆市',
              roam: true,
              label: {
                show: false
              },
              selectedMode: false,
              data: this.data,
            }]
          });
          var that = this;
          myChart.on('click', function(params) {
            if (params.data.value == 1) {
              that.changetest();
            }
          });
        });
      }
    }
  }
</script>

<style scoped>
  .messagebox {
    height: 30vh;
    width: 25vw;
    min-width: 350px;
    position: absolute;
    z-index: 2021;
    padding: 5px 10px;
    right: 5%;
  }
  .content-center {
    width: 23vw;
    position: absolute;
    left: 55%;
    transform: translateX(-50%);
    z-index: 2021;
    margin-top: 1vh;
    height: 10vh;
  }
  /* .Test {
    background-color: #000000;
  } */
</style>
