<template>
  <div>
    <div class="m-2">
      <div class="jumbotron">
        <div>
          <span class="display-4">COVID-19: dati epidemia in Italia</span>
        </div>
        <p class="lead">
          Semplice visualizzatore per i dati (a livello nazionale, regionale e provinciale) forniti dalla Protezione Civile.</p>
        
        <hr class="my-4" />
        <div class="row">
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 p-top">
            <button class="btn btn-info btn-block" @click="showPage('report')">
              <i class="fas fa-file-alt"></i> Sintesi dati
              <br />
              <small>Visualizza sintesi nazionale</small>
            </button>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 p-top">
            <button class="btn btn-info btn-block" @click="showPage('italia')">
              <i class="fa fa-chart-line"></i> Grafici Italia
              <br />
              <small>Visualizza dati nazionali</small>
            </button>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 p-top">
            <button class="btn btn-info btn-block p-1" @click="showPage('regioni')">
              <i class="fa fa-chart-line"></i> Grafici regioni
              <br />
              <small>Visualizza dati regionali</small>
            </button>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 p-top">
            <button class="btn btn-info btn-block p-1" @click="showPage('province')">
              <i class="fa fa-chart-line"></i> Grafici province
              <br />
              <small>Visualizza dati provinciali</small>
            </button>
          </div>
        </div>
        <hr class="my-4" />
        <div class="row">
          <div class="col-12 col-md-8 col-lg-9 col-xl-9">I dati utilizzati sono aggiornati quotidianamente e sono disponibili liberamente sul repository GitHub.</div>
          <div class="col-12 col-md-4 col-lg-3 col-xl-3"><a class="btn btn-block btn-dark" href="https://github.com/pcm-dpc/COVID-19" role="button">
            Visita GitHub Repository
            <i class="fab fa-github"></i>
          </a></div>
        </div>

        <hr>
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
                  09/01/2021 -
                  <i>Versione 0.11.2</i>
                </p>
                <ul>
                  <li>Risolto ricaricamento della pagina al cambio di scala dei grafici (lin-log)</li>
                </ul>
              </div>
              <div>
                <p>
                  02/01/2021 -
                  <i>Versione 0.11.0</i>
                </p>
                <ul>
                  <li>Aggiunta pagina con sintesi dati nazionali e prvincia di Rimini</li>
                  <li>Aggiunto filtro per restringere intervallo temporale nei grafici</li>
                  <li>Aggiunta scala logaritmica per asse sinistro grafici</li>
                </ul>
              </div>
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

button {
  height: 100%;
}
</style>