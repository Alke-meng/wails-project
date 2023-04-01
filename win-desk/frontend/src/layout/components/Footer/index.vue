<template>
  <div class="footer">
    <div class="copyright">© {{ dateYear }} 版权所有 {{ config.title }}</div>
  </div>
</template>


<script setup>
import config from "@/config";
import { computed } from "vue";
const dateYear = computed(() => {
  const date = new Date();
  return date.getFullYear();
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.footer {
  padding: 16px;
  text-align: center;
  background: $pageBg;
  .links {
    margin-bottom: 8px;

    a {
      color: rgba(0, 0, 0, 0.45);

      &:hover {
        color: rgba(0, 0, 0, 0.65);
      }

      &:not(:last-child) {
        margin-right: 40px;
      }
    }
  }
  .copyright {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
}
</style>
