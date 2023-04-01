<template>
  <el-button v-bind="$attrs" :type="type" icon="Delete">
    <slot> 删除 </slot>
  </el-button>
</template>
<script setup>
defineProps({
  type: {
    type: String,
    default: "danger",
  },
});
</script>
