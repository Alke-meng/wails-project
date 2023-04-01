<template>
  <el-dialog
    v-bind="props"
    custom-class="g-dialog"
    :modelValue="modelValue"
  >
    <slot></slot>
    <template v-if="footer" #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { dialogProps } from "element-plus/es";
const props = defineProps(
  Object.assign(dialogProps, {
    modelValue: {
      type: Boolean,
      required: true,
    },
    footer: {
      type: Boolean,
      default: true,
    },
  })
);
const emit = defineEmits(["update:modelValue", "cancel", "confirm"]);

const cancel = () => {
  emit("update:modelValue", false);
  emit("cancel");
};

const confirm = () => {
  emit("confirm");
};
</script>

<style lang="scss" >
.g-dialog  .el-dialog__header {
  border-bottom: 1px solid #eee;
  margin-right:0;
}
</style>
