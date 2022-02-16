<template>
  <div class="SeepageFlow">
<!--渗流量-->
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
          label="观测时间"
          class="From"
          min-width="80"
        >
        </el-table-column>
        <el-table-column
          prop="seepageFlow"
          label="渗流量/㎜"
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

      <el-form :model="field" :rules="editFormRules" ref="field" label-width="90px"
               class="demo-editForm">

        <el-form-item label="日期" prop="recordTime">
          <el-date-picker
            v-model="field.recordTime"
            type="month"
            format="yyyy-MM"
            value-format="yyyy-MM"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="渗流量" prop="seepageFlow">
          <el-input v-model="field.seepageFlow" autocomplete="off"></el-input>
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
          label="观测时间"
        >
        </el-table-column>
        <el-table-column
          prop="seepageFlow"
          label="渗流量/㎜"
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
import {addMSeepage, allMSeepage, deleteMSeepage, updateMSeepage} from "@/api/seepage/seepage";
import htmlToExcel from "@/utils/htmlToExcel";


export default {
  name: "SeepageFlowdata",
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
      field: {
        recordTime: '',
        seepageFlow: ''
      },
      queryInfo: {
        query: '',
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
        seepageFlow: [
          {required: true, message: '请输入渗流量', trigger: 'blur'}
        ],
      },
      searchForm: {},
      delBtlStau: true,
      tableData: [],
      formData: {},
    }
  },
  created() {
    this.getSeepage()
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
    search() {
      this.getSeepage()
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
      this.getSeepage()
      console.log(`每页: ${val}`)
    },

    handleCurrentChange(val) {
      this.queryInfo.pageNum = val
      this.getSeepage()
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
    getSeepage() {
      console.log('getSeepage')
      let Record = null
      let recordStartTime = null
      let recordEndTime = null
      console.log(this.Record)
      if (this.Record) Record = this.$moment(this.Record).format('YYYY-MM')
      if (this.seepageDate.length === 2) {
        recordStartTime = this.$moment(this.seepageDate[0]).format('YYYY-MM')
        recordEndTime = this.$moment(this.seepageDate[1]).format('YYYY-MM')
      }

      allMSeepage({
        pageNum: this.queryInfo.pageNum,
        pageSize: this.queryInfo.pageSize,
        recordStartTime: recordStartTime,
        recordEndTime: recordEndTime,
        recordTime: Record,
      }).then(res => {
        console.log(res)
        const {data} = res
        const {list, total} = data
        this.tableData = list
        this.total = total
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
    // 新增
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.field.id || this.field.id === 0) {
            // 修改
            updateMSeepage(this.field).then(res => {
              console.log('update', res)
              if (res.status === 200) {
                this.$message({
                  showClose: true,
                  message: '恭喜你，操作成功',
                  type: 'success',
                })
                this.field={}
                // this.$refs[formName].resetFields()
                delete this.field.id
                this.dialogVisible = false
                this.getSeepage()
              }
            })
          } else {
            addMSeepage(this.field).then(res => {
              console.log('add', res)

              if (res.status === 200) {
                this.$message({
                  showClose: true,
                  message: '恭喜你，操作成功',
                  type: 'success',
                })
                this.field={}
                // this.$refs[formName].resetFields()
                this.dialogVisible = false
                this.getSeepage()
              }
            })
          }
        }
      })
    },
    // 删除
    delHandle(row) {
      console.log(row)
      deleteMSeepage(row.id).then(res => {
        console.log('delete', res)
        if (res.status === 200) {
          this.$message({
            showClose: true,
            message: '恭喜你，操作成功',
            type: 'success',
          })

          this.dialogVisible = false
          this.getSeepage()
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
      htmlToExcel.getExcel('#selectTable','渗流量数据')
    }

  }
}
</script>

<style scoped>
.SeepageFlow {
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
