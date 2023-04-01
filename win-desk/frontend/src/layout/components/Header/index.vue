<template>
  <div class="layout-header">
    <div v-if="layout === 'side'">
      <hamburger :collapse="collapse" @toggleClick="toggleSideBar" />
      <g-breadcrumb class="breadcrumb" />
      <user-menu />
    </div>
    <div v-else :class="['top-nav-header', `top-nav-${navTheme}`]">
      <div class="header-navbar">
        <logo class="logo" :collapse="false" />
        <header-menu v-if="layout === 'top'"  class="header-menu" mode="horizontal" :menu="menu" />
      </div>
      <user-menu />
    </div>
  </div>
</template>

<script setup>
import menu from "../Sidebar/data.js";
import HeaderMenu from "../Menu/index.vue";
import Logo from "../Sidebar/Logo.vue";
import UserMenu from "./UserMenu.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import Hamburger from "./Hamburger.vue";
const store = useStore();
const layout = computed(() => store.state.settings.layout);
const navTheme = computed(() => store.state.settings.navTheme);
const collapse = computed(() => store.state.app.collapse);
const toggleSideBar = () => {
  store.dispatch("app/toggleSideBar");
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.layout-header {
  height: $header-height;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .top-nav-header {
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header-navbar {
    display: flex;
  }

  .top-nav-dark {
    background-color: $menuDarkBg;

    :deep(<inner-selector>) .hamburger {
      fill: #fff;
    }

    :deep(<inner-selector>) .name {
      color: #ffffffa6;
    }
  }

  .logo {
    width: $sideBarWidth;
  }

  .breadcrumb {
    float: left;
  }
}
</style>
