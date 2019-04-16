import Vue from 'vue'
import App from './App'
import 'mpvue-calendar/src/style.css'
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
Vue.prototype.globalData = {uid: '', test: '测试全局变量'}
