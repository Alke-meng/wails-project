<template>
  <div v-loading="loading" class="layer-view">
    <div class="popup-content">
      <slot></slot>
    </div>
    <footer class="el-dialog__footer" v-if="showFooter">
      <span class="dialog-footer" v-if="$slots.footer">
        <slot name="footer"></slot>
      </span>
      <span class="dialog-footer" v-else>
        <el-button @click="onClose">取消</el-button>
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <slot name="more"></slot>
      </span>
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useModalClose } from "@/hooks/useModal";
const loading = ref(false);

const emits = defineEmits(["onSubmit"]);

const props = defineProps({
  showFooter: {
    type: Boolean,
    default: true,
  },
});
const close = useModalClose();

const onSubmit = () => {
  emits("onSubmit", close);
};

const onClose = () => {
  //关闭弹窗
  close();
};
</script>

<style lang="scss" scoped>
.popup-content {
  padding: 15px;
}
</style>