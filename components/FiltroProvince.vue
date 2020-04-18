<template>
  <div id="accordionProvince">
    <button type="button" @click="clearProvince" class="btn btn-secondary btn-block btn-sm">Pulisci</button>
    <div class="card" v-for="cat in serie" v-bind:key="cat.id" v-bind:elem="cat">
      <div v-if="cat.codice > 0">
        <div class="card-header">
          <span class="badge badge-info">{{cat.province.length}}</span>
          <a
            class="card-link text-dark"
            data-toggle="collapse"
            :href="'#collapse' + cat.codice"
          >{{ cat.name }}</a>
        </div>
        <div :id="'collapse' + cat.codice" class="collapse" data-parent="#accordionProvince">
          <div class="card-body">
            <div v-for="prov in cat.province" v-bind:key="prov.codice" v-bind:elem="prov">
              <button
                v-if="prov.codice > 0"
                type="button"
                class="btn btn-outline-info btn-sm btn-block"
                data-toggle="button"
                @click="toggleProvinciaInt(cat.codice, prov.codice)"
                aria-pressed="false"
                autocomplete="off"
                role="button"
                :name="prov.codice"
              >{{ prov.name }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "FiltroProvince",
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["toggleProvincia"]),
    toggleProvinciaInt: function(val1, val2) {
      this.toggleProvincia({ regione: val1, provincia: val2 });
    },
    clearProvince: function() {
      this.serieData.forEach(elem => {
        elem.show = false;
      });
      this.toggleProvincia(undefined);
      $("button.active").removeClass("active");
    }
  },
  computed: {
    ...mapGetters(["serie", "serieData"])
  },
  mounted: function() {
    this.clearProvince();
  }
};
</script>

<style scoped>
button {
  margin: 2px;
}
.card-header {
  padding: 3px 10px;
}

@media (min-width: 768px) {
  #accordionProvince {
    max-height: calc(100vh - 80px);
    overflow: scroll;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 2px grey;
    border-radius: 4px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: teal;
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: turquoise;
  }
}
</style>