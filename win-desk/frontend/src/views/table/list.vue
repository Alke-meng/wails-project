<template>
  <el-container style="margin: 16px" class="table-list">
    <el-aside
      width="200px"
      style="background: #fff; border-right: 1px solid #ebeef5"
    >
      <el-container>
        <el-header class="header">
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="groupFilterText"
            clearable
          ></el-input>
        </el-header>
        <el-main class="nopadding">
          <g-tree
            ref="treeRef"
            class="menu"
            width="200"
            :data="treeData"
            current-node-key="0"
            :filter-node-method="groupFilterNode"
            @node-click="onNodeClick"
          ></g-tree>
        </el-main>
      </el-container>
    </el-aside>
    <el-container>
      <el-header class="header" style="border-bottom: none">
        <div class="left-panel">
          <el-button type="primary" icon="plus"></el-button>
          <el-button type="danger" plain icon="delete"></el-button>
        </div>
        <div class="right-panel">
          <div class="right-panel-search">
            <el-input
              v-model="queryParams.keyword"
              placeholder="关键词"
              clearable
            ></el-input>
            <el-button
              style="margin-left: 20px"
              type="primary"
              icon="search"
              @click="search"
            ></el-button>
          </div>
        </div>
      </el-header>
      <el-main class="nopadding">
        <g-table
          ref="table"
          height="69vh"
          :tableParams="tableParams"
          rowKey="a"
          showCheck
          showIndex
        >
          <g-table-column prop="a" label="id" :show-overflow-tooltip="true" />
          <g-table-column prop="b" label="密钥" :show-overflow-tooltip="true" />
          <g-table-column prop="c" label="用户">
            <template #default="scope">
              <el-button link type="primary" size="small">
                {{ scope.row.c }}
              </el-button>
            </template>
          </g-table-column>
          <g-table-column prop="e" label="批准人" />
          <g-table-column prop="d" label="是否开启" columnType="yesNo" />
          <g-table-column prop="f" columnType="dateTime" label="日期" />
          <g-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
              <el-popconfirm title="确定要删除吗?">
                <template #reference>
                  <el-button
                    link
                    type="primary"
                    size="small"
                    @click="onClick(scope)"
                    >删除</el-button
                  >
                </template>
              </el-popconfirm>

              <el-button
                link
                type="primary"
                @click="onClick(scope)"
                size="small"
                >编辑</el-button
              >
            </template>
          </g-table-column>
        </g-table>
      </el-main>
    </el-container>
  </el-container>
</template>




<script setup>
import { getList } from "@/api/user";
import { ref, reactive, watch } from "vue";
const table = ref(null);
const treeRef = ref(null);
const groupFilterText = ref("");
const treeData = ref([
  {
    id: "0",
    label: "所有",
  },
  {
    id: "1",
    label: "华东总部",
    children: [
      {
        id: "11",
        label: "售前客服部",
      },
      {
        id: "12",
        label: "技术研发部",
      },
      {
        id: "13",
        label: "行政人事部",
      },
    ],
  },
  {
    id: "2",
    label: "华难总部",
    children: [
      {
        id: "21",
        label: "售前客服部",
      },
      {
        id: "22",
        label: "技术研发部",
      },
    ],
  },
]);
const queryParams = reactive({});

//监听值变化
watch(groupFilterText, (val) => {
  treeRef.value.filter(val);
});

const tableParams = ref({
  fetchList: getList,
  queryParams: {
    id: 0,
    cate_id: 105,
  },
});

//搜索
const search = () => {
  table.value.refresh(queryParams);
};

const onClick = (scope) => {
  console.log(scope);
};

//树点击
const onNodeClick = (data) => {
  if (queryParams.groupId == data.id) return;
  queryParams.groupId = data.id;
  table.value.refresh(queryParams);
};

//树过滤
const groupFilterNode = (value, data) => {
  if (!value) return true;
  return data.label.indexOf(value) !== -1;
};
</script>


<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid var(--el-border-color-light);
  padding: 13px 15px;
  justify-content: space-between;
}
.right-panel-search {
  display: flex;
}
.table-list {
  :deep(.el-tree-node__content) {
    height: 36px;
  }
}
</style>