<template>
  <div class="right-menu">
    <el-dropdown class="avatar-container right-menu-item hover-effect">
      <div class="avatar-wrapper">
        <el-avatar
          size="small"
          :src="avatar + '?imageView2/1/w/80/h/80'"
        ></el-avatar>
        <span class="name hidden-xs-only"> {{ name }}</span>
        <i class="el-icon-arrow-down" />
      </div>
      <template #dropdown>
        <el-dropdown-menu class="user-dropdown">
          <router-link to="#">
            <el-dropdown-item> 个人中心 </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click="logout">
            <span style="display: block">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from 'vue'
import { useRouter,useRoute } from 'vue-router'
import { removeToken } from "../../../utils/auth";

const store = useStore();
const router = useRouter();
const route = useRoute();

//const avatar = computed(() => store.state.user.avatar || 'https://cdn.eleadmin.com/20200610/avatar.jpg')
import xmPng from '@/assets/images/xm.png'
const avatar = xmPng

const name = computed(() => store.state.user.name || '管理员')

const logout = async () =>{
  //await store.dispatch("user/logout");
  removeToken();
  router.push(`/login?redirect=${route.fullPath}`);
}

</script>


<style lang="scss" scoped>
@media only screen and (max-width: 767px) {
  .hidden-xs-only {
    display: none !important;
  }
}
.right-menu {
  float: right;
  height: 100%;
  &:focus {
    outline: none;
  }
  .right-menu-item {
    display: inline-block;
    padding: 0 8px;
    height: 100%;
    font-size: 18px;
    color: #5a5e66;
    vertical-align: text-bottom;

    &.hover-effect {
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }
  .avatar-container {
    margin-right: 15px;
    .avatar-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      line-height: 50px;
      .name {
        margin-left: 5px;
        font-size: 14px;
      }
      .el-icon-arrow-down {
        font-size: 12px;
        margin-left: 4px;
        font-weight: 700;
      }
    }
  }
}
</style>
