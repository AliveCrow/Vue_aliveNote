import Vue from 'vue'
import _axios from '@/axios/axios-interceptors.ts'
import VueAxios from 'vue-axios'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import Toast from 'vue-toastification'
import "vue-toastification/dist/index.css";

import EvaIcons from 'vue-eva-icons';


Vue.config.productionTip = false
Vue.use(VueAxios, _axios)
Vue.use(EvaIcons)
Vue.use(Toast, {
  transition: "Vue-Toastification__fade",
  maxToasts: 20,
  newestOnTop: true,
  position: "top-center",
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: false,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: true,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
