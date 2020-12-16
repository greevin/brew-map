import './scss/main.scss';

import Vue from 'vue'
import App from './App.vue'

import 'leaflet/dist/leaflet.css';

// import { Icon } from 'leaflet';

// delete Icon.Default.prototype._getIconUrl;
// Icon.Default.mergeOptions({
//   iconRetinaUrl: require('../src/assets/security-camera.png'),
//   iconUrl: require('../src/assets/security-camera.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
// });

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
