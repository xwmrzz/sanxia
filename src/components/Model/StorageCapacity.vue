<template>
  <div class="KuRong">
    <div class="Chart">
      <div class="Storage">
        <great-charts :autoresize="true"
                      :options="StorageCapacity"
                      :init-options="initOptions"
                      style="width: 100%;height: 100%;"
        />
      </div>
    </div>
    <div class="Data">
      <div style="width: 100%;height: 40vh;">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          border
          stripe
          :height="getTableHeight"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            prop="recordTime"
            label="记录时间"
            class="From"
            min-width="35"
          >
          </el-table-column>
          <el-table-column
            prop="storageCapacity"
            label="实际库容/万m³"
            class="From"
            min-width="50"
          >
          </el-table-column>
          <el-table-column
            prop="sevendayModelPrediction"
            label="七天预测库容/万m³"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="sevendayModelError"
            label="七天预测库容误差/万m³"
            class="From"
            min-width="60"
          >
          </el-table-column>
          <el-table-column
            prop="fourteenModelPrediction"
            label="十四天预测库容/万m³"
            class="From"
            min-width="60"
          >
          </el-table-column>
          <el-table-column
            prop="fourteenModelError"
            label="十四天预测库容误差/万m³"
            class="From"
            min-width="68"
          >
          </el-table-column>
          <el-table-column
            prop="thirtyfiveModelPrediction"
            label="三十五天预测库容/万m³"
            class="From"
            min-width="65"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="thirtyfiveModelError"
            label="三十五天预测库容误差/万m³"
            class="From"
            min-width="70"
            show-overflow-tooltip>
          </el-table-column>

        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[20, 50, 100]"
          :current-page="queryInfo.pageNum"
          :page-size="queryInfo.pageSize"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import GreatCharts from '@/extra/GreaChart'
import {chartCapacity ,listCapacity} from "@/api/StorageCapacity/StorageCapacity";

export default {
  name: "StorageCapacity",
  beforeRouteEnter(to, from, next) {
    document.querySelector('body').setAttribute('style', 'margin:0;padding:0')
    next()
  },
  // 去除背景色
  beforeRouteLeave(to, from, next) {

    document.querySelector('body').setAttribute('style', '')
    next()
  },
  data() {
    return {
      chartInstance: null,
      initOptions: {
        renderer: 'svg',
      },
      StorageCapacity: {
        color: ['#80FFA5', '#00DDFF', '#FF0087', '#FFBF00'],
        title: {
          text: '实际库容与预测库容',
          top:'5%',
          x: 'center',
          textStyle: {
            color: '#3A7BD5',
            fontSize: 20
          },
          textAlign: 'left'
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['实际库容','七天预测库容','十四天预测库容','三十五天预测库容']
        },
        // 下载图片
        // toolbox: {
        //   feature: {
        //     saveAsImage: {}
        //   }
        // },
        grid: {
          left: '3%',
          right: '4%',
          // bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: []
          }
        ],
        yAxis: [
          {
            // scale:true,
            min:30000,
            max:50000,
            type: 'value',
            axisLabel: {
              formatter: '{value}m³',
              color:"rgba(0,0,0)",
              fontsize:"12"
            }
          }
        ],
        series: [
          {
            name: '实际库容',
            type: 'line',
            // stack: 'Total',
            data: [],
            smooth: true
          },
          {
            name: '七天预测库容',
            type: 'line',
            // stack: 'Total',
            data: []
          },
          {
            name: '十四天预测库容',
            type: 'line',
            // stack: 'Total',
            data: []
          },
          {
            name: '三十五天预测库容',
            type: 'line',
            // stack: 'Total',
            data: []
          }
        ]
      },
      queryInfo: {
        query:'',
        // 当前每页显示多少条数据
        pageSize: 20,
        // 当前的页数
        pageNum: 1,
      },
      total: 0,
      tableData: [],
    }
  },
  created() {
    this.getStorageCapacity()
  },
  components: {
    GreatCharts
  },
  computed: {
    getTableHeight() {
      let height = 0
      const client_height = document.documentElement.clientHeight
      console.log(client_height)
      height = client_height - 450
      return `${height}px`
    }
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(newSize) {
      this.queryInfo.pageSize =newSize
      this.getStorageCapacity()
    },
    handleCurrentChange(val) {
      this.queryInfo.pageNum = val
      this.getStorageCapacity()
    },
    getStorageCapacity() {
      chartCapacity().then(res => {
        const {data, msg, status} = res
        const x = [], y = [], y1 = [],y2 = [],y3 = []
        console.log(data)
        data.forEach(i => {
          x.push(i.recordTime)
          y.push(i.storageCapacity)
          y1.push(i.sevendayModelPrediction)
          y2.push(i.fourteenModelPrediction)
          y3.push(i.thirtyfiveModelPrediction)
        })
        this.StorageCapacity.xAxis[0].data = x
        this.StorageCapacity.series[0].data = y
        this.StorageCapacity.series[1].data = y1
        this.StorageCapacity.series[2].data = y2
        this.StorageCapacity.series[3].data = y3
      }),
        listCapacity({
          pageNum: this.queryInfo.pageNum,
          pageSize: this.queryInfo.pageSize,
        }).then(res=>{
          console.log(res)
          const {data} = res
          const { list, total } = data
          this.tableData = list
          this.total = total
        })
    },
  }
}
</script>

<style scoped>
.KuRong {
  width: 100%;
  /*height: auto !important;*/
  position: relative;
  /*background-color: #42b983;*/
}

.Chart {
  width: 100%;
  height: 50%;
  /*background-color: #42b983;*/
  position: relative;
}

.Data {
  width: 100%;
  height: 330px;
  /*background-color: #3967FF;*/
  position: relative;
  margin-top: -5vh;
}

.Storage {
  width: 90%;
  height: 45vh;
  position: absolute;
  margin-left: 5vh;
}

</style>
