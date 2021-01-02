<template>
  <div class="row">
    <div class="col-12 col-md-9 col-lg-10 p-1">
      <div class="w-100 m-auto p-1">
        <div class="alert alert-info" v-if=" getNumberOfRegions < 1 ">
          <i class="fa fa-info-circle"></i> Selezione almeno una regione nel menu a destra.
        </div>
        <Chart :canvasId="canvasId1" :dataArray="canvasData1" ref="chart1"></Chart>
      </div>
    </div>
    <div class="col-12 col-md-3 col-lg-2 p-1">
      <FiltroRegioni></FiltroRegioni>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { mapGetters, mapMutations } from "vuex";
import Chart from "./Chart.vue";
import FiltroRegioni from "./FiltroRegioni.vue";

export default {
  name: "Regioni",
  components: {
    FiltroRegioni,
    Chart
  },
  data() {
    return {
      canvasId1: "chart-regioni-1",
      canvasData1: ["casi", "nuoviCasi"],
      showAlert: true
    };
  },
  computed: {
    ...mapGetters(["serie", "updateChart", "getNumberOfRegions"])
  },
  methods: {
    ...mapMutations(["toggleRegione", "notifyChartUpdated"])
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