import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 注册 element
import '@/global/element'

import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.less'
import './assets/css/reset.less'

import { request } from './service/request'

Vue.prototype.$request = request
Vue.prototype.$warn = function () {
  this.$message.error('功能还在开发中。。。')
}
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

