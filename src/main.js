import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
import mock from './mock/index'
mock()

Vue.use(ElementUI);

import commonUtil from './utils/common-util'
import formatter from './utils/tableColumnFormatter'

Vue.prototype.$commonUtil = commonUtil
Vue.prototype.$formatter = formatter

Vue.config.productionTip = false

new Vue({
  router,
	store,
  render: h => h(App),
}).$mount('#app')
