import './scss/main.scss';

import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store/store'
import '@/plugins/bootstrap-vue'

import 'leaflet/dist/leaflet.css';

import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps,  {
  load: {
    key: ''
  },
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')