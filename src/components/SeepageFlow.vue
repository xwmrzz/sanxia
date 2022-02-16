<template>
  <div class="com-container "style="width: 100%;height: 100%;">
    <great-charts :autoresize="true" :options="SeepageFlow" :init-options="initOptions"
                  style="width: 100%; height: 100%;"/>
  </div>
</template>

<script>
import GreatCharts from '@/extra/GreaChart'
import {listMSeepage} from '@/api/mseepage'
export default {
  name: "SeepageFlow",
  data() {
    return {
      chartInstance: null,
      initOptions: {
        renderer: 'svg',
      },
      SeepageFlow: {
        tooltip:{
          trigger: 'axis',
          axisPointer:{
            type:'line',
            z:0,
            lineStyle:{
              color:'#ffffff',
            }
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [],
          axisLabel: {
            color: "rgba(255,255,255)",
            fontsize: "12"
          },

        },
        grid: {
          left: '5%',
          top: '10%',
          bottom: '10%',
          // 是否显示刻度标签 如果是true 就显示 否则反之
          containLabel: true
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}m³',
            color: "rgba(255,255,255)",
            fontsize: "12",

          }
        },
        // dataZoom:[{
        //   show: false,
        //   type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
        //   startValue: 0, // 从头开始。
        //   endValue: 8
        // }],
        series: [
          {
            areaStyle: {
              color: '#0f79f5'
            },
            name: '渗流量',
            type: 'line',
            smooth: true,
            data: [],
            color: '#0f79f5',
            label:{
              show:true,
              position:'top',
              textStyle:{
                color:'#ffffff'
              }
            },
            markLine: {
              data: []
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
    this.getSeepageFlowList()
  },

  methods: {

    getSeepageFlowList() {
      // const data = {
      //   recordTime: '2020-01-03'
      // }
      listMSeepage().then(res => {
        console.log(res)
        const {data, msg, status} = res
        const x = [], y = []

        data.forEach(i => {
          x.push(i.recordTime)
          y.push(i.seepageFlow)
        })

        this.SeepageFlow.xAxis.data = x
        this.SeepageFlow.series[0].data = y
        this.SeepageFlow = {
          ...this.SeepageFlow
        }
      })
    },
  },



}
</script>

<style scoped>

</style>
