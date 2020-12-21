import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

const path = "https://api.openbrewerydb.org/breweries"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    brews: [],
    lat: '',
    lng: ''
  },
  mutations: {
    setBreweries(state, payload) {
      state.brews = payload;
    },
    onClickList(state, payload) {
      state.lat = payload[0];
      state.lng = payload[1];
    }
  },
  actions: {
    getAllBreweries({commit}) {
      axios.get(path).then((res) => {
        commit("setBreweries", res.data)
      });
    }
  },
  getters: {
    brews: state => state.brews,
    mapCenter: state => {
      if (!state.brews.length) {
        return {
          lat: 10,
          lng: 10,
        };
      }
      return {
        lat: parseFloat(state.brews[0].latitude),
        lng: parseFloat(state.brews[0].longitude),
      };
    },
    updateMaps: (state) => {
      console.log(state.lat)
    },
  }
})
