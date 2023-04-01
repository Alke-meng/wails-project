<template>
  <el-button v-bind="$attrs" :type="type" icon="DocumentCopy">
    <slot> 复制 </slot>
  </el-button>
</template>
<script setup>
import useProps from "./useProps";
defineProps(Object.assign({}, useProps));
</script>
