// 插件,注册全局组件,以及全局方法
import PageView from '@/layout/PageView.vue'
import { download } from './index.js'
import storage from './storage.js'
export default {
  install(app) {

    // 注册全局组件
    app.component('page-view', PageView)
    // 注册全局方法
    app.config.globalProperties.$download = download //文件下载
    app.config.globalProperties.$cache = storage //本地缓存
  }
}

