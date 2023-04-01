<template>
  <el-table-column
    v-if="columnType === 'yesNo' || columnType === 'menWomen'"
    v-bind="$attrs"
    :align="align"
    :headerAlign="headerAlign"
  >
    <template #default="scope">
      <el-tag
        :type="scope.row[$attrs.prop] === 1 ? 'success' : 'danger'"
        disable-transitions
        >{{ showEnumValue(scope.row[$attrs.prop]) }}
      </el-tag>
    </template>
  </el-table-column>
  <el-table-column
    v-else-if="columnType === 'date' || columnType === 'dateTime'"
    v-bind="$attrs"
    :formatter="dateFormat"
    :align="align"
    :headerAlign="headerAlign"
  >
  </el-table-column>
  <el-table-column
    v-else
    v-bind="$attrs"
    :align="align"
    :headerAlign="headerAlign"
  >
    <template v-if="$slots.default" #default="scope">
      <slot v-bind="scope"></slot>
    </template>
  </el-table-column>
</template>

<script setup>
import dayjs from "dayjs";
import { toRefs } from "vue";
const props = defineProps({
  columnType: {
    type: String,
    default: "",
  },
  align: {
    type: String,
    default: "left",
  },
  headerAlign: {
    type: String,
    default: "left",
  },
});

const showEnumValue = (value) => {
  const { columnType } = toRefs(props);
  if (columnType.value == "yesNo") {
    return value == 1 ? "是" : "否";
  } else {
    return value == 1 ? "男" : "女";
  }
};

const dateFormat = (row, column, cellValue) => {
  const { columnType } = toRefs(props);
  let format = columnType.value == "dateTime" ? "YYYY-MM-DD HH:mm" : "YYYY-MM-DD";
  return cellValue ? dayjs(cellValue).format(format) : "";
  //return cellValue ? dayjs(new Date(cellValue)).format(format) : "";
};
</script>

