<template>
  <div>
    <h1>Stock chart here {{ $route.params.id }}</h1>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  computed: {},

  mounted() {
    this.retrieveData();
  },

  methods: {
    ...mapActions(["readStockData"]),
    retrieveData: async function() {
      const stockDataResponse = await this.readStockData({
        symbol: this.$route.params.id,
        period: "daily"
      });
    }
  }
};
</script>