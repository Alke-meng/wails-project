<template>
  <page-view>
    <el-alert
      title="Vue3.0版本的vue.draggable.next拖拽组件 https://github.com/SortableJS/vue.draggable.next"
      type="success"
      style="margin-bottom: 20px"
    ></el-alert>
    <div class="dragList">
      <draggable v-model="listA" animation="200" item-key="id" group="people">
        <template #item="{ element }">
          <div class="item">{{ element.text }}</div>
        </template>
      </draggable>
    </div>
    <div class="dragList">
      <draggable v-model="listB" animation="200" item-key="id" group="people">
        <template #item="{ element }">
          <div class="item">{{ element.text }}</div>
        </template>
      </draggable>
    </div>
  </page-view>
</template>


<script setup>
import draggable from "vuedraggable";
import { ref } from "vue";
const listA = ref([
  {
    id: 1,
    text: "A1",
  },
  {
    id: 2,
    text: "A2",
  },
  {
    id: 3,
    text: "A3",
  },
  {
    id: 4,
    text: "A4",
  },
  {
    id: 5,
    text: "A5",
  },
  {
    id: 6,
    text: "A6",
  },
  {
    id: 7,
    text: "A7",
  },
  {
    id: 8,
    text: "A8",
  },
  {
    id: 9,
    text: "A9",
  },
]);

const listB = ref([
  {
    id: 1,
    text: "B1",
  },
  {
    id: 2,
    text: "B2",
  },
  {
    id: 3,
    text: "B3",
  },
  {
    id: 4,
    text: "B4",
  },
  {
    id: 5,
    text: "B5",
  },
  {
    id: 6,
    text: "B6",
  },
  {
    id: 7,
    text: "B7",
  },
  {
    id: 8,
    text: "B8",
  },
  {
    id: 9,
    text: "B9",
  },
]);
</script>

<style scoped>
.dragList {
  overflow: auto;
}
.item {
  cursor: move;
  float: left;
  background: #f7f7f7;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  margin: 0 15px 15px 0;
  border: 1px solid #eee;
}
.dragList .sortable-ghost {
  opacity: 0.5;
}
</style>
