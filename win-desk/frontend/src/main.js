import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import router from '@/router'
import store from '@/store'
import plugin from '@/utils/plugin'
import '@/styles/index.scss' // global css
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import setupComponent from '@/components'
import VueClipboard from 'vue3-clipboard'
import * as echarts from 'echarts'
import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/lib/common'
import highlightVuePlugin from '@highlightjs/vue-plugin'
import JsonViewer from "vue3-json-viewer"

const app = createApp(App)

import '../mock/index.js'
import './permission.js'

//注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.config.globalProperties.$echarts = echarts;

app.use(plugin)
app.use(router)
app.use(store)
app.use(ElementPlus, { size: 'default',locale: zhCn });
app.use(VueClipboard, {autoSetContainer: true, appendToBody: true})
app.use(highlightVuePlugin)
app.use(JsonViewer)

//全局组件注册
setupComponent(app)

app.mount('#app')