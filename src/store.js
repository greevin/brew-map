import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

const path = "https://api.openbrewerydb.org/breweries"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    brews: [],
  },
  mutations: {
    setBreweries(state, payload) {
      state.brews = payload;
    }
  },
  actions: {
    getAllBreweries({commit}) {
      axios.get(path).then((res) => {
        commit("setBreweries", res.data)
      });
    }
  }
})
