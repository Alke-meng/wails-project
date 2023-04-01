<template>
  <el-button v-bind="$attrs" :type="type" icon="RefreshRight">
    <slot> 刷新 </slot>
  </el-button>
</template>
<script setup>
import useProps from "./useProps";
defineProps(Object.assign({}, useProps));
</script>
