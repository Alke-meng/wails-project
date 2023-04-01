<template>
  <div class="g-card">
    <div class="g-card-header">
      <el-row>
        <el-col :span="12" class="g-card-header-left">
          <slot name="headLeft"></slot>
        </el-col>
        <el-col :span="12" class="g-card-header-right">
          <slot name="headRight"></slot>
        </el-col>
      </el-row>
    </div>
    <div class="g-card-content" :style="{ height: height, width: width }">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  height: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "",
  },
});
</script>

<style scoped lang="scss">
.g-card {
  width: 100%;
  height: 100%;
  padding: 0;
  position: relative;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  border-radius: 4px;
}

.g-card-header {
  width: 100%;
  line-height: 25px;
  padding: 5px 10px;
  font-weight: bold;
  border-bottom: 1px solid #ebeef5;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.g-card-header-left {
  width: 50%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
.g-card-header-right {
  width: 50%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: flex-end;
}
.g-card-content {
  overflow: auto;
  width: 100%;
  overflow: auto;
  padding: 0px 10px;
}
</style>
