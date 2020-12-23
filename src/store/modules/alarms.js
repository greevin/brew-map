import axios from "axios"

const path = "fake_offices.json"

export default {
  state: {
    non_alarmedoffices: [],
    non_recognizing_alarmed_offices: [],
    recognizing_alarmed_offices: [],
    gMapsApiKey: ""
  },
  getters: {
    getGMapsApiKey: state => state.gMapsApiKey,
    non_recognizing_alarmed_offices: state => state.non_recognizing_alarmed_offices,
    allAlarmList: state => {
      const all = [...state.non_recognizing_alarmed_offices, ...state.non_alarmedoffices, ...state.recognizing_alarmed_offices]
      return all;
    }
  },
  mutations: {
    setAlarmsList(state, payload) {
      state.non_alarmedoffices = payload.non_alarmedoffices;
      state.non_recognizing_alarmed_offices = payload.non_recognizing_alarmed_offices;
      state.non_recognizing_alarmed_offices = payload.non_recognizing_alarmed_offices;
      state.gMapsApiKey = payload.gmapsapikey[0].value;
    },
  },
  actions: {
    getAllAlarms({commit}) {
      axios.get(path).then((res) => {
        commit("setAlarmsList", res.data)
      });
    }
  },
}