<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }" @click="onClick">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <el-avatar class="sidebar-logo" :size="60" :src="avatar"></el-avatar>
        <h1 class="sidebar-title">{{ config.title }}</h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <el-avatar class="sidebar-logo" :size="60" :src="avatar"></el-avatar>
        <h1 class="sidebar-title">{{ config.title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script setup>
import config from "@/config";
defineProps({
  collapse: {
    type: Boolean,
    required: true,
  },
});

import aitePng from '@/assets/images/aite.png'

const avatar = aitePng

const emits = defineEmits(['click'])

const onClick = () => {
  emits('click')
}


defineExpose({
  config
})

</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter-from,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #fff;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      font-weight: 600;
      line-height: 50px;
      font-size: 18px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
