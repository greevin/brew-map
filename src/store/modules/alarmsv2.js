import axios from 'axios';

const path = 'officesv2.json';

export default {
  state: {
    alarmedoffices: [],
    notalarmedoffices: [],
    gMapsApiKey: ''
  },
  getters: {
    getGMapsApiKey: state => state.gMapsApiKey,
    allAlarmList: state => {
      const allAlarms = [...state.notalarmedoffices, ...state.alarmedoffices];
      return allAlarms.filter(latitude => latitude.latitude != null);
    },
    allAlarm: state => {
      const alarm = state.alarmedoffices.filter(
        latitude => latitude.latitude != null
      );

      return alarm.sort((a, b) => {
        if (a.priority_id > b.priority_id) {
          return 1;
        } else {
          return -1;
        }
      }).reverse();

    }
  },
  mutations: {
    setAlarmsList(state, payload) {
      state.alarmedoffices = payload.alarmedoffices;
      state.notalarmedoffices = payload.notalarmedoffices;
      state.gMapsApiKey = payload.gmapsapikey[0].value;
    }
  },
  actions: {
    async getAllAlarms({ commit }) {
      await axios.get(path).then(res => {
        commit('setAlarmsList', res.data);
      });
    }
  }
};
