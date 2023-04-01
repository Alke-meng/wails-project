<template>
  <div :class="classObj" class="layout-wrapper">
    <aside v-if="!sidebarHidden">
      <div v-if="isMobile && !collapse" class="drawer-mask" @click="handleClickOutside" />
      <sidebar :collapse="collapse" />
    </aside>

    <main  class="layout-container">
      <header :class="{ 'fixed-header': fixedHeader }">
        <layout-header />
      </header>
      <section class="layout-content">
        <div style="flex: auto">
          <router-view :key="key" />
        </div>
        <layout-footer />
      </section>

      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </main>
    
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { Sidebar, LayoutFooter, LayoutHeader, Settings } from "./components";
import { useDeviceEnquire } from "@/hooks";
import { useStore } from "vuex";
import { computed } from "vue";
const store = useStore();
const layout = computed(() => store.state.settings.layout);
const navTheme = computed(() => store.state.settings.navTheme);
const collapse = computed(() => store.state.app.collapse);
const showSettings = computed(() => store.state.settings.showSettings);
const isMobile = computed(() => store.state.app.isMobile);
const sidebarHidden = computed(() => {
  if (isMobile.value) return false
  if (layout.value == 'top') return true
  if (layout.value != 'side') return true
});
const device = useDeviceEnquire();
const classObj = computed(() => {
  return {
    'mobile': isMobile.value,
    'sidebar-hidden': sidebarHidden.value,
    'sidebar-collapse': collapse.value,
    [`menu-theme-${navTheme.value}`]: true,
    [`layout-mode-${layout.value}`]: true
  }
})

const fixedHeader = true;
const key = useRoute().path;

const handleClickOutside = () => {
  store.dispatch('app/closeSideBar', false)
}
</script>

