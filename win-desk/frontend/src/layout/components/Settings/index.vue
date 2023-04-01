<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">整体风格设置</h3>

      <div class="setting-drawer-block-checbox">
        <el-tooltip content="暗色菜单风格" placement="top">
          <div class="setting-drawer-index-item" @click="changeSetting('navTheme', 'dark')">
            <img src="@/assets/images/dark.svg" alt="dark" />
            <div v-if="navTheme === 'dark'" class="setting-drawer-index-selectIcon">
              <el-icon>
                <Check />
              </el-icon>
            </div>
          </div>
        </el-tooltip>

        <el-tooltip content="白色菜单风格" placement="top">
          <div class="setting-drawer-index-item" @click="changeSetting('navTheme', 'light')">
            <img src="@/assets/images/light.svg" alt="light" />
            <div v-if="navTheme === 'light'" class="setting-drawer-index-selectIcon">
              <el-icon>
                <Check />
              </el-icon>
            </div>
          </div>
        </el-tooltip>
      </div>
      
    </div>
  </div>
</template>


<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
const store = useStore();

const layout = computed(() => store.state.settings.layout)
const navTheme = computed(() => store.state.settings.navTheme)
const tagsView = computed(() => store.state.settings.tagsView)
const sidebarLogo = computed(() => store.state.settings.sidebarLogo)

const changeSetting = (key, value) => {
  store.dispatch('app/openSideBar')
  store.dispatch('settings/changeSetting', {
    key: key,
    value: value
  })
}

</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right;
  }

  .setting-drawer-block-checbox {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 20px;

    .setting-drawer-index-item {
      position: relative;
      margin-right: 10px;
      border-radius: 2px;
      cursor: pointer;

      img {
        width: 50px;
      }

      .setting-drawer-index-selectIcon {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        padding-top: 15px;
        padding-left: 24px;
        color: #1890ff;
        font-weight: 700;
        font-size: 14px;
      }
    }
  }
}
</style>
