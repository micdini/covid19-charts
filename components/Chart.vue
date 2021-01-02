<template>
  <div>
    <div class="row">
      <div class="col-12 col-md-6">
        <span class="h5">{{ chartTitle }}</span>
      </div>
      <div class="col-12 col-md-6">
        <form class="form-inline float-md-right float-lg-right float-xl-right">
          <span class="mx-1 d-none d-sm-none d-md-inline d-lg-inline"
            ><i class="fa fa-filter"></i> Filtra
          </span>
          <select class="form-control mx-1" @change="setTimeLimit">
            <option :value="0">Da inizio pandemia</option>
            <option :value="30">Ultimi 30 giorni</option>
            <option :value="60">Ultimi 60 giorni</option>
            <option :value="90">Ultimi 90 giorni</option>
            <option :value="180">Ultimi 180 giorni</option>
          </select>
          <button
            class="btn btn- btn-outline-dark"
            @click="toggleLogAxis"
            onclick="this.blur();"
          >
            <span v-if="logAxis"><i class="far fa-check-square"></i></span>
            <span v-else><i class="far fa-square"></i></span>
            Asse Y Log
          </button>
        </form>
      </div>
    </div>
    <div class="chart-container">
      <canvas :id="canvasId" width="480" height="480"></canvas>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { mapGetters, mapMutations } from "vuex";
import { Chart } from "chart.js";

export default {
  name: "Chart",
  data() {
    return {
      myChart: undefined, //reference to actual chart
      logAxis: false,
      limitSize: 0,
    };
  },
  props: {
    // data and id passed as props from parent
    dataArray: {
      type: Array,
      required: true,
    },
    canvasId: {
      type: String,
      required: true,
    },
    chartTitle: {
      type: String,
      required: false,
    },
  },
  methods: {
    ...mapMutations(["notifyChartUpdated"]),
    setTimeLimit: function (evt) {
      this.limitSize = evt.target.value;
      this.refreshChart();
    },
    toggleLogAxis: function () {
      //toggle log axis flag and refresh
      this.logAxis = !this.logAxis;
      this.refreshChart();
    },
    resizeChart: function () {
      if (this.myChart === undefined) return;
      //get size of div
      var parent = $("#" + this.canvasId).parent();
      var h = Math.max(
        480,
        Math.min(window.innerHeight * 0.7, parent.height())
      );
      var w = Math.max(480, parent.width());
      parent.height(h);
      //parent.width(w);
      this.myChart.options.aspectRation = w / h;
    },
    refreshChart: function () {
      //destroy chart if already exists
      if (this.myChart !== undefined) {
        this.myChart.destroy();
      }
      //check for nested data (e.g. regioni, province)
      var nested = this.serieData instanceof Array;

      var ds = [];

      // timestamps for filtering
      var maxTimestamp = 0; // will be set to length-1 x value
      var minTimestamp = 0; // will be set to 0 x value

      //fill data to dataset ds
      this.dataArray.forEach((e) => {
        if (nested) {
          //loop on each sub-set
          for (var i = 0; i < this.serieData.length; i++) {
            var base = this.serieData[i];
            if (base.show) {
              ds.push(base[e]);
              maxTimestamp = base[e].data[base[e].data.length - 1].x;
              minTimestamp = base[e].data[0].x;
            }
          }
        } else {
          ds.push(this.serieData[e]);
          maxTimestamp = this.serieData[e].data[
            this.serieData[e].data.length - 1
          ].x;
          minTimestamp = this.serieData[e].data[0].x;
        }
      });

      if (this.limitSize > 0) {
        // if there is a limit, go back
        var newMinTimestamp = maxTimestamp - this.limitSize * (24 * 3600 * 1000);
        if (newMinTimestamp > minTimestamp) minTimestamp = newMinTimestamp;
      }

      //create chart
      var ctx = document.getElementById(this.canvasId).getContext("2d");
      this.myChart = new Chart(ctx, {
        responsive: true,
        type: "line",
        data: {
          datasets: ds,
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          onResize: this.resizeChart,
          scales: {
            xAxes: [
              {
                type: "time",
                position: "bottom",
                offset: true,
                time: { displayFormats: { quarter: "M D" } }, //set X axis day format
                ticks: {
                  min: minTimestamp,
                  max: maxTimestamp,
                },
              },
            ],
            yAxes: [
              {
                //left axis (main)
                id: "sx",
                type: this.logAxis ? "logarithmic" : "linear",
                position: "left",
                ticks: { beginAtZero: true },
              },
              {
                //right axis (for increments)
                id: "dx",
                //type: this.logAxis?"logarithmic":"linear",
                type: "linear",
                position: "right",
                ticks: { beginAtZero: true },
              },
            ],
          },
        },
      });
      this.resizeChart();
    },
  },
  computed: {
    ...mapGetters(["serieData"]),
  },
  mounted: function () {
    setTimeout(this.refreshChart, 200);
  },
};
</script>

<style>
.title-border {
  border-bottom: 1px solid gray;
}
</style>