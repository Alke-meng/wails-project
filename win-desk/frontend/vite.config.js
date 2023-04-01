import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path');
import legacy from '@vitejs/plugin-legacy'
import vuejsx from "@vue/babel-plugin-jsx"
import { viteMockServe } from 'vite-plugin-mock'
import AutoImport from "unplugin-auto-import/vite"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    AutoImport ({
      imports: ["vue", "vue-router"], // 自动导入vue和vue-router相关函数
      dts: "src/auto-import.d.ts" // 生成 `auto-import.d.ts` 全局声明
    }),
    vuejsx({}),
    viteMockServe({
      supportTs:false,
      logger: false,
      mockPath: "./mock/"  //你自己创建的mock文件夹路径
    })
  ],
  resolve: {
    //配置别名
    alias: {
      '@': path.resolve(__dirname, 'src')// 设置 `@` 指向 `src` 目录
    }
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: "import { h } from 'vue';"
  },
  server: {
    port: 3001, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    // 代理
    // proxy: {
    //   '/api': {
    //     target: 'http://API网关所在域名',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   },
    // }
  }
})
