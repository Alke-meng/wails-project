<template>
  <el-button v-bind="$attrs" :type="type" icon="Plus">
    <slot> 新增 </slot>
  </el-button>
</template>
<script setup>
import useProps from "./useProps";
defineProps(Object.assign({}, useProps));
</script>
