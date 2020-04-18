<template>
  <div>
    <div v-for="cat in serie" v-bind:key="cat.id" v-bind:elem="cat" class="cont-regione">
      <button
        v-if="cat.codice > 0"
        type="button"
        class="btn btn-outline-info btn-sm"
        data-toggle="button"
        @click="toggleRegioneInt(cat.codice)"
        aria-pressed="false"
        autocomplete="off"
        role="button"
        :name="cat.codice"
      >{{ cat.name }}</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "FiltroRegioni",
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["toggleRegione"]),
    toggleRegioneInt: function(val) {
      this.toggleRegione(val);
    }
  },
  computed: {
    ...mapGetters(["serie"])
  },
  mounted: function() {}
};
</script>

<style scoped>
button {
  margin: 2px;
}

.cont-regione > button.btn {
  display: inline;
}
.cont-regione {
  display: inline;
}

@media (min-width: 768px) {
  .cont-regione > button.btn {
    display: block;
    width: 100%;
  }
  .cont-regione {
    display: block;
  }
}
</style>