import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')


// 引入axios:npm i axios -S
import axios from 'axios'
axios.defaults.withCredentials = true; // 允许发送cookie等用户认证凭据
axios.defaults.baseURL = 'http://localhost:8083/sims/'
app.config.globalProperties.$axios = axios;


// 引入Element Plus:npm i element-plus -S
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)