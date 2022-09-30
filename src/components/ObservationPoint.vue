<template>
  <div class="ObservationPoint">
      <div class="top" style="width: 100%;height:5vh;">
        <el-form :inline="true">
          <el-button class="principal" type="text" @click="principalInfo">负责人： {{principal.name}}</el-button>

          <el-select v-model="url" filterable placeholder="请选择监测点" @change="changePoint($event)">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
          </el-select>
          <el-date-picker
            v-model="seepageDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>

          <el-form-item>
            <el-button @click="search" type="primary" plain icon="el-icon-search">搜索</el-button>
          </el-form-item>

          <el-button type="primary" @click="exportExcelSelect">导出Excel</el-button>

        </el-form>
      </div>
      <div class="data" style="width: 100%;height: 100%;margin-top: 1vh">
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
            type="selection"
            min-width="30">
          </el-table-column>
<!--          <el-table-column
            prop="round"
            label="轮次"
            class="From"
            min-width="80"
          >
          </el-table-column> -->
          <el-table-column
            prop="point_name"
            label="监测点"
            class="From"
            min-width="40"
          >
          </el-table-column>
          <el-table-column
            prop="observation_time"
            label="观测时间"
            class="From"
            min-width="60"
          >
          </el-table-column>
<!--          <el-table-column
            prop="ordinateX"
            label="纵坐标X(m)"
            class="From"
            min-width="65"
          >
          </el-table-column>
          <el-table-column
            prop="abscissaY"
            label="横坐标Y(m)"
            class="From"
            min-width="65"
          >
          </el-table-column>
          <el-table-column
            prop="elevationH"
            label="高程H(m)"
            class="From"
            min-width="65"
          >
          </el-table-column> -->
          <el-table-column
            prop="δx_first"
            label="首轮比较δx(mm)"
            class="From"
            min-width="65"
          >
          </el-table-column>
          <el-table-column
            prop="δy_first"
            label="首轮比较δy(mm)"
            class="From"
            min-width="65"
          >
          </el-table-column>
          <el-table-column
            prop="first_plane_displacement"
            label="与首轮比较平面位移量(mm)"
            class="From"
            min-width="65"
          >
          </el-table-column>
          <el-table-column
            prop="first_vertical_displacement"
            label="与首轮比较垂直位移量(mm)"
            class="From"
            min-width="65"
          >
          </el-table-column>
          <el-table-column
            prop="δx_adjacent"
            label="相邻轮次比较δx(mm)"
            class="From"
            min-width="65"
          >
          </el-table-column>
          <el-table-column
            prop="δy_adjacent"
            label="相邻轮次比较δy(mm)"
            class="From"
            min-width="65"
          >
          </el-table-column>
          <el-table-column
            prop="adjacent_plane_displacement"
            label="相邻轮次比较平面位移量(mm)"
            class="From"
            min-width="65"
          >
          </el-table-column>
          <el-table-column
            prop="adjacent_vertical_displacement"
            label="与相邻轮次比较垂直位移量(mm)"
            class="From"
            min-width="65"
          >
          </el-table-column>
          <el-table-column
            prop="yangtze_waterlevel"
            label="长江水位(m)"
            class="From"
            min-width="65"
          >
          </el-table-column>
          <el-table-column
            prop="precipitation"
            label="降雨量(mm)"
            class="From"
            min-width="65"
          >
          </el-table-column>
          <!-- <el-table-column label="操作" min-width="100">
            <template slot-scope="scope">

              <el-button type="text" @click="openDialog(scope.row)">编辑</el-button>
              <el-divider direction="vertical"></el-divider>

              <el-popconfirm title="这是一段内容确定删除吗？" @confirm="delHandle(scope.row)">
                <el-button type="text" slot="reference">删除</el-button>
              </el-popconfirm>

            </template>
          </el-table-column> -->
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[50, 100, 500]"
          :current-page="queryInfo.pageNum"
          :page-size="queryInfo.pageSize"
          :total="total">
        </el-pagination>
      </div>

      <!--新增对话框-->
      <!-- <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        width="600px"
        :before-close="handleClose">

        <el-form :data="formData" :model="editForm" :rules="editFormRules" ref="editForm" label-width="90px"
                 class="demo-editForm">

          <el-form-item label="日期" prop="recordTime" >
            <el-date-picker
              v-model="editForm.recordTime"
              type="date"
              format="yyyy-MM"
              value-format="yyyy-MM"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="值" prop="cohesive">
            <el-input v-model="editForm.cohesive" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('editForm')">立即创建</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>

      </el-dialog> -->
      <el-dialog title="表格保存预览" width="70%" :visible.sync="selectWindow">
        <el-table :data="selectDate" id="selectTable" height="380px">
                    <el-table-column
                      prop="point_name"
                      label="监测点"
                      class="From"
                      min-width="40"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="observation_time"
                      label="观测时间"
                      class="From"
                      min-width="80"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="δx_first"
                      label="首轮比较δx(mm)"
                      class="From"
                      min-width="65"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="δy_first"
                      label="首轮比较δy(mm)"
                      class="From"
                      min-width="65"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="first_plane_displacement"
                      label="首轮比较平面位移量(mm)"
                      class="From"
                      min-width="65"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="first_vertical_displacement"
                      label="首轮比较垂直位移量(mm)"
                      class="From"
                      min-width="65"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="δx_adjacent"
                      label="相邻轮次比较δx(mm)"
                      class="From"
                      min-width="65"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="δy_adjacent"
                      label="相邻轮次比较δy(mm)"
                      class="From"
                      min-width="65"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="adjacent_plane_displacement"
                      label="相邻轮次比较平面位移量(mm)"
                      class="From"
                      min-width="65"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="adjacent_vertical_displacement"
                      label="与相邻轮次比较垂直位移量(mm)"
                      class="From"
                      min-width="65"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="yangtze_waterlevel"
                      label="长江水位(m)"
                      class="From"
                      min-width="65"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="precipitation"
                      label="降雨量(mm)"
                      class="From"
                      min-width="65"
                    >
                    </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="exportExcel">确认保存</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import {GetData} from "@/api/ObservationPoint";
  import htmlToExcel from "@/utils/htmlToExcel";
  import {val} from 'element-ui'

  export default {
    name: "ObservationPoint",
    // 添加背景色 margin:0;padding:0是为了解决vue四周有白边的问题
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
        options: [{
                  value: 'getJC17',
                  label: 'JC17'
                }, {
                  value: 'getJC18',
                  label: 'JC18'
                }, {
                  value: 'getJC19',
                  label: 'JC19'
                }, {
                  value: 'getJC21',
                  label: 'JC21'
                }, {
                  value: 'getJC22',
                  label: 'JC22'
                },{
                  value: 'getJC24',
                  label: 'JC24'
                },{
                  value: 'getJC25',
                  label: 'JC25'
                },{
                  value: 'getJC26',
                  label: 'JC26'
                },{
                  value: 'getJC28',
                  label: 'JC28'
                },{
                  value: 'getJC29',
                  label: 'JC29'
                },{
                  value: 'getJC30',
                  label: 'JC30'
                },{
                  value: 'getJC31',
                  label: 'JC31'
                },{
                  value: 'getJC37',
                  label: 'JC37'
                },{
                  value: 'getJC40',
                  label: 'JC40'
                },{
                  value: 'getJC43',
                  label: 'JC43'
                },{
                  value: 'getJC44',
                  label: 'JC44'
                },{
                  value: 'getJC45',
                  label: 'JC45'
                },{
                  value: 'getJC46',
                  label: 'JC46'
                },{
                  value: 'getJC47',
                  label: 'JC47'
                },{
                  value: 'getJC50',
                  label: 'JC50'
                },{
                  value: 'getJC51',
                  label: 'JC51'
                },{
                  value: 'getJC52',
                  label: 'JC52'
                },{
                  value: 'getJD4',
                  label: 'JD4'
                }],
        url:'getJC17',
        principal:{},
        seepageDate: [],
        selectDate: [],
        selectWindow: false,
        Record: null,
        // editForm: {
        //   recordTime:'',
        //   cohesive:'',
        // },
        queryInfo: {
          query:'',
          // 当前每页显示多少条数据
          pageSize: 50,
          // 当前的页数
          pageNum: 1,
        },
        total: 0,
        dialogTitle: null,
        dialogVisible: false,
        editFormRules: {
          recordTime: [
            {required: true, message: '请输入日期', trigger: 'blur'}
          ],
        },
        searchForm: {},
        delBtlStau: true,
        tableData: [],
        formData: {},
      }
    },
    created() {
  	window.vue=this
      this.getData()
    },
    computed: {
      getTableHeight() {
        let height = 0
        const client_height = document.documentElement.clientHeight
        console.log(client_height)
        height = client_height - 220
        return `${height}px`
      }
    },
    methods: {
      search(){
        this.getData()
      },
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
        this.selectDate = val;
      },
      handleSizeChange(newSize) {
        this.queryInfo.pageSize =newSize
        this.getData()
        console.log(`每页: ${val}`)
      },
      handleCurrentChange(val) {

        this.queryInfo.pageNum = val
        this.getData()
        console.log(`当前页: ${val}`);
      },
      resetForm(formName) {
        // this.$refs[formName].resetFields();
        this.dialogVisible = false
        this.editForm = {}
      },
      handleClose() {
        this.resetForm('editForm')
      },
      changePoint(value){
        this.getData();
      },
      principalInfo(){
                this.$alert('电话：'+this.principal.telephone+'</br>邮箱：'+this.principal.email, this.principal.name, {
                  confirmButtonText: '确定',
                  dangerouslyUseHTMLString: true,
                  callback: action => {
                    // this.$message({
                    //   type: 'info',
                    //   message: `action: ${ action }`
                    // });
                  }
                });
      },
      getData(url) {
        console.log('getData')
        let Record = null
        let recordStartTime = null
        let recordEndTime = null
        if (this.Record) Record = this.$moment(this.Record).format('YYYY-MM-DD')
        if (this.seepageDate.length === 2) {
          recordStartTime = this.$moment(this.seepageDate[0]).format('YYYY-MM-DD')
          recordEndTime = this.$moment(this.seepageDate[1]).format('YYYY-MM-DD')
        }
        GetData({
          pageNum: this.queryInfo.pageNum,
          pageSize: this.queryInfo.pageSize,
          recordStartTime: recordStartTime,
          recordEndTime: recordEndTime,
          recordTime: Record,
          url:this.url
        }).then(res => {
          console.log(res)
          // const {data} = res
          // const { list, total } = data
          if(res.status == 200){
            this.tableData = res.data.records
            this.total = res.data.total
            this.principal = res.data2
          }
          if(res.status == 400){
            this.$message.error('查询失败！');
          }

        })
      },

      // cancel(){
      //   this.dialogVisible=false
      //   this.editForm = {}
      // },
      // openDialog(row) {
      //   if (!row) {
      //     this.dialogTitle = '新增信息'
      //   } else {
      //     this.dialogTitle = '修改数据'
      //     this.editForm = row
      //   }

      //   this.dialogVisible = true
      // },
      // 新增
      // submitForm(formName) {
      //   this.$refs[formName].validate((valid) => {
      //     if (valid) {
      //       if (this.editForm.id || this.editForm.id === 0) {
      //         // 修改
      //         UpdateCohesive(this.editForm).then(res => {
      //           console.log('update', res)
      //           if (res.status === 200) {
      //             this.$message({
      //               showClose: true,
      //               message: '恭喜你，操作成功',
      //               type: 'success',
      //             })
      //             this.editForm = {}
      //             // this.$refs[formName].resetFields()
      //             delete this.editForm.id
      //             this.dialogVisible = false
      //             this.getData()
      //           }
      //           if(res.status == 400){
      //             this.$message.error('编辑失败！');
      //           }
      //         })
      //       } else {
      //         AddCohesive(this.editForm).then(res => {
      //           console.log('add', res)
      //           if (res.status === 200) {
      //             this.$message({
      //               showClose: true,
      //               message: '恭喜你，操作成功',
      //               type: 'success',
      //             })
      //             this.editForm = {}
      //             // this.$refs[formName].resetFields()
      //             this.dialogVisible = false
      //             this.getData()
      //           }
      //           if(res.status == 400){
      //             this.$message.error('添加失败！');
      //           }
      //         })
      //       }
      //     }
      //   })

      // },
      // 删除
      // delHandle(row) {
      //   console.log(row)
      //   DeleteCohesive(row.id).then(res => {
      //     console.log('delete', res)
      //     if (res.status === 200) {
      //       this.$message({
      //         showClose: true,
      //         message: '恭喜你，操作成功',
      //         type: 'success',
      //       })

      //       this.dialogVisible = false
      //       this.getData()
      //     }

      //   })
      // },
      // 导出
      exportExcelSelect() {
        if (this.selectDate.length < 1) {
          this.$message.error('请选择要导出的内容！');
          return false;
        }
        this.selectWindow = true
      },
      exportExcel(){
        htmlToExcel.getExcel('#selectTable','粘聚力数据')
      }
    }
  }
</script>

<style scoped>
.ObservationPoint{
  height: auto !important;
}
.el-pagination {
  float: right;
  margin-top: 20px;
}

.From {
  width: 110px;
}
.principal{
    margin-right: 100px;
}
</style>
