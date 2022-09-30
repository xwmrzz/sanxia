<template>
  <div id="APChart">
    <el-select v-model="point" filterable placeholder="请选择监测点" style="width:25%;" transfer="true" :popper-append-to-body="false" @change="changePoint">
        <el-option
          v-for="item in points"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
    </el-select>
    <div ref="AdjacentPlaneChart" style="height:450px;width:1000px;">
    </div>
  </div>

</template>

<script>
  import {GetPointList,GetPointSelector} from '@/api/AdjacentPlane/AdjacentPlane';
  import * as echarts from 'echarts';
    require('echarts/extension/bmap/bmap');
  var myChart;
  export default {
    name: "AdjacentPlaneChart",
    data() {
      return {
        point:"",
        ChartObject:{
          point_name:"",
        },
        points:[],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        series: [
          {
            name: '平面位移变化量',
            type: 'line',
            data: [],
            stack: 'Total',
          }
        ]
      }
    },
    beforeCreate() {
      GetPointSelector({
        recordStartTime: this.$store.state.AdjacentPlane.recordStartTime,
        recordEndTime: this.$store.state.AdjacentPlane.recordEndTime,
      }).then(res => {
        // this.point=res.data[0].label;
        console.log("res:"+res.data.length);
        if(res.data.length!=0){
          // this.ChartObject.point_name=this.point;
          for(const i in res.data){
            console.log(res.data[i]);
            this.points.push({
              value:res.data[i].value,
              label:res.data[i].label
            })
          }
          console.log(this.points);
        };
        if(res.data.length==0){
          this.points=[{
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
                },
                {
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
                }]
        }
      });
    },
    mounted() {
      this.clear();
      this.GetData();
    },
    methods: {
      
      changePoint(value){
        console.log(this.point);
        this.ChartObject.point_name=this.point;
        this.GetData();
      },
      GetData(){
        console.log(this.ChartObject.point_name);
        GetPointList({
          recordStartTime: this.$store.state.AdjacentPlane.recordStartTime,
          recordEndTime: this.$store.state.AdjacentPlane.recordEndTime,
          point_name:this.ChartObject.point_name
        }).then(res => {
          console.log(res);
          const {data, msg, status} = res
          console.log(data)
          const y=[],x=[];
          data.forEach(i => {
            var time = i.observation_time.substring(0,10)
            x.push(time)
            y.push(i.adjacent_plane_displacement)
          });
          this.series[0].data = y;
          this.xAxis.data = x
          this.init2();
        });

      },
      clear(){
        var myChart = echarts.init(this.$refs.AdjacentPlaneChart);
        myChart.dispose();
        },
      init2(){
        if (myChart != null && myChart != "" && myChart != undefined) {
                myChart.dispose();//销毁
            }
          // 基于准备好的dom，初始化echarts实例
          myChart = echarts.init(this.$refs.AdjacentPlaneChart);
          // 绘制图表

          myChart.setOption({
            // title: {
            //     text: 'Temperature Change in the Coming Week'
            //   },
              tooltip: {
                trigger: 'axis'
              },
              legend: {},
              toolbox: {
                show: true,
                feature: {
                  dataZoom: {
                    yAxisIndex: 'none'
                  },
                  dataView: { readOnly: false },
                  magicType: { type: ['line', 'bar'] },
                  restore: {},
                  saveAsImage: {}
                }
              },
              xAxis:this.xAxis,
              yAxis: {
                type: 'value',
                axisLabel: {
                  formatter: '{value} mm'
                }
              },
              series:this.series
          })
        }
      }
    }

</script>

<style scoped>

</style>
