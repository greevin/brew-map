import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import store from '@/store/store'

Vue.use(VueGoogleMaps,  {
  load: {
    key: ''
  },
})

console.log(store.getters.getGMapsApiKey)