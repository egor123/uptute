<template>
  <v-btn
    elevation="5"
    small
    rounded
    depressed
    v-on:click="
      if ((add < 0 && getPage > 0) || (add > 0 && getPage < getPageCount - 1))
        fetchPage({ _page: getPage + add });
    "
  >
    <div v-if="add > 0">&#8250;</div>
    <div v-else>&#8249;</div>
  </v-btn>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    add: Number,
  },
  computed: mapGetters(["getPage", "getPageCount"]),
  methods: mapActions(["fetchPage"]),
};
</script>

<style scoped>
button {
  margin: 10px;
}
</style>