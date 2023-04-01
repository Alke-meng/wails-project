<template>
  <el-form-item v-if="label || $slots.label" :label="label" v-bind="props">
    <template #label>
      <slot name="label"></slot>
    </template>
    <el-date-picker
      v-model="dateValue"
      :type="type"
      v-bind="$attrs"
      :format="format"
      :value-format="valueFormat"
      :placeholder="placeholder"
      @change="onChange"
    >
    </el-date-picker>
  </el-form-item>
  <el-date-picker
    v-else
    v-bind="$attrs"
    v-model="dateValue"
    :type="type"
    :format="format"
    :value-format="valueFormat"
    :placeholder="placeholder"
    @change="onChange"
  >
  </el-date-picker>
</template>
<script setup>
import { formItemProps } from "element-plus/es";
import { ref, watch } from "vue";
const dateValue = ref();
const props = defineProps(
  Object.assign(formItemProps, {
    label: {
      type: String,
    },
    modelValue: {
      type: [Array, String, Number, Date],
    },
    type: {
      default: "date",
      type: String,
    },
    format: {
      default: "YYYY-MM-DD",
      type: String,
    },
    valueFormat: {
      default: "YYYY-MM-DD",
      type: String,
    },
    placeholder: {
      default: "请选择",
      type: String,
    },
  })
);

watch(
  () => props.modelValue,
  (newVal) => {
    dateValue.value = newVal;
  },
  {
    immediate: true,
  }
);
const emit = defineEmits(["update:modelValue"]);
const onChange = (e) => emit("update:modelValue", e);
</script>
<style rel="stylesheet/scss" lang="scss">
.el-form-item .el-date-editor {
  width: 100%;
}
</style>
