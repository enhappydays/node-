import './assets/main.css'

import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

import './permisson'
const app = createApp(App)
app.use(router)
app.use(createPinia())

app.use(ElementPlus)
app.mount('#app')
