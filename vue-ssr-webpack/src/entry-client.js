// 仅仅运行于浏览器（将结构挂载到dom）
import Vue from 'vue'
import { createApp } from './app'
const {app} =createApp()
app.$mount('#app')