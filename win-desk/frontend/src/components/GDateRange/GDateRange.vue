<template>
  <el-date-picker
    :size="size"
    :modelValue="modelValue"
    type="daterange"
    align="right"
    value-format="YYYY-MM-DD"
    unlink-panels
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    :shortcuts="shortcuts"
    @change="onChange"
  >
  </el-date-picker>
</template>
<script setup>
const props = defineProps({
  modelValue: [String,Number,Array],
  size: {
    type: String,
    default: "default",
  },
});
const emit = defineEmits(['update:modelValue'])
const onChange = (e) => {
  console.log(e)
  emit("update:modelValue", e)
};
const shortcuts = [
  {
    text: "最近一周",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
  {
    text: "最近一个月",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  },
  {
    text: "最近三个月",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    },
  },
];
</script>
