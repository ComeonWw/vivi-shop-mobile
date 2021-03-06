import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/styles/base.css'

import Vant from 'vant'
import 'vant/lib/index.css'

// 使用createApp创建vue实例
// 通过mount进行挂载，挂载元素和vue2一样
const app = createApp(App)
app.use(router)
app.use(Vant)
app.mount('#app')
