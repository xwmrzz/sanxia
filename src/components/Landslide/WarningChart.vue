<template>
<div id="WarningChart" style="height:100%;width:100%;">
  <div ref="warningChart" style="height:85%;width:100%;margin-left: 5%;"></div>
</div>
</template>

<script>
  // import {chartRainfall} from '@/api/Precipitation/rainfallChart';
  import elementResizeDetectorMaker from "element-resize-detector";
  import * as echarts from 'echarts';
  var myChart = '';
  export default {
    name: "WarningChart",
    data() {
      return {
        timer:null,
        series: [
          {
            name: '预警等级数量',
            type: 'pie',
            radius: ['40%', '90%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 3,
              borderColor: '#fff',
              borderWidth: 0
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '10',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 0, name: '无预警' },
              { value: 0, name: '一级预警' },
              { value: 0, name: '二级预警' },
              { value: 0, name: '三级预警' },
              { value: 0, name: '四级预警' },
              { value: 0, name: '五级预警' }
            ]
          }
        ]
      }
    },
    // created() {
    //   console.log("chartCreated");
    //   this.getWarningData();
    //   setInterval(() => {
    //     this.getWarningData();
    //   }, 1000*60*20);
    // },
    mounted() {
      // this.clear();
      console.log("chartMounted");
        this.ChartsLoad();
        setInterval(() => {
          console.log("timer");
          this.ChartsLoad();
          // this.getWarningData();
        }, 1000*60*60);
    },
    // activated(){

    //   console.log("chartActivated");
    //   console.log("timer:"+this.timer);
    //   if(this.timer==null){
    //     console.log("aaa");
    //     this.refresh();
    //   };
    //   if(this.timer!=null){
    //     console.log("aaa");
    //     this.init();
    //   }
    // },
    methods: {
      refresh(){
            this.getWarningData();
            //执行定时任务
            this.timer = setInterval(() => {
              this.getWarningData();
            }, 1000*60*60);
      },
      clear(){
        var myChart = echarts.init(this.$refs.warningChart);
        myChart.dispose();
      },
      ChartsLoad(){
        this.clear();
        this.series[0].data[0].value = this.$store.state.levelcount[0];
        this.series[0].data[1].value = this.$store.state.levelcount[1];
        this.series[0].data[2].value = this.$store.state.levelcount[2];
        this.series[0].data[3].value = this.$store.state.levelcount[3];
        this.series[0].data[4].value = this.$store.state.levelcount[4];
        this.series[0].data[5].value = this.$store.state.levelcount[5];
        this.init();
        // this.$store.dispatch('getWarningDataArray').then(()=>{
        //   this.series[0].data[0].value = this.$store.state.levelcount[0];
        //   this.series[0].data[1].value = this.$store.state.levelcount[1];
        //   this.series[0].data[2].value = this.$store.state.levelcount[2];
        //   this.series[0].data[3].value = this.$store.state.levelcount[3];
        //   this.series[0].data[4].value = this.$store.state.levelcount[4];
        //   this.series[0].data[5].value = this.$store.state.levelcount[5];
        //   this.init();
        // })
      },
      getWarningData(){
        this.$store.dispatch('getWarningDataArray').then(()=>{
          this.series[0].data[0].value = this.$store.state.levelcount[0];
          this.series[0].data[1].value = this.$store.state.levelcount[1];
          this.series[0].data[2].value = this.$store.state.levelcount[2];
          this.series[0].data[3].value = this.$store.state.levelcount[3];
          this.series[0].data[4].value = this.$store.state.levelcount[4];
          this.series[0].data[5].value = this.$store.state.levelcount[5];
        })
      },
      init(){
        // this.clear();
        myChart = echarts.init(this.$refs.warningChart);
        // 绘制图表

        myChart.setOption({
          color:['rgba(255, 255, 255, 0.7)','rgba(0, 255, 0, 0.7)','rgba(0, 170, 255, 0.7)','rgba(255, 255, 0, 0.7)','rgba(255, 170, 0, 0.7)','rgba(255, 0, 0, 0.7)'],
          tooltip: {
              trigger: 'item'
            },
            legend: {
              textStyle:{
                              fontSize: 11,//字体大小
                              color: '#ffffff'//字体颜色
                         },
              orient: 'vertical',
              top: '5%',
              left: 'left'
            },
            series:this.series
        });
        setTimeout(function(){
          window.onresize = function(){
            myChart.resize();
          };
        })
        
      },
    }
  }
</script>

<style scoped>

</style>
