import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

import alarms from './modules/alarms'

const path = "https://api.openbrewerydb.org/breweries?per_page=50"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    brews: [],
    lat: -13.702797,
    lng: -60.7216679,
    zoom: 3
  },
  mutations: {
    setBreweries(state, payload) {
      state.brews = payload;
    },
    onClickList(state, payload) {
      state.lat = payload[0];
      state.lng = payload[1];
      state.zoom = 15;
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
          lat: parseFloat(state.lat),
          lng: parseFloat(state.lng),
        };
      }
      return {
        lat: parseFloat(state.lat),
        lng: parseFloat(state.lng),
      };
    },
    updateMaps: (state) => {
      return {
        lat: parseFloat(state.lat),
        lng: parseFloat(state.lng)
      }
    },
  },
  modules: {
    alarms
  }
})
