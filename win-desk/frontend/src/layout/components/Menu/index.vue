<template>
  <el-menu :class="`menu-${theme}`" :default-active="activeMenu" :collapse="collapse" :unique-opened="true"
    :collapse-transition="false" :mode="mode">
    <menu-item v-for="route in menu" :key="route.path" :item="route"  :base-path="route.path" />
  </el-menu>
</template>

<script setup>
import MenuItem from "./MenuItem.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const props = defineProps({
  mode: {
    type: String,
    default: "vertical",
    validator: function (value) {
      return ["vertical", "horizontal"].indexOf(value) !== -1;
    },
  },
  collapse: {
    type: Boolean,
  },
  menu: {
    type: Array,
    required: true,
  },
});

const store = useStore();
const theme = computed(() => store.state.settings.navTheme);

const activeMenu = computed(() => {
  const { meta, path } = useRoute();
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});
</script>