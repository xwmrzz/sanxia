<template>
  <div class="WaterLevel">
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
          <el-button @click="search" type="primary" plain icon="el-icon-search">搜索</el-button>
        </el-form-item>


        <el-form-item>
          <el-button type="primary" @click="openDialog(null)">新增</el-button>
        </el-form-item>


<!--        <el-form-item>-->
<!--          <el-popconfirm title="这里确定批量删除吗?" @confirm="">-->
<!--            <el-button type="danger" slot="reference" :disabled="delBtlStau">批量删除</el-button>-->
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
          min-width="30">
        </el-table-column>
        <el-table-column
          prop="recordTime"
          label="记录时间"
          class="From"
          min-width="80"
        >
        </el-table-column>
        <el-table-column
          prop="waterLevels"
          label="水位/㎜"
          class="From"
          min-width="70"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" min-width="100">
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
      </el-pagination>
    </div>


    <!--新增对话框-->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose">

      <el-form :model="emp" :rules="editFormRules" ref="emp" label-width="90px"
               class="demo-editForm">

        <el-form-item label="日期" prop="recordTime" >
          <el-date-picker
            v-model="emp.recordTime"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="水位" prop="waterLevels">
          <el-input v-model="emp.waterLevels" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('emp')">立即创建</el-button>
          <el-button @click="resetForm('editForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="表格保存预览" width="70%" :visible.sync="selectWindow">
      <el-table :data="selectDate" id="selectTable" height="380px">
        <el-table-column
          prop="recordTime"
          label="记录时间"
        >
        </el-table-column>
        <el-table-column
          prop="waterLevels"
          label="水位/㎜"
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
import {addWaterlv, deleteWaterlv, listWaterlv, updateWaterlv} from "@/api/waterlv/waterlv";
import htmlToExcel from "@/utils/htmlToExcel";

export default {
  name: "WaterLeveIData",
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
      Record: null,
      dialogTitle: null,
      emp:{
        recordTime:'',
        waterLevels:''
      },
      queryInfo: {
        query:'',
        // 当前每页显示多少条数据
        pageSize: 100,
        // 当前的页数
        pageNum: 1,
      },
      total: 0,
      dialogVisible: false,
      editForm: {},
      editFormRules: {
        recordTime: [
          {required: true, message: '请输入日期', trigger: 'blur'}
        ],
        waterLevels: [
          {required: true, message: '请输入水位', trigger: 'blur'}
        ],
      },
      searchForm: {},
      delBtlStau: true,
      tableData: [],
      formData: {},
    }
  },
  created() {
    this.getwaterlv()
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
      this.getwaterlv()
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
      console.log("selectDate"),
      console.log(this.selectDate)
    },
    handleSizeChange(newSize) {
      this.queryInfo.pageSize =newSize
      this.getwaterlv()
    },
    handleCurrentChange(val) {
      this.queryInfo.pageNum = val
      this.getwaterlv()
      console.log(`当前页: ${val}`);
    },
    resetForm(formName) {
      // this.$refs[formName].resetFields();
      this.dialogVisible = false
      this.emp = {}
    },
    handleClose() {
      this.resetForm('editForm')
    },
    getwaterlv() {
      let Record = null
      let recordStartTime = null
      let recordEndTime = null
      console.log(this.Record)
      if (this.Record) Record = this.$moment(this.Record).format('YYYY-MM-DD')
      if (this.seepageDate.length === 2) {
        recordStartTime = this.$moment(this.seepageDate[0]).format('YYYY-MM-DD')
        recordEndTime = this.$moment(this.seepageDate[1]).format('YYYY-MM-DD')
      }
      listWaterlv({
        pageNum: this.queryInfo.pageNum,
        pageSize: this.queryInfo.pageSize,
        recordStartTime: recordStartTime,
        recordEndTime: recordEndTime,
        recordTime: Record,
      }).then(res => {
        console.log(res)
        const {data} = res
        const { list, total } = data
        this.tableData = list
        this.total = total
      })
    },
    openDialog(row) {
      if (!row) {
        this.dialogTitle = '新增信息'
      } else {
        this.dialogTitle = '修改数据'
        this.emp = row
      }

      this.dialogVisible = true
    },
    // 新增
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.emp.id || this.emp.id === 0) {
            // 修改
            updateWaterlv(this.emp).then(res => {
              console.log('update', res)

              if (res.status === 200) {
                this.$message({
                  showClose: true,
                  message: '恭喜你，操作成功',
                  type: 'success',
                })
                this.emp = {}
                this.$refs[formName].resetFields()
                delete this.emp.id
                this.dialogVisible = false
                this.getwaterlv()
              }
            })
          } else {
            addWaterlv(this.emp).then(res => {
              console.log('add', res)

              if (res.status === 200) {
                this.$message({
                  showClose: true,
                  message: '恭喜你，操作成功',
                  type: 'success',
                })
                this.emp = {}
                this.$refs[formName].resetFields()
                this.dialogVisible = false
                this.getwaterlv()
              }
            })
          }
        }
      })

    },
    // 删除
    delHandle(row) {
      console.log(row)
      deleteWaterlv(row.id).then(res => {
        console.log('delete', res)
        if (res.status === 200) {
          this.$message({
            showClose: true,
            message: '恭喜你，操作成功',
            type: 'success',
          })

          this.dialogVisible = false
          this.getwaterlv()
        }

      })
    },
    exportExcelSelect() {
      if (this.selectDate.length < 1) {
        this.$message.error('请选择要导出的内容！');
        return false;
      }
      this.selectWindow = true
    },
    exportExcel(){
      htmlToExcel.getExcel('#selectTable','水位数据')
    }
  }
}
</script>

<style scoped>
.WaterLevel{
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
