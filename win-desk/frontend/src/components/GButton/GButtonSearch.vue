<template>
  <el-button v-bind="$attrs" :type="type" icon="Search">
    <slot> 搜索 </slot>
  </el-button>
</template>
<script setup>
import useProps from "./useProps";
defineProps(Object.assign({}, useProps));
</script>
