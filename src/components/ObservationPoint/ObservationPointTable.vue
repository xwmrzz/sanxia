<template>
  <div id="ObservationPointTable" style="width:90%;margin-left: 5%;">

    <el-table
        :cell-style="cellColor"
        :header-cell-style="{ color: '#ffffff' }"
        :data="tableData"
        :height="tableHeight"
        border
        style="width: 100%">
        <el-table-column
          prop="point_name"
          label="监测站"
          width="100">
        </el-table-column>
        <el-table-column
          prop="principal"
          label="负责人"
          width="100">
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态">
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
  import {getPointList} from "@/api/ObservationPoint/ObservationPointTable";
  export default {
    name: "ObservationPointTable",
    data() {
      return {
        tableData: [],
        tableHeight:"",
      }
    },
    created() {
      this.getTableHeight();
    },
    mounted(){
      this.getTableData();
      // window.onresize = () => {
      //   return (() => {
      //       this.getTableHeight();
      //     })();
      //   };
      window.addEventListener("resize", ()=> {
                             this.getTableHeight();
                          })
    },
    methods: {
      getTableHeight() {
            let tableH = 575; //距离页面下方的高度
            let tableHeightDetil = window.innerHeight*0.28;
            if (tableHeightDetil <= 100) {
              this.tableHeight = 100;
            } else {
              this.tableHeight = tableHeightDetil;
            }
          },
      cellColor({row, column, rowIndex, columnIndex}){
        if(row.state=="离线"){
          return 'color: #ff0000'
        }
        if(row.state=="在线"){
          return 'color: #00ff00'
        }
      },
      getTableData(){
        getPointList().then(res=>{
          console.log(res);
          res.data.forEach(function(item,index){
              if(item.state==1){
                item.state="在线"
              }
              if(item.state==0){
                item.state="离线"
              }
          })
          if(res.status == 200){
            this.tableData = res.data
          }
          if(res.status == 400){
            console.log("监测点查询失败");
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
/*最外层透明*/
::v-deep .el-table,
::v-deep .el-table__expanded-cell {
  background-color: transparent !important;
}
/* 表格内背景颜色 */
::v-deep .el-table th,
::v-deep .el-table tr,
::v-deep .el-table td {
  background-color: transparent !important;
}
// /*表格滚动条和字体颜色*/
// ::v-deep .el-table{
//   border-bottom: 0;
//   color: hsla(0,0%,100%,.6);
//   /* 设置滚动条的样式 */
//   ::-webkit-scrollbar{
//     width: 13px; /*滚动条粗细*/
//     }
//   /* 滚动槽 */
//   ::-webkit-scrollbar-track{
//     -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
//     border-radius: 20px;
//     }
//   /* 滚动条滑块 */
//   ::-webkit-scrollbar-thumb{
//     border-radius: 10px;
//     background: rgba(85, 255, 255, 0.7);
//     -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.7);
//     }
//   }

::v-deep .el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf{
  border-bottom-width: 0px;
}
::v-deep.el-table--border .el-table__cell, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
  border-right-width: 0px;
}
::v-deep.el-table::before {
  height: 0px;
}
::v-deep.el-table--border::after {
  width: 0px;
}
::v-deep.el-table--border {
  border: none;
}
</style>
