<template>
  <el-form-item v-if="label || $slots.label" v-bind="props">
    <template #label>
      <slot name="label"></slot>
    </template>
    <el-select v-bind="$attrs" :modelValue="modelValue" @change="onChange">
      <slot></slot>
      <el-option
        v-for="item in optionsList"
        :key="item[key]"
        :label="item[field]"
        :value="item[key]"
      />
    </el-select>
  </el-form-item>
  <el-select v-else v-bind="$attrs" :modelValue="modelValue" @change="onChange">
    <slot></slot>
    <el-option
      v-for="item in optionsList"
      :key="item[key]"
      :label="item[field]"
      :value="item[key]"
    />
  </el-select>
</template>

<script setup>
import { formItemProps } from "element-plus/es";
import useSelectItem from "../hooks/useSelectItem";
const props = defineProps(
  Object.assign(formItemProps, {
    options: {
      type: Array,
      default: () => {
        return [];
      },
    },
    itemType: {
      type: String,
    },
    modelValue: {
      type: [Array, String, Number],
    },
    field: {
      default: "name",
      type: String,
    },
    key: {
      default: "id",
      type: String,
    },
    dictCode: String,
  })
);
const emit = defineEmits(["update:modelValue"]);
const { optionsList } = useSelectItem(props, emit);
const onChange = (e) => emit("update:modelValue", e);
</script>

<style>
</style>