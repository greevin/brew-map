import axios from "axios"

const path = "fake_offices.json"

export default {
  state: {
    alarms: [],
    non_alarmedoffices: [],
    non_recognizing_alarmed_offices: [],
    recognizing_alarmed_offices: []
  },
  getters: {
    currentCount: state => state.count,
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