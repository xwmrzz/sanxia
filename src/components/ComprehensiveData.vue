<template @touchmove.prevent>
  <!--  综合数据-->
  <div class="Synthesis" style="height: auto;">
    <div class="top" style="width: 100%;height:5vh;">
      <el-form :inline="true">
        <el-date-picker
          v-model="seepageDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>

        <el-form-item>
          <el-date-picker
            v-model="Record"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button @click="search" type="primary" plain icon="el-icon-search">搜索</el-button>
        </el-form-item>


        <el-form-item>
          <el-button type="primary" @click="openDialog(null)">新增</el-button>
        </el-form-item>
<!--        <el-form-item>-->
<!--          <el-popconfirm title="这里确定批量删除吗?" @click=delHandle(selectDate)>-->
<!--            <el-button type="danger" slot="reference" >批量删除</el-button>-->
<!--          </el-popconfirm>-->
<!--        </el-form-item>-->
        <el-button type="primary" @click="exportExcelSelect">导出Excel</el-button>
      </el-form>
    </div>
    <div class="data" style="width: 100%;height: 100%;margin-top: 10px">
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
          width="55">
        </el-table-column>
        <el-table-column
          prop="recordTime"
          label="日期"
          class="From"
        >
        </el-table-column>
        <el-table-column
          prop="upWaterLevel"
          label="上游水位"
          class="From"
        >
        </el-table-column>
        <el-table-column
          prop="downWaterLevel"
          label="下游水位"
          class="From"
        >
        </el-table-column>
        <el-table-column
          prop="deliveryHead"
          label="堰上水头"
          class="From"
        >
        </el-table-column>
        <el-table-column
          prop="actualWaterFlow"
          label="实测流量"
          class="From"
        >
        </el-table-column>
        <el-table-column
          prop="standardWaterFlow"
          label="标准流量"
          class="From"
        >
        </el-table-column>
        <el-table-column
          prop="waterVolume"
          label="水量"
          class="From"
        >
        </el-table-column>
        <el-table-column
          prop="waterTemperature"
          label="水温"
          class="From"
        >
        </el-table-column>
        <el-table-column
          prop="airTemperature"
          label="气温"
          class="From"
        >
        </el-table-column>
        <el-table-column
          prop="preciPitation"
          label="降雨量"
          class="From"

          show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">

            <el-button type="text" @click="openDialog(scope.row)">编辑</el-button>
            <el-divider direction="vertical"></el-divider>

            <el-popconfirm title="这是一段内容确定删除吗？" @confirm="delHandle(scope.row)">
              <el-button type="text" slot="reference">删除</el-button>
            </el-popconfirm>

          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[100, 200, 300]"
        :current-page="queryInfo.pageNum"
        :page-size="queryInfo.pageSize"
        :total="total">
        <!--        :page-sizes="queryInfo.pageSizes"-->
      </el-pagination>

    </div>

    <!--新增对话框-->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <el-form :model="field" :rules="editFormRules" ref="field" label-width="90px"
               class="demo-editForm">
        <el-form-item label="日期" prop="recordTime">
          <el-date-picker
            v-model="field.recordTime"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="上游水位" prop="upWaterLevel">
          <el-input v-model="field.upWaterLevel" prefix-icon="el-icon-edit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="下游水位" prop="downWaterLevel">
          <el-input v-model="field.downWaterLevel" prefix-icon="el-icon-edit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="堰上水头" prop="deliveryHead">
          <el-input v-model="field.deliveryHead" prefix-icon="el-icon-edit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="实测流量" prop="actualWaterFlow">
          <el-input v-model="field.actualWaterFlow" prefix-icon="el-icon-edit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="标准流量" prop="standardWaterFlow">
          <el-input v-model="field.standardWaterFlow" prefix-icon="el-icon-edit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="水量" prop="waterVolume">
          <el-input v-model="field.waterVolume" prefix-icon="el-icon-edit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="水温" prop="waterTemperature">
          <el-input v-model="field.waterTemperature" prefix-icon="el-icon-edit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="气温" prop="airTemperature">
          <el-input v-model="field.airTemperature" prefix-icon="el-icon-edit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="降雨量" prop="preciPitation">
          <el-input v-model="field.preciPitation" prefix-icon="el-icon-edit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('field')">立即创建</el-button>
          <el-button @click="resetForm('editForm')">取消</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>
    <!--    选择后的导出预览表格-->
    <el-dialog title="表格保存预览" width="70%" :visible.sync="selectWindow">
      <el-table :data="selectDate" id="selectTable" height="380px">
        <el-table-column
          prop="recordTime"
          label="日期"
        >
        </el-table-column>
        <el-table-column
          prop="upWaterLevel"
          label="上游水位"
        >
        </el-table-column>
        <el-table-column
          prop="downWaterLevel"
          label="下游水位"
        >
        </el-table-column>
        <el-table-column
          prop="deliveryHead"
          label="堰上水头"
        >
        </el-table-column>
        <el-table-column
          prop="actualWaterFlow"
          label="实测流量"
        >
        </el-table-column>
        <el-table-column
          prop="standardWaterFlow"
          label="标准流量"
        >
        </el-table-column>
        <el-table-column
          prop="waterVolume"
          label="水量"
        >
        </el-table-column>
        <el-table-column
          prop="waterTemperature"
          label="水温"
        >
        </el-table-column>
        <el-table-column
          prop="airTemperature"
          label="气温"
        >
        </el-table-column>
        <el-table-column
          prop="preciPitation"
          label="降雨量"
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
import {
  addSeepage,
  deleteSeepage,
  getSeepage,
  listSeepage,
  updateSeepage
} from "@/api/ComprehensiveData/ComprehensiveData";
import htmlToExcel from "@/utils/htmlToExcel";

export default {
  name: "ComprehensiveData",
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
      seepageDate: [],
      selectDate: [],
      selectWindow: false,
      id:[],
      Record: null,
      field: {
        recordTime: '',
        upWaterLevel: '',
        downWaterLevel: '',
        deliveryHead: '',
        actualWaterFlow: '',
        standardWaterFlow: '',
        waterVolume: '',
        waterTemperature: '',
        airTemperature: '',
        preciPitation: ''
      },
      queryInfo: {
        // 当前每页显示多少条数据
        pageSize: 100,
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
        // upWaterLevel: [
        //   {required: true, message: '请输入上游水位', trigger: 'blur'}
        // ],
        // downWaterLevel: [
        //   {required: true, message: '请输入下游水位', trigger: 'blur'}
        // ],
        // deliveryHead: [
        //   {required: true, message: '请输入堰上水头', trigger: 'blur'}
        // ],
        // actualWaterFlow: [
        //   {required: true, message: '请输入实测流量', trigger: 'blur'}
        // ],
        // standardWaterFlow: [
        //   {required: true, message: '请输入标准流量', trigger: 'blur'}
        // ],
        // waterVolume: [
        //   {required: true, message: '请输入水量', trigger: 'blur'}
        // ],
        // waterTemperature: [
        //   {required: true, message: '请输入水温', trigger: 'blur'}
        // ],
        // airTemperature: [
        //   {required: true, message: '请输入气温', trigger: 'blur'}
        // ],
        // preciPitation: [
        //   {required: true, message: '请输入降雨量', trigger: 'blur'}
        // ],
      },
      searchForm: {},
      delBtlStau: true,
      tableData: [],
      formData: {},
    }
  },
  created() {
    this.getComprehensiveData()
    // this.getcreated()
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
    // 查询
    search() {
      this.getComprehensiveData()
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
      this.queryInfo.pageSize = newSize
      this.getComprehensiveData()
      console.log(`每页: ${val}`)
    },

    handleCurrentChange(val) {
      this.queryInfo.pageNum = val
      this.getComprehensiveData()
      console.log(`当前页: ${val}`);
    },
    resetForm(formName) {
      // this.$refs[formName].resetFields();
      this.dialogVisible = false
      this.field = {}
    },
    handleClose() {
      this.resetForm('editForm')
    },
    getComprehensiveData() {
      console.log('getComprehensiveData')
      let Record = null
      let recordStartTime = null
      let recordEndTime = null
      console.log(this.Record)
      if (this.Record) Record = this.$moment(this.Record).format('YYYY-MM-DD')
      if (this.seepageDate.length === 2) {
        recordStartTime = this.$moment(this.seepageDate[0]).format('YYYY-MM-DD')
        recordEndTime = this.$moment(this.seepageDate[1]).format('YYYY-MM-DD')
      }
      listSeepage({
        pageNum: this.queryInfo.pageNum,
        pageSize: this.queryInfo.pageSize,
        recordStartTime: recordStartTime,
        recordEndTime: recordEndTime,
        recordTime: Record,
      }).then(res => {
        console.log(res)
        const {data} = res
        const {list, total} = data
        this.total = total
        this.tableData = list

      })
    },

    openDialog(row) {
      if (!row) {
        this.dialogTitle = '新增信息'
      } else {
        this.dialogTitle = '修改数据'
        this.field = row
      }

      this.dialogVisible = true
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.field.id || this.field.id === 0) {
            // 修改
            updateSeepage(this.field).then(res => {
              console.log('update', res)

              if (res.status === 200) {
                this.$message({
                  showClose: true,
                  message: '恭喜你，操作成功',
                  type: 'success',
                })
                this.field = {}
                // this.$refs[formName].resetFields()
                delete this.field.id
                this.dialogVisible = false
                this.getComprehensiveData()
              }
            })
          } else {
            addSeepage(this.field).then(res => {
              console.log('add', res)

              if (res.status === 200) {
                this.$message({
                  showClose: true,
                  message: '恭喜你，操作成功',
                  type: 'success',
                })
                this.field = {}
                // this.$refs[formName].resetFields()
                this.dialogVisible = false
                this.getComprehensiveData()
              }
            })
          }
        }
      })

    },
    // 删除
    delHandle(row) {
      console.log(row)
      deleteSeepage(row.id).then(res => {
        console.log('delete', res)
        if (res.status === 200) {
          this.$message({
            showClose: true,
            message: '恭喜你，操作成功',
            type: 'success',
          })

          this.dialogVisible = false
          this.getComprehensiveData()
        }
      })
    },
    // 导出
    exportExcelSelect() {
      if (this.selectDate.length < 1) {
        this.$message.error('请选择要导出的内容！');
        return false;
      }
      this.selectWindow = true
    },
    exportExcel(){
      htmlToExcel.getExcel('#selectTable','综合数据')
    }
  }
}
</script>

<style scoped>
.Synthesis {
  height: auto !important;
}

.el-pagination {
  float: right;
  margin-top: 20px;
}

.From {
  width: 110px;
}

</style>
