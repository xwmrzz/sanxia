<template>
  <div class="Horizontal">
    <div class="top" style="width: 100%;height:5vh;">
      <el-form :inline="true">
        <el-date-picker
          v-model="seepageDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>

        <el-select v-model="selectVal" placeholder="请选择" @change="selectChange">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

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
        <el-table-column
          prop="recordTime"
          label="记录时间"
          class="From"
          min-width="100"
        >
        </el-table-column>
        <el-table-column
          prop="pastRecords"
          label="历时"
          class="From"
          min-width="80"
        >
        </el-table-column>
        <el-table-column
          prop="ma1"
          label="MA1"
          class="From"
          min-width="80"
        >
        </el-table-column>
        <el-table-column
          prop="ma2"
          label="MA2"
          class="From"
          min-width="80"
        >
        </el-table-column>
        <el-table-column
          prop="ma3"
          label="MA3"
          class="From"
          min-width="80"
        >
        </el-table-column>
        <el-table-column
          prop="ma4"
          label="MA4"
          class="From"
          min-width="80"
        >
        </el-table-column>
        <el-table-column
          prop="ma5"
          label="MA5"
          class="From"
          min-width="80"
        >
        </el-table-column>
        <el-table-column
          prop="ma6"
          label="MA6"
          class="From"
          min-width="80"
        >
        </el-table-column>
        <el-table-column
          prop="mb1"
          label="MB1"
          class="From"
          min-width="80"
        >
        </el-table-column>
        <el-table-column
          prop="mb2"
          label="MB2"
          class="From"
          min-width="80"
        >
        </el-table-column>
        <el-table-column
          prop="mb3"
          label="MB3"
          class="From"
          min-width="80"
        >
        </el-table-column>
        <el-table-column
          prop="mb4"
          label="MB4"
          class="From"
          min-width="80"
        >
        </el-table-column>
        <el-table-column
          prop="mc1"
          label="MC1"
          class="From"
          min-width="80"
        >
        </el-table-column>
        <el-table-column
          prop="mc2"
          label="MC2"
          class="From"
          min-width="80"
        >
        </el-table-column>
        <el-table-column
          prop="mc3"
          label="MC3"
          class="From"
          min-width="80"
        >
        </el-table-column>
        <el-table-column
          prop="md1"
          label="MD1"
          class="From"
          min-width="80"
        >
        </el-table-column>
        <el-table-column
          prop="md2"
          label="MD2"
          class="From"
          min-width="80"
        >
        </el-table-column>
        <el-table-column
          prop="me1"
          label="ME1"
          class="From"
          min-width="80"
        >
        </el-table-column>
        <el-table-column
          prop="me2"
          label="ME2"
          class="From"
          min-width="80"
        >
        </el-table-column>
        <el-table-column
          prop="me3"
          label="ME3"
          class="From"
          min-width="80"
        >
        </el-table-column>
        <el-table-column
          prop="me4"
          label="ME4"
          class="From"
          min-width="80"
        >
        </el-table-column>
        <el-table-column
          prop="me5"
          label="ME5"
          class="From"
          min-width="80"
        >
        </el-table-column>
        <el-table-column
          prop="mf1"
          label="MF1"
          class="From"
          min-width="80"
        >
        </el-table-column>
        <el-table-column
          prop="mf2"
          label="MF2"
          class="From"
          min-width="80"
        >
        </el-table-column>
        <el-table-column
          prop="mf3"
          label="MF3"
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

      <el-form  :model="editForm" :rules="editFormRules" ref="editForm" label-width="90px"
               class="demo-editForm">

        <el-form-item label="日期" prop="recordTime" >
          <el-date-picker
            v-model="editForm.recordTime"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="历时" prop="pastRecords">
          <el-input v-model="editForm.pastRecords" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="MA1" prop="ma1">
          <el-input v-model="editForm.ma1" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="MA2" prop="ma2">
          <el-input v-model="editForm.ma2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="MA3" prop="ma3">
          <el-input v-model="editForm.ma3" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="MA4" prop="ma4">
          <el-input v-model="editForm.ma4" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="MA5" prop="ma5">
          <el-input v-model="editForm.ma4" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="MA6" prop="ma6">
          <el-input v-model="editForm.ma6" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="MB1" prop="mb1">
          <el-input v-model="editForm.mb1" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="MB2" prop="mb2">
          <el-input v-model="editForm.mb2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="MB3" prop="mb3">
          <el-input v-model="editForm.mb3" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="MB4" prop="mb4">
          <el-input v-model="editForm.mb4" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="MC1" prop="mc1">
          <el-input v-model="editForm.mc1" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="MC2" prop="mc2">
          <el-input v-model="editForm.mc2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="MC3" prop="mc3">
          <el-input v-model="editForm.mc3" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="MD1" prop="md1">
          <el-input v-model="editForm.md1" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="MD2" prop="md2">
          <el-input v-model="editForm.md2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="ME1" prop="me1">
          <el-input v-model="editForm.me1" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="ME2" prop="me2">
          <el-input v-model="editForm.me2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="ME3" prop="me3">
          <el-input v-model="editForm.me3" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="ME4" prop="me4">
          <el-input v-model="editForm.me4" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="ME5" prop="me5">
          <el-input v-model="editForm.me5" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="MF1" prop="mf1">
          <el-input v-model="editForm.mf1" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="MF2" prop="mf2">
          <el-input v-model="editForm.mf2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="MF3" prop="mf3">
          <el-input v-model="editForm.mf3" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('editForm')">立即创建</el-button>
          <el-button @click="resetForm('editForm')">取消</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>
<!--    导出弹出框-->
    <el-dialog title="表格保存预览" width="70%" :visible.sync="selectWindow">
      <el-table :data="selectDate" id="selectTable" height="380px">
        <el-table-column
          prop="recordTime"
          label="日期"
        >
        </el-table-column>
        <el-table-column
          label="历时"
          prop="pastRecords"
        >
        </el-table-column>
        <el-table-column
          label="MA1"
          prop="ma1"
        >
        </el-table-column>
        <el-table-column
          label="MA2" prop="ma2"
        >
        </el-table-column>
        <el-table-column
          label="MA3" prop="ma3"
        >
        </el-table-column>
        <el-table-column
          label="MA4" prop="ma4"
        >
        </el-table-column>
        <el-table-column
          label="MA5" prop="ma5"
        >
        </el-table-column>
        <el-table-column
          label="MA6" prop="ma6"
        >
        </el-table-column>
        <el-table-column
          label="MB1" prop="mb1"
        >
        </el-table-column>
        <el-table-column
          label="MB2" prop="mb2"
        >
        </el-table-column>
        <el-table-column
          label="MB3" prop="mb3"
        >
        </el-table-column>
        <el-table-column
          label="MB4" prop="mb4"
        >
        </el-table-column>
        <el-table-column
          label="MC1" prop="mc1"
        >
        </el-table-column>
        <el-table-column
          label="MC2" prop="mc2"
        >
        </el-table-column>
        <el-table-column
          label="MC3" prop="mc3"
        >
        </el-table-column>
        <el-table-column
          label="MD1" prop="md1"
        >
        </el-table-column>
        <el-table-column
          label="MD2" prop="md2"
        >
        </el-table-column>
        <el-table-column
          label="ME1" prop="me1"
        >
        </el-table-column>
        <el-table-column
          label="ME2" prop="me2"
        >
        </el-table-column>
        <el-table-column
          label="ME3" prop="me3"
        >
        </el-table-column>
        <el-table-column
          label="ME4" prop="me4"
        >
        </el-table-column>
        <el-table-column
          label="ME5" prop="me5"
        >
        </el-table-column>
        <el-table-column
          label="MF1" prop="mf1"
        >
        </el-table-column>
        <el-table-column
          label="MF2" prop="mf2"
        >
        </el-table-column>
        <el-table-column
          label="MF3" prop="mf3"
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


import {addDHorizontal, deleteDHorizontal, listDHorizontal, updateDHorizontal} from "@/api/Displacement/MonthlyLevel";
import {listYHorizontal} from "@/api/Displacement/AnnualLevel";
import {listYVertical} from "@/api/Displacement/AnnualLongitudinal";
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
      selectVal: 'day',
      seepageDate: [],
      selectDate: [],
      selectWindow: false,
      Record: null,
      editForm: {
        recordTime:'',
        pastRecords:'',
        ma1:'',
        ma2:'',
        ma3:'',
        ma4:'',
        ma5:'',
        ma6:'',
        mb1:'',
        mb2:'',
        mb3:'',
        mb4:'',
        mc1:'',
        mc2:'',
        mc3:'',
        md1:'',
        md2:'',
        me1:'',
        me2:'',
        me3:'',
        me4:'',
        me5:'',
        mf1:'',
        mf2:'',
        mf3:''
      },
      options: [{
        value: 'day',
        label: '日位移数据'
      }, {
        value: 'year',
        label: '年位移数据'
      },],
      queryInfo: {
        query:'',
        // 当前每页显示多少条数据
        pageSize: 100,
        // 当前的页数
        pageNum: 1,
      },
      total: 0,
      dialogVisible: false,
      dialogTitle: null,

      editFormRules: {
        recordTime: [
          {required: true, message: '请输入日期', trigger: 'blur'}
        ],
        pastRecords: [
          {required: true, message: '历时', trigger: 'blur'}
        ],

      },
      searchForm: {},
      delBtlStau: true,
      tableData: [],
      formData: {},
    }
  },
  created() {
    if (this.selectVal === 'day') {
      this.getMonthLevel()
    } else {
      this.getAnnualLevel()
    }

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
    selectChange(val) {
      console.log(val)
      this.selectVal = val
      if (this.selectVal === 'day') {
        this.getMonthLevel()
      } else {
        this.getAnnualLevel()
      }
    },
    search(){
      this.getMonthLevel()
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
      this.getMonthLevel()
      console.log(`每页: ${val}`)

    },
    handleCurrentChange(val) {
      this.queryInfo.pageNum = val
      this.getMonthLevel()
      console.log(`当前页: ${val}`);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false
      this.editForm = {}
    },
    handleClose() {
      this.resetForm('editForm')
    },
    // 日水平
    getMonthLevel() {
      console.log('getMonthLevel')
      let Record = null
      let recordStartTime = null
      let recordEndTime = null
      console.log(this.Record)
      if (this.Record) Record = this.$moment(this.Record).format('YYYY-MM-DD')
      if (this.seepageDate.length === 2) {
        recordStartTime = this.$moment(this.seepageDate[0]).format('YYYY-MM-DD')
        recordEndTime = this.$moment(this.seepageDate[1]).format('YYYY-MM-DD')
      }
      listDHorizontal({
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
// 年水平
    getAnnualLevel() {
      console.log('getAnnualLevel')
      let Record = null
      let recordStartTime = null
      let recordEndTime = null
      console.log(this.Record)
      if (this.Record) Record = this.$moment(this.Record).format('YYYY-MM-DD')
      if (this.seepageDate.length === 2) {
        recordStartTime = this.$moment(this.seepageDate[0]).format('YYYY-MM-DD')
        recordEndTime = this.$moment(this.seepageDate[1]).format('YYYY-MM-DD')
      }
      listYHorizontal({
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
        this.editForm = row
      }

      this.dialogVisible = true
    },
    // 新增
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.editForm.id || this.editForm.id === 0) {
            // 修改
            updateDHorizontal(this.editForm).then(res => {
              console.log('update', res)

              if (res.status === 200) {
                this.$message({
                  showClose: true,
                  message: '恭喜你，操作成功',
                  type: 'success',
                })
                this.editForm = {}
                // this.$refs[formName].resetFields()
                delete this.editForm.id
                this.dialogVisible = false
                this.getMonthLevel()
              }
            })
          } else {
            addDHorizontal(this.editForm).then(res => {
              console.log('add', res)

              if (res.status === 200) {
                this.$message({
                  showClose: true,
                  message: '恭喜你，操作成功',
                  type: 'success',
                })
                this.editForm = {}
                // this.$refs[formName].resetFields()
                this.dialogVisible = false
                this.getMonthLevel()
              }
            })
          }
        }
      })

    },
// 删除
    delHandle(row) {
      console.log(row)
      deleteDHorizontal(row.id).then(res => {
        console.log('delete', res)
        if (res.status === 200) {
          this.$message({
            showClose: true,
            message: '恭喜你，操作成功',
            type: 'success',
          })

          this.dialogVisible = false
          this.getMonthLevel()
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
      htmlToExcel.getExcel('#selectTable','水平位移数据')
    }
  }
}
</script>

<style scoped>
.Horizontal{
  height: auto!important;
}
.el-pagination {
  float: right;
  margin-top: 20px;
}

.From {
  width: 110px;
}
</style>
