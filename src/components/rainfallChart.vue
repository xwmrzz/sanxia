<template>
  <div class="item-title">
    <el-select v-model="point_name" filterable placeholder="请选择监测点" @change="changePoint($event)">
        <el-option
          v-for="item in points"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
    </el-select>
    <great-charts :autoresize="true" :options="rainfall" :init-options="initOptions"
                  style="width: 100%; height: 100%;"/>
  </div>
</template>

<script>
import GreatCharts from '@/extra/GreaChart'
import {chartRainfall} from '@/api/Precipitation/rainfallChart'


export default {
  name: "rainfallChart",
  data() {
    return {
      points: [{
                value: 'JC17',
                label: 'JC17'
              }, {
                value: 'JC18',
                label: 'JC18'
              }, {
                value: 'JC19',
                label: 'JC19'
              }, {
                value: 'JC21',
                label: 'JC21'
              }, {
                value: 'JC22',
                label: 'JC22'
              },{
                value: 'JC24',
                label: 'JC24'
              },{
                value: 'JC25',
                label: 'JC25'
              },{
                value: 'JC26',
                label: 'JC26'
              },{
                value: 'JC28',
                label: 'JC28'
              },{
                value: 'JC29',
                label: 'JC29'
              },{
                value: 'JC30',
                label: 'JC30'
              },{
                value: 'JC31',
                label: 'JC31'
              },{
                value: 'JC37',
                label: 'JC37'
              },{
                value: 'JC40',
                label: 'JC40'
              },{
                value: 'JC43',
                label: 'JC43'
              },{
                value: 'JC44',
                label: 'JC44'
              },{
                value: 'JC45',
                label: 'JC45'
              },{
                value: 'JC46',
                label: 'JC46'
              },{
                value: 'JC47',
                label: 'JC47'
              },{
                value: 'JC50',
                label: 'JC50'
              },{
                value: 'JC51',
                label: 'JC51'
              },{
                value: 'JC52',
                label: 'JC52'
              },{
                value: 'JD4',
                label: 'JD4'
              }],
      point_name:"JC17",
      ChartObject:{
        point_name:"JC17",
      },
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
    changePoint(value){
      console.log(value);
      this.ChartObject.point_name = value;
    },
    getRainfallList() {
      // const data = {
      //   recordTime: '2020-01-03'
      // }
      chartRainfall(this.ChartObject).then(res => {
        console.log(res)
        const {data, msg, status} = res
        console.log(data)
        const x = [], y = []

        data.forEach(i => {
          x.push(i.observation_time)
          y.push(i.precipitation)
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
