<template>
  <page-view>
    <div class="home">
      <el-button @click="onClick">函数调用弹窗</el-button>
      <el-button @click="onClickForm">表单实例</el-button>
    </div>
  </page-view>
</template>

<script setup>
import Logo from "@/layout/components/Sidebar/Logo.vue";
import Form from "./form.vue";
// import { useModal } from "@/hooks";
// const modal = useModal();
const onClick = () => {
  const layer = modal.open({
    component: Logo, //渲染的组件
    collapse: false, //logo组件参数
    onClick() {
      //logo组件发出的事件
      console.log("监听自定义事件，点击标题事件");
    },
    modalProps: {
      //弹窗的参数
      footer: true,
      title: "函数式弹窗",
      onOpened() {
        console.log("弹窗打开事件", "onOpened");
      },
      onSubmit(ref) {
        console.log("点击确认按钮", ref, "onSubmit");
        //处理业务逻辑后关闭弹窗
        layer.close();
      },
      onClose() {
        console.log("弹窗关闭事件", "onClose");
      },
    },
  });
};

const onClickForm = () => {
  const layer = modal.open({
    component: Form, //渲染的组件
    modalProps: {
      //弹窗的参数
      title: "弹窗表单",
      onOpened() {
        console.log("弹窗打开事件", "onOpened");
      },
      onClose() {
        console.log("弹窗关闭事件", "onClose");
      },
    },
  });
};
</script>