import Vue from 'vue'
import App from './App'
import 'mpvue-calendar/src/style.css'
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
getApp().globalData = {uid: ''}
Vue.prototype.globalData = getApp().globalData
console.log(getApp())
export default {
  config: {
    pages: [],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '第一个小程序',
      navigationBarTextStyle: 'black'
    }
  }
}
