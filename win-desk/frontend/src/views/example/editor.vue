<template>
  <page-view>
    <h2>wangEditor for vue3</h2>
    <el-divider />
    <div style="margin-top: 10px">
      <el-input
        v-model="html"
        type="textarea"
        readonly
        style="width: 100%; height: 100px;"
      />
    </div>
    <g-editor v-model="html"></g-editor>
  </page-view>
</template>

<script setup>

import { ref } from "vue";
const html = ref("<p>hello wangEditor for vue3</p>");
//模拟 ajax 异步获取内容
setTimeout(() => {
  html.value = "<strong>模拟 Ajax 异步设置内容</<strong>";
}, 1000);
</script>

