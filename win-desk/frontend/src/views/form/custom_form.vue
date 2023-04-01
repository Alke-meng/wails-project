<template>
  <page-view>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
    >
      <g-select
        prop="region"
        label="g-select"
        v-model="ruleForm.region"
        dictCode="123"
      >
      </g-select>
      <el-form-item label="g-date-range" prop="date1">
        <g-date-range v-model="ruleForm.date1"></g-date-range>
      </el-form-item>
      <g-date-picker
        prop="date2"
        label="g-date-picker"
        v-model="ruleForm.date2"
      ></g-date-picker>
      <g-input
        label="g-input"
        prop="desc"
        placeholder="请输入"
        v-model="ruleForm.desc"
      >
      </g-input>
      <g-radio-group
        prop="resource"
        label="g-radio-group"
        v-model="ruleForm.resource"
        dictCode="123"
      />
      <g-input-append
        label="g-input-append"
        prop="name"
        placeholder="请选择"
        @click="onAppendClick"
        v-model="ruleForm.name"
      ></g-input-append>
      <el-form-item>
        <div style="background: #f4f4f4; border-radius: 5px; padding: 20px">
          {{ ruleForm }}
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >Create</el-button
        >
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
      <g-dialog v-model="visible" title="g-dialog" @confirm="confirm">
        测试
      </g-dialog>
    </el-form>
  </page-view>
</template>

<script setup>

import { ref, reactive } from "vue";

import Form from "../example/form.vue";
const ruleFormRef = ref();
const ruleForm = reactive({
  name: "Hello",
  region: "",
  count: "",
  date1: [],
  date2: undefined,
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});

const visible = ref(false);
const  confirm = () => {
    visible.value = false
}
const rules = reactive({
  name: [
    { required: true, message: "Please input Activity name", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  region: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "change",
    },
  ],
  count: [
    {
      required: true,
      message: "Please select Activity count",
      trigger: "change",
    },
  ],
  date1: [
    {
      required: true,
      message: "Please pick a date",
      trigger: "change",
    },
  ],
  date2: [
    {
      required: true,
      message: "Please pick a time",
      trigger: "change",
    },
  ],
  type: [
    {
      type: "array",
      required: true,
      message: "Please select at least one activity type",
      trigger: "change",
    },
  ],
  resource: [
    {
      required: true,
      message: "Please select activity resource",
      trigger: "change",
    },
  ],
  desc: [
    { required: true, message: "Please input activity form", trigger: "change", },
  ],
});

const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};

const modal = useModal();

const onAppendClick = () => {
  visible.value = true;
  // modal.open({
  //   component: Form, //渲染的组件
  //   modalProps: {
  //     //弹窗的参数
  //     title: "弹窗表单",
  //   },
  // });
};
</script>
