<template>
  <div id="main-container">
    <Navbar :version="version"></Navbar>
    <div class="container-fluid">
      <div class="row text-center download" v-if="isDownloading !== false">
        <div
          v-for="item in progressbarItems"
          v-bind:key="item.id"
          class="col-12 col-md-4"
        >
          Download dati {{ item.name }} ({{ downloadProgress[item.key + "kb"] }}
          kB)
          <div class="progress">
            <div
              class="progress-bar bg-info"
              role="progressbar"
              v-bind:style="{ width: downloadProgress[item.key] + '%' }"
              aria-valuenow="0"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
        <div class="col-12">
          <p class="lead">
            <i class="fa fa-spin fa-spinner"></i> Download dati in corso...
          </p>
        </div>
      </div>
      <div
        v-bind:class="{ 'd-none': isDownloading !== false }"
        class="row"
        v-if="getPage === 'home'"
      >
        <div class="col p-2"></div>
        <div class="col-10 p-2">
          <Home id="home"></Home>
        </div>
        <div class="col p-2"></div>
      </div>
      <div v-else>
        <div v-if="getPage === 'italia'">
          <Italia></Italia>
        </div>
        <div v-else-if="getPage === 'regioni'">
          <Regioni></Regioni>
        </div>
        <div v-else-if="getPage === 'province'">
          <Province></Province>
        </div>
        <div v-else-if="getPage === 'report'">
          <Report></Report>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import version number
import { version } from "./package.json";
import { mapGetters } from "vuex";

import Navbar from "./components/Navbar.vue";
import Home from "./components/Home.vue";

import Chart from "./components/Chart.vue";
import Italia from "./components/Italia.vue";
import Regioni from "./components/Regioni.vue";
import Province from "./components/Province.vue";
import Report from "./components/Report.vue";

console.log();
export default {
  name: "App",
  data() {
    return {
      version: version,
      progressbarItems: [
        { name: "Italia", key: "italia", id: 0},
        { name: "Regioni", key: "regioni", id: 1},
        { name: "Province", key: "province", id: 2 },
      ],
    };
  },
  created: function () {
    console.log("Downloading: " + this.isDownloading);
  },
  computed: {
    ...mapGetters(["getPage", "isDownloading", "downloadProgress"]),
  },
  components: {
    Navbar,
    Chart,
    Home,
    Italia,
    Regioni,
    Province,
    Report,
  },
};
</script>

<style scoped>
div.progress {
  height: 4px;
}

div.download {
  min-height: 100px;
}
div.download > div {
  padding-top: 35px;
}
</style>