<template>
  <div class="YangtzeWaterlevel">
      <div class="top" style="width: 100%;height:5vh;">
        <el-form :inline="true">
          <el-form-item>
            <el-button type="primary" @click="curveShow">曲线图</el-button>
          </el-form-item>
          
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
            prop="observation_time"
            label="观测时间"
            class="From"
            min-width="65"
          >
          </el-table-column>
          <el-table-column
            prop="jc17"
            label="JC17"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc18"
            label="JC18"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc19"
            label="JC19"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc21"
            label="JC21"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc22"
            label="JC22"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc24"
            label="JC24"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc25"
            label="JC25"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc26"
            label="JC26"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc28"
            label="JC28"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc29"
            label="JC29"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc30"
            label="JC30"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc31"
            label="JC31"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc37"
            label="JC37"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc40"
            label="JC40"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc43"
            label="JC43"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc44"
            label="JC44"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc45"
            label="JC45"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc46"
            label="JC46"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc47"
            label="JC47"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc50"
            label="JC50"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc51"
            label="JC51"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc52"
            label="JC52"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jd4"
            label="JD4"
            class="From"
            min-width="55"
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
          :page-sizes="[10, 20, 30]"
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

          <el-form-item label="日期" prop="observation_time" >
            <el-date-picker
              v-model="editForm.observation_time"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="轮次" prop="round">
            <el-input v-model="editForm.round" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="纵坐标X(m)" prop="ordinateX">
            <el-input v-model="editForm.ordinateX" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="横坐标Y(m)" prop="abscissaY">
            <el-input v-model="editForm.abscissaY" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="点位名称" prop="point_name">
            <el-input v-model="editForm.point_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="长江水位(m)" prop="yangtze_waterlevel">
            <el-input v-model="editForm.yangtze_waterlevel" autocomplete="off"></el-input>
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
            prop="observation_time"
            label="观测时间"
            class="From"
            min-width="65"
          >
          </el-table-column>
          <el-table-column
            prop="jc17"
            label="JC17"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc18"
            label="JC18"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc19"
            label="JC19"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc21"
            label="JC21"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc22"
            label="JC22"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc24"
            label="JC24"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc25"
            label="JC25"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc26"
            label="JC26"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc28"
            label="JC28"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc29"
            label="JC29"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc30"
            label="JC30"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc31"
            label="JC31"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc37"
            label="JC37"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc40"
            label="JC40"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc43"
            label="JC43"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc44"
            label="JC44"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc45"
            label="JC45"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc46"
            label="JC46"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc47"
            label="JC47"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc50"
            label="JC50"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc51"
            label="JC51"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jc52"
            label="JC52"
            class="From"
            min-width="55"
          >
          </el-table-column>
          <el-table-column
            prop="jd4"
            label="JD4"
            class="From"
            min-width="55"
          >
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="exportExcel">确认保存</el-button>
        </div>
      </el-dialog>
      
      <el-dialog  width="80%" :visible.sync="curveWindow">
        <WaterLevelChart2 :key="chartKey"></WaterLevelChart2>
      </el-dialog>
    </div>
</template>

<script>
  import WaterLevelChart2 from "@/components/YangtzeWaterlevel/WaterLevelChart2";
  import {GetList, AddList, DeleteList, UpdateList} from "@/api/YangtzeWaterlevel/YangtzeWaterlevel";
  import htmlToExcel from "@/utils/htmlToExcel";
  import {val} from 'element-ui'

  export default {
    name: "YangtzeWaterlevel",
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
        curveWindow:false,
        chartKey:0,
        seepageDate: [],
        selectDate: [],
        selectWindow: false,
        Record: null,
        editForm: {
          round:'',
          observation_time:'',
          ordinateX:'',
          abscissaY:'',
          point_name:'',
          yangtze_waterlevel:'',
        },
        queryInfo: {
          query:'',
          // 当前每页显示多少条数据
          pageSize: 10,
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
    components:{
      WaterLevelChart2
    },
    created() {
  	window.vue=this
      this.getList()
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
      curveShow(){
        this.chartKey++;
        this.curveWindow = true;
      },
      search(){
        this.getList()
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
        this.getList()
        console.log(`每页: ${val}`)
      },
      handleCurrentChange(val) {

        this.queryInfo.pageNum = val
        this.getList()
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

      getList() {
        console.log('getList')
        let Record = null
        let recordStartTime = null
        let recordEndTime = null
        if (this.Record) Record = this.$moment(this.Record).format('YYYY-MM')
        if ((this.seepageDate != null)&&(this.seepageDate.length === 2)) {
          recordStartTime = this.$moment(this.seepageDate[0]).format('YYYY-MM-DD')
          recordEndTime = this.$moment(this.seepageDate[1]).format('YYYY-MM-DD')
        }
        if (this.seepageDate == null) {
          recordStartTime = null
          recordEndTime = null
        }
        var StartEndTime = {
          recordStartTime: recordStartTime,
          recordEndTime: recordEndTime,
        }
        this.$store.dispatch('changeYangtzeWaterlevelTime',StartEndTime);
        GetList({
          pageNum: this.queryInfo.pageNum,
          pageSize: this.queryInfo.pageSize,
          recordStartTime: recordStartTime,
          recordEndTime: recordEndTime,
          recordTime: Record,
        }).then(res => {
          console.log(res)
          // const {data} = res
          // const { list, total } = data
          if(res.status == 200){
            this.tableData = res.data.records
            this.total = res.data.total
          }
          if(res.status == 400){
            this.$message.error('查询失败！');
          }

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
              UpdateList(this.editForm).then(res => {
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
                  this.getList()
                }
                if(res.status == 400){
                  this.$message.error('编辑失败！');
                }
              })
            } else {
              AddList(this.editForm).then(res => {
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
                  this.getList()
                }
                if(res.status == 400){
                  this.$message.error('添加失败！');
                }
              })
            }
          }
        })

      },
      // 删除
      delHandle(row) {
        console.log(row)
        DeleteList(row.id).then(res => {
          console.log('delete', res)
          if (res.status === 200) {
            this.$message({
              showClose: true,
              message: '恭喜你，操作成功',
              type: 'success',
            })

            this.dialogVisible = false
            this.getList()
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
        htmlToExcel.getExcel('#selectTable','粘聚力数据')
      }
    }
  }
</script>

<style scoped>
.YangtzeWaterlevel{
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
