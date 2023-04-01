<template>
  <page-view>
    <div style="padding: 30px">
      <el-alert :closable="false" title="menu 1">
        <router-view />
      </el-alert>
    </div>
  </page-view>
</template>
