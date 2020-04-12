<template>
  <div>
    <div v-for="cat in serie" v-bind:key="cat.id" v-bind:elem="cat">
      <button
        v-if="cat.codice > 0"
        type="button"
        class="btn btn-outline-info btn-sm btn-block"
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
</style>