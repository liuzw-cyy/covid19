import Vue from 'vue'
import App from './App.vue'
import './assets/css/common.css'
import Echarts from '@/plugins/echarts'
import api from '@/utils/request'
import Tabs from '@/components/tabs'
import router from '@/router'
import '@/plugins/vant'

Vue.use(Tabs)
Vue.use(Echarts)
Vue.config.productionTip = false
// 把所有网络请求 api 挂载到 Vue 原型上
Vue.prototype.$api = api

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
