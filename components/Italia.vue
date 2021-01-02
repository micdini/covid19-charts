<template>
  <div id="carouselItalia" class="carousel slide" data-ride="carousel" data-interval="false">
    <div class="row">
      <div class="d-none d-md-flex col-md-1">
        <a
          class="carousel-control-prev carousel-arrow"
          href="#carouselItalia"
          role="button"
          data-slide="prev"
          id="carouselPrev"
        >
          <span class="fa fa-chevron-left text-info fa-2x" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
      </div>
      <div class="col-12 col-md-10 p-1">
        <div class="carousel-inner m-auto" style="padding-bottom: 50px">
          <div class="carousel-item active">
            <Chart :chartTitle="titleId1" :canvasId="canvasId1" :dataArray="canvasData1"></Chart>
          </div>
          <div class="carousel-item">
            <Chart :chartTitle="titleId2" :canvasId="canvasId2" :dataArray="canvasData2"></Chart>
          </div>
          <div class="carousel-item">
            <Chart :chartTitle="titleId3" :canvasId="canvasId3" :dataArray="canvasData3"></Chart>
          </div>
          <div class="carousel-item">
            <Chart :chartTitle="titleId4" :canvasId="canvasId4" :dataArray="canvasData4"></Chart>
          </div>
        </div>

        <ol class="carousel-indicators d-none d-md-flex">
          <li data-target="#carouselItalia" data-slide-to="0" class="active bg-info"></li>
          <li data-target="#carouselItalia" data-slide-to="1" class="bg-info"></li>
          <li data-target="#carouselItalia" data-slide-to="2" class="bg-info"></li>
          <li data-target="#carouselItalia" data-slide-to="3" class="bg-info"></li>
        </ol>
      </div>
      <div class="d-none d-md-flex col-md-1">
        <a
          class="carousel-control-next carousel-arrow"
          href="#carouselItalia"
          role="button"
          data-slide="next"
          id="carouselNext"
        >
          <span class="fa fa-chevron-right text-info fa-2x" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
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
.carousel-arrow {
  margin: auto 10px;
}

.carousel-item {
  display: inline-block;
  margin-right: 0px;
  margin-bottom: 15px;
}

@media (min-width: 768px) {
  .carousel-item {
    display: none;
    margin-right: -100%;
  }
}
</style>