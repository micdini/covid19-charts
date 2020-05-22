<template>
  <div>
    <div class="m-2">
      <div class="jumbotron">
        <h1>
          <span class="display-4">COVID-19</span>
          <br />
          <small>Visualizzatore dati epidemia in Italia</small>
        </h1>
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
          <div class="col-xs-12 col-sm-12 col-md-4 p-top">
            <button class="btn btn-info btn-block" @click="showPage('italia')">
              <i class="fa fa-chart-line"></i> Grafici Italia
              <br />
              <small>Visualizza dati a livello nazionale</small>
            </button>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-4 p-top">
            <button class="btn btn-info btn-block p-1" @click="showPage('regioni')">
              <i class="fa fa-chart-line"></i> Grafici regioni
              <br />
              <small>Visualizza dati a livello regionale</small>
            </button>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-4 p-top">
            <button class="btn btn-info btn-block p-1" @click="showPage('province')">
              <i class="fa fa-chart-line"></i> Grafici province
              <br />
              <small>Visualizza dati a livello provinciale</small>
            </button>
          </div>
        </div>
        <hr class="my-4" />
        <div class="row">
          <div class="col-12">
            <h6>
              Changelog
              <small>
                <a
                  class="text-info"
                  data-toggle="collapse"
                  href="#collapseChangelog"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseChangelog"
                >
                  <i class="fa fa-plus"></i>
                </a>
              </small>
            </h6>

            <div class="collapse" id="collapseChangelog">
              <div>
                <p>
                  22/05/2020 -
                  <i>Versione 0.10.0</i>
                </p>
                <ul>
                  <li>Aggiornato formato dati per rispecchiare modifiche repository (P.A. Trento e P.A. Bolzano)</li>
                  <li>Rimozione output di debug su console, aggiunti messaggi sper eccezioni</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="home-footer">
      <h3 class="text-right">
        <a href="https://github.com/micdini/covid19-charts" title="Github repository">
          <i class="fab fa-github text-dark"></i>
        </a>
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
.p-top {
  padding-top: 10px;
}
</style>