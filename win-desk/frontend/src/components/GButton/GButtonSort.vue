<template>
  <el-button v-bind="$attrs" :type="type" icon="Sort">
    <slot> 排序 </slot>
  </el-button>
</template>
<script setup>
import useProps from "./useProps";
defineProps(Object.assign({}, useProps));
</script>
