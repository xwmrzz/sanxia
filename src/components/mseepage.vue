<template>
  <div class="com-container "style="width: 100%;height: 100%;">
    <great-charts :autoresize="true" :options="mseepage" :init-options="initOptions"
                  style="width: 100%; height: 100%;"/>
  </div>
</template>

<script>
import GreatCharts from '@/extra/GreaChart'
import {listMSeepage} from '@/api/mseepage'
export default {
  name: "mseepage",
  data() {
    return {
      chartInstance: null,
      initOptions: {
        renderer: 'svg',
      },
      mseepage: {
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
        dataZoom:[{
          show: true,
          type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
          startValue: 0, // 从头开始。
          endValue: 8
        }],
        series: [
          {
            name: '渗流量',
            type: 'bar',
            smooth: true,
            data: [],
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
    this.getMseepageList()
  },


  mounted() {
  var data=option.mseepage[0].data;
    window.setInterval(function(){
      data.shift();
      var randomNum=parseInt(Math.random()*400)
      data.push(randomNum);
      console.log(data);
      refreshData();
    },1000);

    function refreshData(){
      var option = myChart.getOption();//获取页面的option
      option.series[0].data = data;//设置新的数据
      myChart.setOption(option);//绑定到ECharts
    }


  },

  methods: {

    getMseepageList() {
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

        this.mseepage.xAxis.data = x
        this.mseepage.series[0].data = y

        // setInterval(() => {
        //   this.mseepage.xAxis.data.push('2021-11-03')
        //   this.mseepage.series[0].data.push(3)
        // }, 5000)

        this.mseepage = {
          ...this.mseepage
        }
      })
    },
  }
}
</script>

<style scoped>

</style>
