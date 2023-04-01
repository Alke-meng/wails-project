<template>
  <page-view>
    <h3>
      简化定义按钮的步骤，方便统一维护（主要是省略了传图标，传类型，传文字等步骤）
    </h3>
    <el-divider />
    <el-space wrap>
      <g-button-add @click="onClick('add')"></g-button-add>
      <g-button-edit @click="onClick('edit')"></g-button-edit>
      <g-button-delete @click="onClick('delete')"></g-button-delete>
      <g-button-copy @click="onClick('copy')"></g-button-copy>
      <g-button-refresh @click="onClick('refresh')"></g-button-refresh>
      <g-button-search @click="onClick('search')"></g-button-search>
      <g-button-sort @click="onClick('copy')"></g-button-sort>
    </el-space>
  </page-view>
</template>

<script setup>

const onClick = (msg) => {
  alert(msg);
};
</script>