import { createApp } from 'vue'
import App from './App.vue'
import init from '@/framework/init'
import router from './framework/router'

init(()=>{
  const app = createApp(App)
  app.use(router)
  app.mount('#app')
})

