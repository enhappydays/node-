// 创建app实例
import Vue from 'vue'
import App from './App.vue'

// 导出工厂函数 创建新应用实例对象
export function createApp() {
    const app=new Vue({
        render:h=>h(App)
    })

    return {app}
}