<template>
<div id="waterLevelChart" style="height:100%;width:100%;">
  <el-select v-model="point" filterable placeholder="请选择监测点" style="width:25%;" transfer="true" :popper-append-to-body="false" @change="changePoint" @visible-change="visibleChange">
      <el-option
        v-for="item in points"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
  </el-select>
  <div ref="WaterLevelChart" style="height:85%;width:100%;"></div>
</div>
</template>

<script>
  import {waterlevelChart,GetPointSelector} from '@/api/YangtzeWaterlevel/waterlevelChart';
  import * as echarts from 'echarts';
  export default {
    name: "WaterLevelChart",
    data() {
      return {
        points: [{
                  value: 'JC37',
                  label: 'JC37'
                },{
                  value: 'JD4',
                  label: 'JD4'
                },{
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
                }],
        point:"JC37",
        ChartObject:{
          point_name:"JC37",
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
        series: [
          {
            name: 'WaterLevel',
            type: 'line',
            stack: 'Total',
            data: [],
            itemStyle : {
            	                 normal : {
            	                     color:'#ffaa00',
            	                     lineStyle:{
            	                         color:'#ffaa00'
            	                     }
            	                 }
            	             },
          }
        ]
      }
    },
    mounted() {
      this.clear();
      this.getData();
    },
    methods: {
      visibleChange(value){
        this.$emit('selectorVisible1',value);
      },
      changePoint(value){
        console.log(this.point);
        this.ChartObject.point_name=this.point;
        this.clear();
        this.getData();
      },
      getData(){
        waterlevelChart(this.ChartObject).then(res => {
          console.log(res)
          const {data, msg, status} = res
          console.log(data)
          const x = [], y = []

          data.forEach(i => {
            var time = i.observation_time.substring(0,10)
            x.push(time)
            y.push(i.yangtze_waterlevel)
          })

          this.xAxis.data = x
          this.series[0].data = y
          this.init();
        })
      },
      clear(){
        var myChart = echarts.init(this.$refs.WaterLevelChart);
        myChart.dispose();
      },
      init(){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(this.$refs.WaterLevelChart);
        // 绘制图表

        myChart.setOption({
          // title: {
          //     text: 'Stacked Line'
          //   },
            tooltip: {
              trigger: 'axis'
            },
            // legend: {
            //   data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
            // },
            grid: {
              top: '10%',
              left: '4%',
              bottom: '10%',
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis:this.xAxis,
            yAxis: {
              type: 'value',
              axisLabel: {
                formatter: '{value} m',
                color: "rgba(255,255,255)",
                fontsize: "12",
              }
            },
            series:this.series
        });

        window.addEventListener("resize",function(){
          myChart.resize();
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
::v-deep .el-input__inner {
  background-color: transparent !important;
  //   border-color: rgba(255, 255, 255, 0.1);
  color: #d9d9d9;

}
  // 设置输入框的背景色、字体颜色、边框属性设置；
::v-deep .el-select {
  position: relative;
  .el-input {
    input {
      border-color: rgba(44, 137, 229, 0.0);
      color: rgba(255, 255, 255, 1.0);
    }
  }
}
</style>
