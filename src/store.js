import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import _ from 'lodash';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ohlcmeta: {
      symbol: '',
      timezone: ''
    },
    ohlc: {
      data: []
    }
  },
  getters: {
    getStockMetaData(state) {
      return state.ohlcmeta;
    },
    getStockData(state) {
      return state.ohlc;
    }
  },
  mutations: {
    resetState(state) {
      state.ohlcmeta.symbol = '';
      state.ohlcmeta.timezone = '';
      state.ohlc.data = [];
    },
    setStockData(state, payload) {
      let stockData = payload.data;
      let newStockData = [];

      _.map(stockData, function(datas, index) {
        let newObj = {};

        _.assign(newObj, {
          x: new Date(index),
          y: [
            parseFloat(datas['1. open']),
            parseFloat(datas['2. high']),
            parseFloat(datas['3. low']),
            parseFloat(datas['4. close'])
          ]
        });

        newStockData.push(newObj);
      });

      state.ohlcmeta.symbol = payload.metadata['2. Symbol'];
      state.ohlcmeta.timezone = payload.metadata['4. Time Zone'];
      state.ohlc.data = newStockData;
    }
  },
  actions: {
    readStockData: async function({ commit }, payload) {
      commit({
        type: 'resetState'
      });

      const symbol = payload.symbol.toUpperCase();
      const apiKey = 'MS3E5Y15GTHZNZUF';

      let period;
      let periodObj;

      switch (payload.period) {
        case 'daily':
          period = 'TIME_SERIES_DAILY';
          periodObj = 'Time Series (Daily)';
          break;
        case 'weekly':
          period = 'TIME_SERIES_WEEKLY';
          periodObj = 'Weekly Time Series';
          break;
        case 'monthly':
          period = 'TIME_SERIES_MONTHLY';
          periodObj = 'Monthly Time Series';
          break;
      }

      try {
        const successReponse = await axios.get(
          `https://www.alphavantage.co/query?function=${period}&symbol=${symbol}&apikey=${apiKey}`
        );

        if (successReponse.data['Note']) {
          return false;
        }

        commit({
          type: 'setStockData',
          metadata: successReponse.data['Meta Data'],
          data: successReponse.data[periodObj]
        });
        return successReponse;
      } catch (error) {
        // console.log(error.response);
        return error.response;
      }
    }
  }
});
