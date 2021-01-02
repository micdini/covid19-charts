<template>
  <div class="m-2">
    <div class="alert alert-info">
      <small class="text-muted">
        <strong>Attenzione:</strong>  gli ultimi dati disponibili sono aggiornati al <strong>{{ lastDate }}</strong>
      </small>
    </div>

    <div class="card-columns">
      <div
        class="card bg-light"
        v-for="(item, index) in items"
        v-bind:key="index"
        v-bind:class="[item.evidenza ? 'border-info' : '']"
      >
        <div class="card-header">
          <h5 class="card-title">
            {{ item.titolo }}
            <span
              class="float-right"
              data-toggle="tooltip"
              data-placement="top"
              v-bind:title="item.oggi"
              :class="getDecorations(item.oggi, item.delta)"
              >{{ prettyPrint(item.oggi, item.delta) }}
            </span>
          </h5>
        </div>
        <div class="card-body">
          <div class="card-text">
            Ieri
            <span
              class="float-right"
              :class="getDecorations(item.ieri, item.delta)"
              data-toggle="tooltip"
              data-placement="top"
              v-bind:title="item.ieri"
              >{{ prettyPrint(item.ieri, item.delta) }}</span
            ><br />
            Due giorni fa
            <span
              class="float-right"
              :class="getDecorations(item.altroieri, item.delta)"
              data-toggle="tooltip"
              data-placement="top"
              v-bind:title="item.altroieri"
              >{{ prettyPrint(item.altroieri, item.delta) }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import $ from "jquery";

export default {
  name: "Report",
  data() {
    return {
      items: [],
      lastDate: "---",
    };
  },
  created() {
    //italy data
    var root = this.repositories.italia.serie;
    var lastIndex = root.casi.data.length - 1;
    // RN prov data. ER is index 8, Rimini is index 8 at 02/01/2021
    var rootRN = this.repositories.province.serie[8].province[8];
    var lastIndexRN = rootRN.casi.data.length - 1;

    function leadZero(num) {
        if (num < 10) {
            return '0' + num;
        }
        return num;
    }

    var d =  new Date(root.nuoviCasi.data[lastIndex].x);
    this.lastDate = leadZero(d.getDate()) + '/' + leadZero(1+d.getMonth()) + '/' + d.getFullYear();
    this.lastDate += ' ' + leadZero(d.getHours()) + ':' + leadZero(d.getMinutes());
    this.lastDate += ' (' + (new Date().getDate()==d.getDate()?'oggi':'ieri') + ')';
    this.items = [
      {
        titolo: "Nuovi casi",
        oggi: root.nuoviCasi.data[lastIndex].y,
        ieri: root.nuoviCasi.data[lastIndex - 1].y,
        altroieri: root.nuoviCasi.data[lastIndex - 2].y,
        evidenza: false,
        delta: true,
      },
      {
        titolo: "Totale casi",
        oggi: root.casi.data[lastIndex].y,
        ieri: root.casi.data[lastIndex - 1].y,
        altroieri: root.casi.data[lastIndex - 2].y,
        evidenza: false,
      },
      {
        titolo: "Nuovi tamponi",
        oggi: root.nuoviTamponi.data[lastIndex].y,
        ieri: root.nuoviTamponi.data[lastIndex - 1].y,
        altroieri: root.nuoviTamponi.data[lastIndex - 2].y,
        evidenza: false,
      },
      {
        titolo: "Totale tamponi",
        oggi: root.tamponi.data[lastIndex].y,
        ieri: root.tamponi.data[lastIndex - 1].y,
        altroieri: root.tamponi.data[lastIndex - 2].y,
        evidenza: false,
      },
      {
        titolo: "Nuovi decessi",
        oggi: root.nuoviDecessi.data[lastIndex].y,
        ieri: root.nuoviDecessi.data[lastIndex - 1].y,
        altroieri: root.nuoviDecessi.data[lastIndex - 2].y,
        evidenza: false,
        delta: true,
      },
      {
        titolo: "Totale decessi",
        oggi: root.decessi.data[lastIndex].y,
        ieri: root.decessi.data[lastIndex - 1].y,
        altroieri: root.decessi.data[lastIndex - 2].y,
        evidenza: false,
      },
      {
        titolo: "Nuovi Ricoveri",
        oggi: root.nuoviRicoverati.data[lastIndex].y,
        ieri: root.nuoviRicoverati.data[lastIndex - 1].y,
        altroieri: root.nuoviRicoverati.data[lastIndex - 2].y,
        evidenza: false,
        delta: true,
      },
      {
        titolo: "Nuovi Ricoveri (T.I.)",
        oggi: root.nuoviRicoveratiICU.data[lastIndex].y,
        ieri: root.nuoviRicoveratiICU.data[lastIndex - 1].y,
        altroieri: root.nuoviRicoveratiICU.data[lastIndex - 2].y,
        evidenza: false,
        delta: true,
      },
      {
        titolo: "Ricoverati",
        oggi: root.ricoverati.data[lastIndex].y,
        ieri: root.ricoverati.data[lastIndex - 1].y,
        altroieri: root.ricoverati.data[lastIndex - 2].y,
        evidenza: false,
      },
      {
        titolo: "Ricoverati (T.I.)",
        oggi: root.ricoveratiICU.data[lastIndex].y,
        ieri: root.ricoveratiICU.data[lastIndex - 1].y,
        altroieri: root.ricoveratiICU.data[lastIndex - 2].y,
        evidenza: false,
      },
      {
        titolo: "Nuovi casi (RN)",
        oggi: rootRN.nuoviCasi.data[lastIndex].y,
        ieri: rootRN.nuoviCasi.data[lastIndex - 1].y,
        altroieri: rootRN.nuoviCasi.data[lastIndex - 2].y,
        evidenza: true,
        delta: true,
      },
      {
        titolo: "Totale casi (RN)",
        oggi: rootRN.casi.data[lastIndex].y,
        ieri: rootRN.casi.data[lastIndex - 1].y,
        altroieri: rootRN.casi.data[lastIndex - 2].y,
        evidenza: true,
      },
    ];

    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  },
  computed: {
    ...mapGetters(["repositories"]),
  },
  methods: {
    prettyPrint(val, delta) {
      var digits = 1;
      var ret = val;
      if (val > 1e6) {
        ret = (val / 1e6).toFixed(digits) + "M";
      } else if (val > 1000) {
        ret = (val / 1000).toFixed(digits) + "k";
      }

      if (delta === true && val > 0) ret = "+" + ret;
      return ret;
    },
    getDecorations(val, delta) {
      if (!delta) {
        return "text-primary";
      }
      if (val > 0) {
        return "text-danger";
      } else if (val < 0) {
        return "text-success";
      }
      return "text-info";
    },
  },
};
</script>

<style>
@media (min-width: 992px) {
  .card-columns {
    column-count: 4;
  }
}
.card-body {
  padding: 0.25rem 1.25rem;
}
.card-title {
  margin-bottom: 0.25rem;
}

h5 {
  margin: 4px auto;
}
</style>