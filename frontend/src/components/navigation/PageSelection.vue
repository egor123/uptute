<template>
  <v-btn
    elevation="8"
    x-small
    depressed
    v-bind:class="{ active: getPage == index }"
    v-on:click="fetch()"
  >
    <div v-if="index >= 0">
      {{ index + 1 }}
    </div>
    <div v-else>...</div>
  </v-btn>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    index: Number,
  },
  computed: mapGetters(["getPage"]),
  methods: {
    ...mapActions(["fetchPage"]),
    fetch() {
      if (this.index >= 0) this.fetchPage({ _page: this.index });
    },
  },
};
</script>

<style scoped>
button:active {
  color: var(--v-active-base);
}
button.active {
  color: var(--v-secondary-base);
}
</style>