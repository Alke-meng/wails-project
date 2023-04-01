<template>
  <el-scrollbar class="g-tree">
    <el-tree
      class="filter-tree"
      v-bind="$attrs"
      :data="data"
      ref="treeRef"
      :node-key="nodeKey"
      highlight-current
      :filterNodeMethod="filterNodeMethod"
      :default-expanded-keys="expandedKeys"
      :expand-on-click-node="expandOnClickNode"
      :style="{ width: width }"
    >
      <template #default="{ node }">
        <el-icon color="#fcd568" style="margin-right: 5px">
          <Folder v-if="!node.expanded" />
          <FolderOpened v-else-if="node.expanded" />
          <UserFilled v-else-if="data.type == 1" />
        </el-icon>
        <span>{{ node.label }}</span>
      </template>
    </el-tree>
  </el-scrollbar>
</template>

<script setup>
import useTreeMethods from "./useTreeMethods.js";
import { ref, watch } from "vue";
const props = defineProps({
  width: {
    type: [String, Number],
    default: "220px",
  },
  data: {
    type: Array,
    required: true,
  },
  nodeKey: {
    type: String,
    default: "id",
  },
  filterNodeMethod: {
    type: Function,
  },
  expandOnClickNode: {
    type: Boolean,
    default: false,
  },
  //是否折叠
  collapse: {
    type: Boolean,
    default: false,
  },
});

const treeRef = ref(null);
//树组件的所有方法
const treeMethods = useTreeMethods(treeRef);
//展开的key
const expandedKeys = ref([]);

//默认展开第一级节点
const defaultExpandedFirstKeys = (data) => {
  expandedKeys.value = [];
  if (!data.length && props.collapse) return;
  data.forEach((item) => {
    expandedKeys.value.push(item[props.nodeKey]);
  });
};

//监听数据变化
watch(props.data, (value) => defaultExpandedFirstKeys(value), {
  deep: true,
  immediate: true,
});

// 暴露组件所有的状态和方法
defineExpose({
  expandedKeys,
  ...props,
  ...treeMethods,
});
</script>
