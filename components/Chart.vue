<template>
  <div class="chart-container">
    <canvas :id="canvasId" width="480" height="480"></canvas>
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
      myChart: undefined //reference to actual chart
    };
  },
  props: {
    // data and id passed as props from parent
    dataArray: {
      type: Array,
      required: true
    },
    canvasId: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapMutations(["notifyChartUpdated"]),
    resizeChart: function() {
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

      console.log("parent" + h + " " + w);
      console.log(
        "canvas" +
          $("#" + this.canvasId).height() +
          " " +
          $("#" + this.canvasId).width()
      );
    },
    refreshChart: function() {
      //destroy chart if already exists
      if (this.myChart !== undefined) {
        this.myChart.destroy();
      }
      //check for nested data (e.g. regioni, province)
      var nested = this.serieData instanceof Array;

      var ds = [];
      //fill data to dataset ds
      this.dataArray.forEach(e => {
        if (nested) {
          //loop on each sub-set
          for (var i = 0; i < this.serieData.length; i++) {
            var base = this.serieData[i];
            if (base.show) ds.push(base[e]);
          }
        } else {
          ds.push(this.serieData[e]);
        }
      });

      //create chart
      var ctx = document.getElementById(this.canvasId).getContext("2d");
      this.myChart = new Chart(ctx, {
        responsive: true,
        type: "line",
        data: {
          datasets: ds
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
                time: { displayFormats: { quarter: "M D" } } //set X axis day format
              }
            ],
            yAxes: [
              {
                //left axis (main)
                id: "sx",
                type: "linear",
                position: "left",
                ticks: { beginAtZero: true }
              },
              {
                //right axis (for increments)
                id: "dx",
                type: "linear",
                position: "right",
                ticks: { beginAtZero: true }
              }
            ]
          }
        }
      });
      this.resizeChart();
    }
  },
  computed: {
    ...mapGetters(["serieData"])
  },
  mounted: function() {
    setTimeout(this.refreshChart, 200);
  }
};
</script>

<style>
</style>