import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps,  {
  load: {
    key: 'AIzaSyDg4rGcnL3YbrtPolk_JOBm_1Bp31byUn8',
    region: 'BR',
    language: 'pt-br'
  },
})