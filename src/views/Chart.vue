<template>
  <div>
    <!-- Titles -->
    <h1>{{ $route.params.id.toUpperCase() }}</h1>
    <h4>{{ capitalize(timeframe) }}</h4>
    <!-- Main Chart -->
    <apexchart
      type="candlestick"
      height="450"
      :options="chartOptions"
      :series="series"
      v-if="loaded === true"
    />
    <!-- Chart Time Frame Toggle -->
    <b-button-group>
      <b-button v-on:click="retrieveData('daily')">Daily</b-button>
      <b-button v-on:click="retrieveData('weekly')">Weekly</b-button>
      <b-button v-on:click="retrieveData('monthly')">Monthly</b-button>
    </b-button-group>
    <!-- Toast Message Prompt -->
    <b-toast
      id="max-api-toast"
      class="max-api-toast-message"
      title="Max API call reached!"
      static
      no-auto-hide
    >
      <p class="max-api-toast-message-p">Maximum of 5 same API call per minutes allowed</p>
      <p
        v-if="countDownSecs !== 0"
      >You can call the same stock API after {{ countDownSecs }} seconds...</p>
      <p v-else>You can refresh this page now...</p>
      <b-progress variant="warning" :max="initialCountDownSecs" :value="countDownSecs" height="4px"></b-progress>
    </b-toast>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import VueApexCharts from "vue-apexcharts";
import _ from "lodash";

export default {
  data: function() {
    return {
      loaded: false,
      countDownSecs: 0,
      initialCountDownSecs: 0,
      timeframe: "",
      series: [
        {
          data: [
            {
              x: new Date(1538778600000),
              y: [6629.81, 6650.5, 6623.04, 6633.33]
            },
            {
              x: new Date(1538780400000),
              y: [6632.01, 6643.59, 6620, 6630.11]
            },
            {
              x: new Date(1538782200000),
              y: [6630.71, 6648.95, 6623.34, 6635.65]
            }
          ]
        }
      ],
      chartOptions: {
        title: {
          text: "CandleStick Chart",
          align: "left"
        },
        xaxis: {
          type: "datetime"
        },
        yaxis: {
          tooltip: {
            enabled: true
          }
        }
      }
    };
  },

  components: {
    apexchart: VueApexCharts
  },

  computed: {
    ...mapGetters(["getStockMetaData", "getStockData"])
  },

  created() {
    this.retrieveData("monthly");
  },

  methods: {
    ...mapActions(["readStockData"]),

    /*
      -- Retrieve data on API call
    */
    retrieveData: async function(timeframe) {
      // Set data loaded to false
      this.loaded = false;

      // Set selected timeframe (daily, weekly, monthly)
      this.timeframe = timeframe;

      // Get stock data from API call
      const stockDataResponse = await this.readStockData({
        symbol: this.$route.params.id,
        period: timeframe
      });

      // If API call is in max count,
      // show message
      if (stockDataResponse === false) {
        this.$bvToast.show("max-api-toast");
        this.countDown();
      }

      // Map global state data to local state
      const stateStockData = await this.getStockData;
      this.series[0] = stateStockData;

      // Set data loaded to true
      this.loaded = true;
    },

    /*
      -- Max API message countdown
    */
    countDown() {
      // Set initial seconds
      let maxSecs = 60;
      this.initialCountDownSecs = maxSecs;

      // Set initial countdown seconds
      this.countDownSecs = maxSecs;

      const self = this;

      // Countdown
      var downloadTimer = setInterval(function() {
        self.countDownSecs -= 1;

        // If countdown reaches 0, stop countdown
        if (self.countDownSecs <= 0) {
          clearInterval(downloadTimer);
        }
      }, 1000);
    },

    /*
      -- Text capitalize function
    */
    capitalize(text) {
      return _.capitalize(text);
    }
  }
};
</script>

<style lang="scss" scoped>
.max-api-toast-message {
  position: absolute;
  top: 50%;
  left: 40%;
}

.max-api-toast-message-p {
  text-align: left;
}
</style>