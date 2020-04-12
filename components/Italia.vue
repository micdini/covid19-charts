<template>
  <div class="row">
    <div class="col-12 p-1">
      <div id="carouselItalia" class="carousel slide" data-ride="carousel" data-interval="false">
        <div class="carousel-inner w-75 m-auto" style="padding-bottom: 50px">
          <div class="carousel-item active">
            <h5>{{titleId1}}</h5>
            <Chart :canvasId="canvasId1" :dataArray="canvasData1"></Chart>
          </div>
          <div class="carousel-item">
            <h5>{{titleId2}}</h5>
            <Chart :canvasId="canvasId2" :dataArray="canvasData2"></Chart>
          </div>
          <div class="carousel-item">
            <h5>{{titleId3}}</h5>
            <Chart :canvasId="canvasId3" :dataArray="canvasData3"></Chart>
          </div>
          <div class="carousel-item">
            <h5>{{titleId4}}</h5>
            <Chart :canvasId="canvasId4" :dataArray="canvasData4"></Chart>
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselItalia" role="button" data-slide="prev">
          <span class="fa fa-chevron-left text-info fa-3x" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselItalia" role="button" data-slide="next">
          <span class="fa fa-chevron-right text-info fa-3x" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
        <ol class="carousel-indicators">
          <li data-target="#carouselItalia" data-slide-to="0" class="active bg-info"></li>
          <li data-target="#carouselItalia" data-slide-to="1" class="bg-info"></li>
          <li data-target="#carouselItalia" data-slide-to="2" class="bg-info"></li>
          <li data-target="#carouselItalia" data-slide-to="3" class="bg-info"></li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { mapGetters } from "vuex";
import Chart from "./Chart.vue";

export default {
  name: "Italia",
  components: {
    Chart
  },
  data() {
    return {
      titleId1: "Totale casi e tamponi",
      titleId2: "Decessi e guariti",
      titleId3: "Variazioni percentuali",
      titleId4: "Ricoverati e terapie intensive",
      canvasId1: "chart-italia-1",
      canvasId2: "chart-italia-2",
      canvasId3: "chart-italia-3",
      canvasId4: "chart-italia-4",
      canvasData1: ["casi", "nuoviCasi", "tamponi", "nuoviTamponi"],
      canvasData2: ["decessi", "nuoviDecessi", "guariti", "nuoviGuariti"],
      canvasData3: [
        "nuoviCasiPercentuali",
        "nuoviPositiviPercentuali",
        "nuoviRicoveratiPercentuali",
        "nuoviRicoveratiICUPercentuali"
      ],
      canvasData4: [
        "ricoverati",
        "nuoviRicoverati",
        "ricoveratiICU",
        "nuoviRicoveratiICU"
      ]
    };
  },
  computed: {
    ...mapGetters(["serie"])
  }
};
</script>

<style>
h5 {
  margin: 10px auto;
}
</style>