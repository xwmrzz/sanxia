<template>
<!--  首页水位展示-->
  <div class="com-container " style="width: 100%;height: 100%;">
    <great-charts :autoresize="true"
                  :options="options"
                  :init-options="initOptions"
                  style="width: 100%; height: 100%;"/>
  </div>
</template>

<script>
import GreatCharts from '@/extra/GreaChart'
import {chartWaterlv} from '@/api/waterlv'

export default {
  name: "waterlevel",
  data() {
    return {
      chartInstance:null,
      initOptions: {
        renderer: 'svg',
      },
      options:{
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [],
          axisLabel:{
            color:"rgba(255,255,255)",
            fontsize:"12"
          }
        },
        grid: {
          left: '5%',
          bottom:'10%',
          top:'5%',
          containLabel: true
          // 是否显示刻度标签 如果是true 就显示 否则反之
        },
        yAxis: {
          type: 'value',
          scale:true,
          axisLabel: {
            formatter: '{value}m',
            color:"rgba(255,255,255)",
            fontsize:"12"
          }
        },
        series: [
          {

            name: '水位',
            type: 'line',
            smooth: true,
            data: [],
            color:'#f19a0b',
            label:{
              show:true,
              position:'top',
              textStyle:{
                color:'#ffffff'
              }
            },
            markLine: {
              data: [

              ]
            }
          }
        ]
      }
    }
  },
  components: {
    GreatCharts
  },
  created() {
    this.getWaterLvList()
  },
  mounted() {

  },
  methods: {
    getWaterLvList() {
      const data = {
        recordTime: '2020-01-03'
      }
      chartWaterlv().then(res => {
        console.log(res)
        const { data, msg, status } = res
        const x = [], y = []

        data.forEach(i => {
          x.push(i.recordTime)
          y.push(i.waterLevels)
        })

        this.options.xAxis.data = x
        this.options.series[0].data = y

        this.options = {
          ...this.options
        }
      })
    },
    //初始化echartInstance对象

    //获取服务器数据

    //更新图标
    updataChart() {

    }
  }
}
</script>

<style scoped>

</style>
