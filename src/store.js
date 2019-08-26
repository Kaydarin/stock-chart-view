import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import _ from 'lodash';

Vue.use(Vuex);

export default new Vuex.Store({
  /*
    -- State
  */
  state: {
    ohlcmeta: {
      symbol: '',
      timezone: ''
    },
    ohlc: {
      data: []
    }
  },

  /*
    -- Getters
  */
  getters: {
    getStockMetaData(state) {
      return state.ohlcmeta;
    },
    getStockData(state) {
      return state.ohlc;
    }
  },

  /*
    -- Mutations
  */
  mutations: {
    resetState(state) {
      state.ohlcmeta.symbol = '';
      state.ohlcmeta.timezone = '';
      state.ohlc.data = [];
    },
    setStockData(state, payload) {
      let stockData = payload.data;
      let newStockData = [];

      // Reformat data
      _.map(stockData, function(datas, index) {
        let newObj = {};

        // Assign new formatted object data
        _.assign(newObj, {
          x: new Date(index),
          y: [
            parseFloat(datas['1. open']),
            parseFloat(datas['2. high']),
            parseFloat(datas['3. low']),
            parseFloat(datas['4. close'])
          ]
        });

        // Push to collection
        newStockData.push(newObj);
      });

      // Set to global state
      state.ohlcmeta.symbol = payload.metadata['2. Symbol'];
      state.ohlcmeta.timezone = payload.metadata['4. Time Zone'];
      state.ohlc.data = newStockData;
    }
  },

  /*
    -- Actions
  */
  actions: {
    readStockData: async function({ commit }, payload) {
      // Clear all existing related state data
      commit({
        type: 'resetState'
      });

      // Capitalize stock symbol
      const symbol = payload.symbol.toUpperCase();

      // Set API key
      const apiKey = 'MS3E5Y15GTHZNZUF';

      let period;
      let periodObj;

      // Map timeframe selection
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
        // Call API
        const successReponse = await axios.get(
          `https://www.alphavantage.co/query?function=${period}&symbol=${symbol}&apikey=${apiKey}`
        );

        // If 'Note' data object exists (Indicator of max API call reached)
        // return partial error
        if (successReponse.data['Note']) {
          return false;
        }

        // Mutate the retrived data
        // and set to global state
        commit({
          type: 'setStockData',
          metadata: successReponse.data['Meta Data'],
          data: successReponse.data[periodObj]
        });

        // Return success response
        return successReponse;
      } catch (error) {
        // Return error response
        return error.response;
      }
    }
  }
});
