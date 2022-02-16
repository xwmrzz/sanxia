<template>
<div style="width: 100%;height: 100%;">
  <div class="Check" style="background-color: #42b983;">

    <div class="filter-container">
      <el-date-picker
        v-model="dateRange"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        class="filter-item"
      />
      <el-input v-model="searchVal" placeholder="请输入搜索内容...." style="width: 400px;" class="input-with-select" @keyup.enter.native="handleFilter">
        <el-select slot="append" v-model="searchType" placeholder="请选择" style="width: 125px;">
          <el-option
            v-for="item in searchTypeOptions"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          />
        </el-select>
      </el-input>
      <el-select v-if="route === '/device_information/devices' || route === '/monitoring_station_information/stations'" v-model="monitorType" placeholder="默认为所有设备" clearable class="filter-item" style="width: 250px;" @change="monitorTypeChange">
        <el-option
          v-for="item in monitorOptions"
          :key="item.id"
          :label="item.label"
          :value="item.label"
        />
      </el-select>
      <el-button size="mini" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button size="mini" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-circle-plus" @click="handleCreate">
        新增
      </el-button>
      <!--      <el-button size="mini" :loading="downloadLoading" class="filter-item" type="file" icon="el-icon-download" @click="handleImport">-->
      <!--        导入-->
      <!--      </el-button>-->
      <el-upload
        class="filter-item"
        action=""
        :on-change="handleChange"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
        :auto-upload="false"
        :show-file-list="false"
        style="display: inline-block"
      >
        <el-button size="mini" type="primary" icon="el-icon-upload" v-if="this.$route.path === '/displacement_data/data'">点击上传</el-button>
      </el-upload>
      <el-button v-waves size="mini" :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        导出
      </el-button>
      <el-button v-waves size="mini" class="filter-item" type="danger" icon="iconfont icon-delete" @click="handleDelete">
        批量删除
      </el-button>
    </div>

  </div>
  <div class="Show" style="background-color: #54c5d8 ;">

  </div>
</div>

</template>

<script>
export default {
  name: "Equipment-data",
  data(){
    return {
      searchVal: null,
      searchType: 1,
      searchTypeOptions: [],
      dateRange: null,
      downloadLoading: false,
    }
  }
}
</script>

<style scoped>

.block{
margin-right: 5px;
}
</style>
