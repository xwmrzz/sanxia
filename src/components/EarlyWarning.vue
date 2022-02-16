<template>
  <dv-scroll-board :config="config1" style="width: 100%;"/>

</template>

<script>
import {levelWater} from "@/api/Model/WaterLevel";

export default {
  name: "EarlyWarning",
  data() {
    return {
      config1: {
        header: ["预警等级", "时间"],
        data:[],
        rowNum: 3, //表格行数
        headerHeight: 40,
        headerBGC: "", //表头
        oddRowBGC: "", //奇数行
        evenRowBGC: "", //偶数行
        opacity: 0.5,
        columnWidth: [50],
        index: true,
        align: 'center',
      },
      wucha: []
    }
  },
  created() {
    this.getWaterLvList()
  },
  methods: {
    getWaterLvList() {
      levelWater({}).then(res => {
        const data = res.data
        const config1data = []
        for (let i = 0; i < data.length; i++) {
          const a = data[i]
          const c = a.wucha
          let b = '#9fe6b8'
          let d = '正常阈值'
          if (c >= 10) {
              b = '#d0021b'
              d = '一级预警'
          }
          else if(c>=8&&c<10){
              b = '#fd1a36'
              d = '二级预警'
          }
          else if (c>=6&&c<8){
            b = '#fd364e'
            d = '三级预警'
          }
          else if (c>=3&&c<6){
            b = '#fd5469'
            d = '四级预警'
          }
          else if (c>=1.5&&c<3){
            b = '#fd7586'
            d = '五级预警'
          }
          else if (c>=0.5&&c<1.5){
            b = '#fe99a6'
            d = '六级预警'
          }
          else{
            b = '#9fe6b8'
            d = '正常状态'
          }

          const cd = [`<span><i class="icon" style="display: inline-block; background: ${b}"></i>${d}</span>`, a.recordTime]
          config1data.push(cd)
        }
        this.config1.data = [
          ...config1data
        ]
        this.config1 = {
          ...this.config1
        }
      })
    }
  }
}
</script>

<style scoped>
::v-deep .icon {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

::v-deep .icon-warning {
  background-color: #f8e71c;
}

::v-deep .icon-error {
  background-color: #7ed321;
}

::v-deep .icon-info {
  background-color: #f8a61c;
}

::v-deep .icon-danger {
  background-color: #d0021b;
}
</style>
