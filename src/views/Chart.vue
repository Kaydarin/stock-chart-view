<template>
  <div>
    <h1>{{ $route.params.id.toUpperCase() }}</h1>
    <h4>{{ capitalize(timeframe) }}</h4>
    <apexchart
      type="candlestick"
      height="450"
      :options="chartOptions"
      :series="series"
      v-if="loaded === true"
    />
    <b-button-group>
      <b-button v-on:click="retrieveData('daily')">Daily</b-button>
      <b-button v-on:click="retrieveData('weekly')">Weekly</b-button>
      <b-button v-on:click="retrieveData('monthly')">Monthly</b-button>
    </b-button-group>
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

    retrieveData: async function(timeframe) {
      this.loaded = false;
      this.timeframe = timeframe;

      const stockDataResponse = await this.readStockData({
        symbol: this.$route.params.id,
        period: timeframe
      });

      if (stockDataResponse === false) {
        this.$bvToast.show("max-api-toast");
        this.countDown();
      }

      const stateStockData = await this.getStockData;

      this.series[0] = stateStockData;

      this.loaded = true;
    },

    countDown() {
      let maxSecs = 60;

      this.initialCountDownSecs = maxSecs;
      this.countDownSecs = maxSecs;

      const self = this;

      var downloadTimer = setInterval(function() {
        self.countDownSecs -= 1;

        if (self.countDownSecs <= 0) {
          clearInterval(downloadTimer);
        }
      }, 1000);
    },

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