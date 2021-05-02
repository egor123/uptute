<template>
  <div class="container">
    <v-expansion-panels v-model="panel" multiple hover focusable id="panels">
      <Subjects v-model="search.subjects" />
      <Languages v-model="search.languages" />
      <Audience v-model="search.grade" />
      <Price v-model="search.price" />
      <Day v-model="search.date" />
      <Time v-model="search.time" />
      <Age v-model="search.age" />
      <SortBy v-model="search.filter" />
    </v-expansion-panels>
    <v-btn
      id="panel"
      small
      depressed
      outlined
      plain
      rounded
      @click="search = copy(def)"
      >{{ $l("find.filters.refresh") }}</v-btn
    >
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Subjects from "./Subjects";
import Languages from "./Languages";
import Audience from "./Audience";
import Price from "./Price";
import Day from "./Day";
import Time from "./Time";
import Age from "./Age";
import SortBy from "../sidepanel/SortBy.vue";

export default {
  components: {
    Subjects,
    Languages,
    Audience,
    Price,
    Day,
    Time,
    Age,
    SortBy,
  },
  data() {
    return {
      panel: [],
      search: {
        subjects: [],
        languages: [],
        grade: 9,
        price: [0, 15],
        date: { first: this.getToday(), last: this.getLastDay() },
        time: { min: "8:00", max: "22:00" },
        age: [14, 21],
        filter: "raiting",
      },
      def: {},
    };
  },
  async mounted() {
    this.def = this.copy(this.search);

    var s = this.$route.query.search;
    if (s !== undefined) this.search = JSON.parse(s);
  },
  computed: {
    ...mapGetters(["getSubject"]),
  },
  watch: {
    search: {
      handler(val) {
        var search = JSON.stringify(val);
        if (search !== this.$route.query.search) {
          this.$router.push({ query: { search } });
        }
        //TO DO fetch!!!!!!!!!!!!!!!!!!!!!
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions(["fetchPage"]),
    getToday() {
      return new Date().toISOString().slice(0, 10);
    },
    getLastDay() {
      var result = new Date();
      result.setDate(result.getDate() + 7);
      return result.toISOString().slice(0, 10);
    },
    copy(val) {
      return JSON.parse(JSON.stringify(val));
    },
  },
};
</script>
<style scoped>
.container {
  height: fit-content;
  position: -webkit-sticky;
  position: sticky;
  top: 150px;
  height: 70vh;
  width: 300px;
  min-width: 100px;
  overflow: auto;
}
#panel {
  margin: 5px;
  text-align: left;
}
</style>