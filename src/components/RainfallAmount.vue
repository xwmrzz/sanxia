<template>
  <div class="RainfallAmount">
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
          prop="jiuDu"
          label="九都/㎜"
          class="From"
          min-width="65"
        >
        </el-table-column>
        <el-table-column
          prop="yangShang"
          label="洋上/㎜"
          class="From"
          min-width="65"
        >
        </el-table-column>
        <el-table-column
          prop="waiShan"
          label="外山/㎜"
          class="From"
          min-width="65"
        >
        </el-table-column>
        <el-table-column
          prop="huYang"
          label="湖洋/㎜"
          class="From"
          min-width="65"
        >
        </el-table-column>
        <el-table-column
          prop="daXi"
          label="大溪/㎜"
          class="From"
          min-width="65"
        >
        </el-table-column>
        <el-table-column
          prop="ziMei"
          label="紫美/㎜"
          class="From"
          min-width="65"
        >
        </el-table-column>
        <el-table-column
          prop="suKeng"
          label="苏坑/㎜"
          class="From"
          min-width="65"
        >
        </el-table-column>
        <el-table-column
          prop="jinXi"
          label="锦溪/㎜"
          class="From"
          min-width="65"
        >
        </el-table-column>
        <el-table-column
          prop="pengHu"
          label="蓬壶/㎜"
          class="From"
          min-width="65"
        >
        </el-table-column>
        <el-table-column
          prop="mengHu"
          label="猛虎/㎜"
          class="From"
          min-width="65"
        >
        </el-table-column>
        <el-table-column
          prop="daZhong"
          label="达中/㎜"
          class="From"
          min-width="65"
        >
        </el-table-column>
        <el-table-column
          prop="daQing"
          label="大卿/㎜"
          class="From"
          min-width="65"
        >
        </el-table-column>
        <el-table-column
          prop="baShang"
          label="坝上/㎜"
          class="From"
          min-width="65"
        >
        </el-table-column>
        <el-table-column
          prop="yongChun"
          label="咏春/㎜"
          class="From"
          min-width="65"
        >
        </el-table-column>
        <el-table-column
          prop="waiBi"
          label="外碧/㎜"
          class="From"
          min-width="65"
        >
        </el-table-column>
        <el-table-column
          prop="arealRainfall"
          label="面雨量/㎜"
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

        <el-form-item label="九都" prop="jiuDu">
          <el-input v-model="editForm.jiuDu" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="洋上" prop="yangShang">
          <el-input v-model="editForm.yangShang" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="外山" prop="waiShan">
          <el-input v-model="editForm.waiShan" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="湖洋" prop="huYang">
          <el-input v-model="editForm.huYang" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="大溪" prop="daXi">
          <el-input v-model="editForm.daXi" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="子美" prop="ziMei">
          <el-input v-model="editForm.ziMei" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="苏坑" prop="suKeng">
          <el-input v-model="editForm.suKeng" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="锦溪" prop="jinXi">
          <el-input v-model="editForm.jinXi" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="蓬壶" prop="pengHu">
          <el-input v-model="editForm.pengHu" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="猛虎" prop="mengHu">
          <el-input v-model="editForm.mengHu" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="达中" prop="daZhong">
          <el-input v-model="editForm.daZhong" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="大卿" prop="daQing">
          <el-input v-model="editForm.daQing" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="坝上" prop="baShang">
          <el-input v-model="editForm.baShang" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="咏春" prop="yongChun">
          <el-input v-model="editForm.yongChun" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="外碧" prop="waiBi">
          <el-input v-model="editForm.waiBi" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="雨量" prop="arealRainfall">
          <el-input v-model="editForm.arealRainfall" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('editForm')">立即创建</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>
    <el-dialog title="表格保存预览" width="70%" :visible.sync="selectWindow">
      <el-table :data="selectDate" id="selectTable" height="380px">
        <el-table-column
          prop="recordTime"
          label="观测时间"
        >
        </el-table-column>
        <el-table-column
          prop="jiuDu"
          label="九都/㎜"
        >
        </el-table-column>
        <el-table-column
          prop="yangShang"
          label="洋上/㎜"
        >
        </el-table-column>
        <el-table-column
          prop="waiShan"
          label="外山/㎜"
        >
        </el-table-column>
        <el-table-column
          prop="huYang"
          label="湖洋/㎜"
        >
        </el-table-column>
        <el-table-column
          prop="daXi"
          label="大溪/㎜"
        >
        </el-table-column>
        <el-table-column
          prop="ziMei"
          label="紫美/㎜"
        >
        </el-table-column>
        <el-table-column
          prop="suKeng"
          label="苏坑/㎜"
        >
        </el-table-column>
        <el-table-column
          prop="jinXi"
          label="锦溪/㎜"
        >
        </el-table-column>
        <el-table-column
          prop="pengHu"
          label="蓬壶/㎜"
        >
        </el-table-column>
        <el-table-column
          prop="mengHu"
          label="猛虎/㎜"
        >
        </el-table-column>
        <el-table-column
          prop="daZhong"
          label="达中/㎜"
        >
        </el-table-column>
        <el-table-column
          prop="daQing"
          label="大卿/㎜"
        >
        </el-table-column>
        <el-table-column
          prop="baShang"
          label="坝上/㎜"
        >
        </el-table-column>
        <el-table-column
          prop="yongChun"
          label="咏春/㎜"
        >
        </el-table-column>
        <el-table-column
          prop="waiBi"
          label="外碧/㎜"
        >
        </el-table-column>
        <el-table-column
          prop="arealRainfall"
          label="面雨量/㎜"
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
import {addRainfall, deleteRainfall, listRainfall, updateRainfall} from "@/api/rainfall/rainfall";
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
      Record: null,
      editForm: {
        recordTime:'',
        jiuDu:'',
        yangShang:'',
        waiShan:'',
        huYang:'',
        daXi:'',
        ziMei:'',
        suKeng:'',
        jinXi:'',
        pengHu:'',
        mengHu:'',
        daZhong:'',
        daQing:'',
        baShang:'',
        yongChun:'',
        waiBi:'',
        arealRainfall:''
      },
      queryInfo: {
        query:'',
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
      },
      searchForm: {},
      delBtlStau: true,
      tableData: [],
      formData: {},
    }
  },
  created() {
    this.getrainfall()
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
      this.getrainfall()
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
      this.getrainfall()
      console.log(`每页: ${val}`)
    },
    handleCurrentChange(val) {

      this.queryInfo.pageNum = val
      this.getrainfall()
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

    getrainfall() {
      console.log('getrainfall')
      let Record = null
      let recordStartTime = null
      let recordEndTime = null
      console.log(this.Record)
      if (this.Record) Record = this.$moment(this.Record).format('YYYY-MM')
      if (this.seepageDate.length === 2) {
        recordStartTime = this.$moment(this.seepageDate[0]).format('YYYY-MM')
        recordEndTime = this.$moment(this.seepageDate[1]).format('YYYY-MM')
      }
      listRainfall({
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

    cancel(){
      this.dialogVisible=false
      this.editForm = {}
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
            updateRainfall(this.editForm).then(res => {
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
                this.getrainfall()
              }
            })
          } else {
            addRainfall(this.editForm).then(res => {
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
                this.getrainfall()
              }
            })
          }
        }
      })

    },
    // 删除
    delHandle(row) {
      console.log(row)
      deleteRainfall(row.id).then(res => {
        console.log('delete', res)
        if (res.status === 200) {
          this.$message({
            showClose: true,
            message: '恭喜你，操作成功',
            type: 'success',
          })

          this.dialogVisible = false
          this.getrainfall()
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
      htmlToExcel.getExcel('#selectTable','雨量数据')
    }
  }
}
</script>

<style scoped>
.RainfallAmount{
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
