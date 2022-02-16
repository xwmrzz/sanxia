<template>
  <div class="item-title">
    <great-charts :autoresize="true" :options="rainfall" :init-options="initOptions"
                  style="width: 100%; height: 100%;"/>
  </div>
</template>

<script>
import GreatCharts from '@/extra/GreaChart'
import {chartRainfall} from '@/api/rainfall'


export default {
  name: "rainfall",
  data() {
    return {
      chartInstance: null,
      initOptions: {
        renderer: 'svg',
      },
      rainfall: {
        tooltip: {
          trigger: 'axis'
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
          bottom: '10%',
          top: '10%',
          // 是否显示刻度标签 如果是true 就显示 否则反之
          containLabel: true
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} mm',
            color: "rgba(255,255,255)",
            fontsize: "12",

          }
        },
        series: [
          {
            name: '雨量',
            type: 'bar',
            smooth: true,
            data: [],
            barWidth:15,
            itemStyle: {
              // 修改柱子圆角
              barBorderRadius: [10,10,0,0],
              color:new this.$echarts.graphic.LinearGradient(0,1,0,0,[
                  {offset:0,
                    color:'#3080de'},
                  {
                    offset:1,
                    color: '#22fdcc'
                  }
                ]
              )
            },
            color: '#88f90c',
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
    this.getRainfallList()
  },
  methods: {
    getRainfallList() {
      // const data = {
      //   recordTime: '2020-01-03'
      // }
      chartRainfall().then(res => {
        console.log(res)
        const {data, msg, status} = res
        const x = [], y = []

        data.forEach(i => {
          x.push(i.recordTime)
          y.push(i.arealRainfall)
        })

        this.rainfall.xAxis.data = x
        this.rainfall.series[0].data = y

        this.rainfall = {
          ...this.rainfall
        }
      })
    }
  }
}


</script>

<style scoped>

</style>
