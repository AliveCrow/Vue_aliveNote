import Vue from 'vue'
import _axios from '@/axios/axios-interceptors.ts'
import VueAxios from 'vue-axios'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import isotope from 'vueisotope'
import vmodal from 'vue-js-modal' //
import At from 'vue-at'
import SweetModal from 'sweet-modal-vue/src/plugin.js'




import Toast from 'vue-toastification'
import "vue-toastification/dist/index.css";

import { directive as onClickaway } from 'vue-clickaway'

import EvaIcons from 'vue-eva-icons';
import NoteCard from '@/components/NoteCard.vue';


Vue.config.productionTip = false

Vue.directive('on-clickaway', onClickaway)
// Vue.use(VueDragZone)
Vue.use(VueAxios, _axios)
Vue.use(EvaIcons)
Vue.use(SweetModal)
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

Vue.component('NoteCard',NoteCard)
Vue.component('isotope',isotope)
Vue.component('At',At)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
