<template>
    <v-menu transition="slide-y-transition" bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn small v-bind="attrs" v-on="on">{{ getPageSize }}</v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          v-on:click="fetchPage({ _page: 0, _size: item })"
        >
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      items: [5, 10, 15, 25],
    };
  },
  computed: { ...mapGetters(["getPageSize"]) },
  methods: mapActions(["fetchPage"]),
};
</script>

<style scoped>
.v-btn{
  position: absolute;
  right: 0;
  top:50%;
  transform: translateY(-50%);
}
</style>