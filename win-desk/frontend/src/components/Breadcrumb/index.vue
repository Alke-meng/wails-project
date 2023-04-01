<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
          >{{ item.meta.title }}</span
        >
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import * as pathToRegexp from "path-to-regexp";
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const levelList = ref(null);

const route = useRoute();

const isHome = (route) => {
  const path = route && route.path;
  if (!path) {
    return false;
  }
  return path.trim().toLocaleLowerCase() === "/home".toLocaleLowerCase();
};

const pathCompile = (path) => {
  const { params } = route;
  var toPath = pathToRegexp.compile(path);
  return toPath(params);
};

const handleLink = (item) => {
  const { redirect, path } = item;
  const router = useRouter();
  if (redirect) {
    router.push(redirect);
    return;
  }
  router.push(this.pathCompile(path));
};

const getBreadcrumb = () => {
  let matched = route.matched.filter((item) => item.meta && item.meta.title);
  const first = matched[0];
  if (!isHome(first)) {
    matched = [{ path: "/home", meta: { title: "首页" } }].concat(matched);
  }
  levelList.value = matched.filter(
    (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
  );
};

onMounted(() => {
  getBreadcrumb();
});

watch(
  () => route.path,
  () => {
    getBreadcrumb();
  }
);
</script>

<style lang="scss" scoped>
.breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
