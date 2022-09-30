<template>
<div id="precipitationChart" style="height:100%;width:100%;">
  <el-select v-model="point" filterable placeholder="请选择监测点" style="width:25%;" transfer="true" :popper-append-to-body="false" @change="changePoint" @visible-change="visibleChange">
      <el-option
        v-for="item in points"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
  </el-select>
  <div ref="PrecipitationChart" style="height:85%;width:100%;"></div>
</div>
</template>

<script>
  import {chartRainfall,GetPointSelector} from '@/api/Precipitation/rainfallChart';
  import * as echarts from 'echarts';
  export default {
    name: "PrecipitationChart",
    data() {
      return {
        points: [{
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
                }],
        point:"JD4",
        ChartObject:{
          point_name:"JD4",
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              color: "rgba(255,255,255)",
              fontsize: "12"
            },
          }
        ],
        series: [
          {
            name: 'Precipitation',
            type: 'bar',
            barWidth: '60%',
            data: [],
            label:{
              show:true,
              position:'top',
              textStyle:{
                color:'#ffffff'
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
        this.$emit('selectorVisible2',value);
      },
      changePoint(value){
        console.log(this.point);
        this.ChartObject.point_name=this.point;
        this.clear();
        this.getData();
      },
      getData(){
        chartRainfall(this.ChartObject).then(res => {
          console.log(res)
          const {data, msg, status} = res
          console.log(data)
          const x = [], y = []

          data.forEach(i => {
            var time = i.observation_time.substring(0,10)
            x.push(time)
            y.push(i.precipitation)
          })

          this.xAxis[0].data = x
          this.series[0].data = y
          this.init();
        })
      },
      clear(){
        var myChart = echarts.init(this.$refs.PrecipitationChart);
        myChart.dispose();
      },
      init(){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(this.$refs.PrecipitationChart);
        // 绘制图表

        myChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '5%',
            bottom: '10%',
            top: '10%',
            containLabel: true
          },
          xAxis: this.xAxis,
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                formatter: '{value} mm',
                color: "rgba(255,255,255)",
                fontsize: "12",
              }
            }
          ],
          series: this.series
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
