<template>
  <div v-if="!item.hidden">
    <template
      v-if="
        hasChildren(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.meta.alwaysShow
      "
    >
      <component :is="type" v-bind="linkProps(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <el-icon class="title-icon" v-if="item.meta">
            <component :is="item.meta.icon || 'Menu'" />
          </el-icon>
          <template #title>
            <span class="title">{{ item.meta.title }}</span>
          </template>
        </el-menu-item>
      </component>
    </template>
    <el-sub-menu
      v-else
      :popper-class="`menu-${theme}`"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template #title>
        <el-icon class="title-icon" v-if="item.meta">
          <component :is="item.meta.icon || 'Menu'" />
        </el-icon>
        <span class="title">{{ item.meta && item.meta.title }}</span>
      </template>
      <menu-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>


<script setup name="MenuItem">
import { isExternal } from "@/utils/validate";
import { computed, ref } from "vue";
import path from "path-browserify";
import { useStore } from "vuex";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  basePath: {
    type: String,
    default: "",
  },
  isNest: {
    type: Boolean,
    default: false,
  },
});

const onlyOneChild = ref(null);

const store = useStore();
const theme = computed(() => store.state.settings.navTheme);
const type = computed(() => {
  if (isExternal(resolvePath(props.item.path))) {
    return "a";
  }
  return "router-link";
});

const hasChildren = (children = [], parent) => {
  const showingChildren = children.filter((item) => {
    if (item.hidden) {
      return false;
    } else {
      onlyOneChild.value = item;
      return true;
    }
  });
  // 只有一个子路由渲染为菜单项,如果想渲染父路由,请设置alwaysShow属性为true
  if (showingChildren.length === 1) {
    return true;
  }
  //没有子路由时，渲染为菜单项
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };
    return true;
  }
  return false;
};

const resolvePath = (routePath) => {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }
  return path.resolve(props.basePath, routePath);
};

const linkProps = (path) => {
  if (isExternal(resolvePath(path))) {
    return {
      href: resolvePath(path),
      target: "_blank",
      rel: "noopener",
    };
  }
  return {
    to: resolvePath(path),
  };
};
</script>
