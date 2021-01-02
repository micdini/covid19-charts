<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" id="topnavbar">
      <div class="navbar-brand" href="#">
        COVID-19 &nbsp;
        <div class="bg-success flag"></div>
        <div class="bg-white flag"></div>
        <div class="bg-danger flag"></div>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
        <li class="nav-item" :class=" (getPage === 'home' ? 'active' : '') ">
            <a class="nav-link" @click="showPage('home')" href="#">
              <i class="fa fa-home"></i> Home
            </a>
          </li>
          <li class="nav-item" :class=" (getPage === 'report' ? 'active' : '') ">
            <a class="nav-link" @click="showPage('report')" href="#">
              <i class="fas fa-file-alt"></i> Sintesi
            </a>
          </li>
          <li class="nav-item" :class=" (getPage === 'italia' ? 'active' : '') ">
            <a class="nav-link" @click="showPage('italia')" href="#">
              <i class="fa fa-chart-line"></i> Italia
            </a>
          </li>
          <li class="nav-item" :class=" (getPage === 'regioni' ? 'active' : '') ">
            <a class="nav-link" @click="showPage('regioni')" href="#">
              <i class="fa fa-chart-line"></i> Regionali
            </a>
          </li>
          <li class="nav-item" :class=" (getPage === 'province' ? 'active' : '') ">
            <a class="nav-link" @click="showPage('province')" href="#">
              <i class="fa fa-chart-line"></i> Provinciali
            </a>
          </li>
        </ul>
        <span class="navbar-text my-2 my-lg-0">Versione {{ version }}</span>
        <a href="https://www.linkedin.com/in/micheledini/" class="m-1 text-info">
          <i class="fab fa-linkedin"></i>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
import $ from "jquery";
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "Navbar",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getPage"])
  },
  methods: {
    ...mapMutations(["showPage"])
  },
  props: ["version"]
};
</script>

<style>
li.active {
  border-bottom: solid 2px teal;
}

.flag {
  width: 10px;
  height: 1rem;
  display: inline-block;
  margin: 0px -3px;
}
</style>