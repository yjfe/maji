/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-01-24 14:15:10
 * @LastEditTime: 2020-12-09 11:05:23
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import VueDND from 'awe-dnd' // 拖拽
import cloudbase from '@cloudbase/js-sdk' // 腾讯云的jssdk
import '@/styles/index.less'
import components from '@/components'
import * as filters from '@/filters' // 全局vue filter
import host from '@/utils/host'
import router from '@/routers'
import store from '@/store' 
import * as httpAgent from '@/utils/http' // http方法
import '@/globalComponents' // 组件自定义
import App from './App.vue'
// import '@/directives' // 自定义指令

window.globalConfig = host

Vue.use(ElementUI, {
  size: 'small'
})

Vue.use(components)
Vue.use(VueDND)

// 全局配置
Vue.config.productionTip = false

// register global utility filters.
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

// 挂载腾讯有jssdk
window.tcbApp = cloudbase.init({
  env: 'node-generate-7glxke4qc18d7586'
})

// 为了代码组件使用一些全局方法
Vue.prototype.$https = httpAgent // 挂上http
Vue.prototype.$filters = filters // 挂上过滤器


Vue.prototype.$setBreadcrumb = (val) => {
  const path = ''
  val.forEach((item) => {
    item.path = path + item.path
  })
  window.parent.postMessage(
    {
      act: 'breadcrumb',
      msg: val
    },
    '*'
  )
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
