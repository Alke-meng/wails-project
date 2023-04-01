<template>
  <page-view>
    <el-form :inline="true" :model="queryParams" class="demo-form-inline">
      <el-form-item label="批准人">
        <el-input v-model="queryParams.user" placeholder="请输入内容" />
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="queryParams.region" placeholder="请选择">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="reset">查询</el-button>
      </el-form-item>
    </el-form>
    <g-table
      ref="table"
      :tableParams="tableParams"
      rowKey="a"
      showCheck
      showIndex
    >
      <g-table-column prop="a" label="id" :show-overflow-tooltip="true"/>
      <g-table-column prop="b" label="密钥" :show-overflow-tooltip="true"/>
      <g-table-column prop="c" label="用户" :show-overflow-tooltip="true"/>
      <g-table-column prop="e" label="批准人" :show-overflow-tooltip="true"/>
      <g-table-column prop="f" label="日期" :show-overflow-tooltip="true"/>
    </g-table>
  </page-view>
</template>

<script setup>
import { getList } from "@/api/user";
import { ref, reactive } from "vue";

const table = ref(null);

const queryParams = reactive({
  user: undefined,
  region: undefined,
});

const tableParams = ref({
  fetchList: getList,
  queryParams: {
    id: 0,
    cate_id: 105,
  },
});

const reset = () => {
  table.value.refresh(queryParams);
};
</script>