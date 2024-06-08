import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  mounted () {
    document.dispatchEvent(new Event('render-event'))
  }
}).$mount('#app')
