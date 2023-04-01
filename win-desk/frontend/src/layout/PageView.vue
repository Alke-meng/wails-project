<template>
  <div class="page-view">
    <el-card v-if="card" shadow="never" class="layout-card">
      <slot />
    </el-card>
    <slot v-else />
  </div>
</template>

<script setup>
defineProps({
  card: {
    type: Boolean,
    default: true
  }
})
</script>

<style lang="scss" scoped>
.page-view {
  margin: 16px 16px 0 16px;
  .layout-card {
    border: none;
    border-radius: 0px;
  }
}
</style>
