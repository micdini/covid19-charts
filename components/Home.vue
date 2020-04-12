<template>
  <div>
    <div class="m-2">
      <div class="jumbotron">
        <h1 class="display-4">COVID-19: Visualizzatore dati epidemia in Italia</h1>
        <p
          class="lead"
        >Semplice visualizzatore per i dati (a livello nazionale, regionale e provinciale) forniti dalla Protezione Civile.</p>
        <hr class="my-4" />
        <p>I dati utilizzati sono aggiornati quotidianamente e sono disponibili liberamente sul repository GitHub.</p>
        <p class="lead">
          <a class="btn btn-dark" href="https://github.com/pcm-dpc/COVID-19" role="button">
            Visita GitHub Repository
            <i class="fab fa-github"></i>
          </a>
        </p>
        <hr class="my-4" />
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-4 p-sm-2 p-xs-2">
            <button class="btn btn-info btn-block" @click="showPage('italia')">
              <i class="fa fa-chart-line"></i> Grafici Italia
              <br />
              <small>Visualizza dati a livello nazionale</small>
            </button>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-4 p-sm-2 p-xs-2">
            <button class="btn btn-info btn-block" @click="showPage('regioni')">
              <i class="fa fa-chart-line"></i> Grafici regioni
              <br />
              <small>Visualizza dati a livello regionale</small>
            </button>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-4 p-sm-2 p-xs-2">
            <button class="btn btn-info btn-block" @click="showPage('province')">
              <i class="fa fa-chart-line"></i> Grafici province
              <br />
              <small>Visualizza dati a livello provinciale</small>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="home-footer">
      <h3>
        <a href="https://www.linkedin.com/in/micheledini/" title="Profilo LinkedIn di Michele Dini">
          <i class="fab fa-linkedin text-info"></i>
        </a>
      </h3>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "Home",
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["showPage"])
  }
};
</script>

<style>
.home-footer {
  position: fixed;
  bottom: 40px;
  right: 40px;
}
</style>