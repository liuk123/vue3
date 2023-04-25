import { createApp } from 'vue'
import App from './App.vue'
import init from '@/framework/init'
import router from './framework/router'
import * as echarts from "echarts";
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'

init(()=>{
  const app = createApp(App)
  app.use(router).use(ElementPlus)
  app.mount('#app')
  app.config.globalProperties.$echarts = echarts
  return app
})

