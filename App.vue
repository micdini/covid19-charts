<template>
  <div id="main-container">
    <Navbar :version="version"></Navbar>
    <div class="container-fluid">
      <div class="row" v-if="getPage === 'home'">
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

console.log();
export default {
  name: "App",
  data() {
    return {
      version: version
    };
  },
  computed: {
    ...mapGetters(["getPage"])
  },
  components: {
    Navbar,
    Chart,
    Home,
    Italia,
    Regioni,
    Province
  }
};
</script>

<style scoped>
</style>