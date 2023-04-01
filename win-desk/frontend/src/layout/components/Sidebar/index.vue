<template>
  <div :class="classObj">
    <logo v-if="showLogo" :collapse="collapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <side-menu :collapse="collapse" :menu="menu" />
    </el-scrollbar>
  </div>
</template>


<script setup>
import SideMenu from "../Menu/index.vue";
import Logo from "./Logo.vue";
import menu from "./data.js";
import { useStore } from "vuex";
import { computed } from "vue";
defineProps({
  collapse: {
    type: Boolean,
    required: true
  }
})

const store = useStore();
const showLogo = computed(() => store.state.settings.sidebarLogo);
const layout = computed(() => store.state.settings.layout);
const navTheme = computed(() => store.state.settings.navTheme);
const classObj = computed(() => {
  return {
    "sidebar-container": true,
    [`side-theme-${navTheme.value}`]: navTheme.value,
  };
});
</script>

<style lang="scss" scoped>
.side-theme-light {
  .sidebar-logo-container {
    background: #fff !important;
    color: #000;
  }

  background-color: #fff !important;
}
</style>
