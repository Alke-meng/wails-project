<template>
  <el-button v-bind="$attrs" :type="type" icon="Edit">
    <slot> 编辑 </slot>
  </el-button>
</template>
<script setup>
import useProps from "./useProps";
defineProps(Object.assign({}, useProps));
</script>
