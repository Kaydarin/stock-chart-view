import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    readStockData: async function({}, payload) {
      const symbol = payload.symbol.toUpperCase();
      const apiKey = 'SOSMSNHXMVWSUKM8';

      let period;

      switch (payload.period) {
        case 'daily':
          period = 'TIME_SERIES_DAILY';
          break;
        case 'weekly':
          period = 'TIME_SERIES_WEEKLY';
          break;
        case 'monthly':
          period = 'TIME_SERIES_MONTHLY';
          break;
      }

      try {
        const successReponse = await axios.get(
          `https://www.alphavantage.co/query?function=${period}&symbol=${symbol}&apikey=${apiKey}`
        );
        console.log(successReponse);
        return successReponse;
      } catch (error) {
        console.log(error.response);
        return error.response;
      }
    }
  }
});
