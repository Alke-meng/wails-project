<template>
  <div class="login-container">
    <div class="login-content">
      <el-card shadow="none">

       <span class="text-muted text-center">
         <el-avatar class="text-center" :size="60" :src="avatar"></el-avatar>
       </span>
        <span class="text-muted text-center"> 欢迎使用@工具</span>
        <el-form ref="formRef" :model="form" :rules="rules" class="login-form">

          <el-form-item prop="ip">
            <el-input
                v-model="form.ip"
                prefix-icon="Link"
                placeholder="请输入IP地址(包括端口号)"
            >
            </el-input>
          </el-form-item>

          <el-form-item prop="username">
            <el-input
              v-model="form.username"
              prefix-icon="User"
              placeholder="请输入用户名"
            >
            </el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              prefix-icon="Lock"
              show-password
            />
          </el-form-item>

          <el-button
            v-loading="loading"
            type="primary"
            style="width: 100%; margin-bottom: 30px"
            @click="submitForm(formRef)"
            >登录</el-button
          >
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import {ref, reactive, computed} from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { setToken } from "../../utils/auth";
import {GreetLogin} from "../../../wailsjs/go/service/App"
import { ElMessage } from 'element-plus';
import aitePng from '@/assets/images/aite.png'

const avatar = aitePng

const form = reactive({
  username: "",
  password: "",
});

const loading = ref(false);
const formRef = ref(null);
const rules = reactive({
  ip: [{ required: true, message: "请输入用IP地址" }],
  username: [{ required: true, message: "请输入用户名" }],
  password: [{ required: true, message: "请输入密码" }],
});

const store = useStore();
const router = useRouter();

const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (!valid) return;
    loading.value = true;

    //请求
    GreetLogin(JSON.stringify(form)).then((result) => {
      const data = JSON.parse(result)
      console.log(data)
      if (typeof data.code != "undefined" && data.code == 1) {
        setToken(data.data.token)
        store.state.user.name = form.username
        store.state.user.roles = "管理员"
        router.push({ path: "/home" });
        loading.value = false;
      } else {
        ElMessage({
          showClose: true,
          message: "登入错误，请重新输入！",
          type: 'error',
          center: true,
        })
        router.push({ path: "/" });
        loading.value = false;
      }
    });
  });
};

</script>

<style lang="scss" scoped>
.login-container {
  background: url("https://preview.pro.antdv.com/assets/background.ebcb9160.svg");
    no-repeat: 100%;
  background-size: 100%;
  background-color: #6c757d;
  position: relative;
  font-family: Open Sans, sans-serif;
  font-size: 14px;
  font-weight: 400;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  min-width: 100%;
  min-height: 100vh;
}
.login-container .login-content {
  position: relative;
  width: 390px;
  padding: 15px;
  z-index: 5;
  :deep(.el-card) {
    border: none;
  }
  :deep(.el-form-item) {
    margin-bottom: 24px;
  }
  .text-muted {
    color: #6c757d;
    display: inline-block;
    margin-bottom: 20px;
    width: 100%;
    text-align: center;
  }
  .el-form-item__content {
    display: flex;
    align-items: center;
  }
}
</style>
