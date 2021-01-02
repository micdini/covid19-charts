<template>
  <div class="row">
    <div class="col-12 col-md-9 col-lg-10 p-1">
      <div class="w-100 m-auto p-1">
        <div class="alert alert-info" v-if=" getNumberOfProvince < 1 ">
          <i class="fa fa-info-circle"></i> Selezione almeno una provincia nel menu a destra.
        </div>
        <Chart :canvasId="canvasId1" :dataArray="canvasData1" ref="chart1"></Chart>
      </div>
    </div>
    <div class="col-12 col-md-3 col-lg-2 p-1">
      <FiltroProvince></FiltroProvince>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { mapGetters, mapMutations } from "vuex";
import Chart from "./Chart.vue";
import FiltroProvince from "./FiltroProvince.vue";

export default {
  name: "Province",
  components: {
    FiltroProvince,
    Chart
  },
  data() {
    return {
      canvasId1: "chart-province-1",
      canvasData1: ["casi", "nuoviCasi"],
      showAlert: true
    };
  },
  computed: {
    ...mapGetters(["serie", "updateChart", "getNumberOfProvince"])
  },
  methods: {
    ...mapMutations(["toggleProvincia", "notifyChartUpdated"])
  },
  mounted: function() {
    //this.toggleRegione(8);
  },
  watch: {
    updateChart: {
      handler: function(newval, oldval) {
        if (newval === true) {
          this.$refs.chart1.refreshChart();
          this.notifyChartUpdated();
        }
      },
      deep: true
    }
  }
};
</script>

<style>
</style>