<template>
  <div class="container">
    <v-expansion-panels v-model="panel" flat hover focusable class="panels">
      <Subjects class="exp-panel" v-model="search.subjects" />

      <!-- AGE is ALWAYS FIRST!! -->

      <Languages v-model="search.language" />
      <!-- <Audience v-model="search.grade" /> -->
      <Price v-model="search.price" />
      <!-- <Day v-model="search.date" />
      <Time v-model="search.time" /> -->

      <!-- AGE is ALWAYS LAST!! -->

      <Age v-model="search.age" />
      <!-- <SortBy v-model="search.filter" /> -->
    </v-expansion-panels>

    <v-btn
      id="panel"
      small
      text
      rounded
      class="button"
      @click="search = copy(def)"
      >{{ $l("find.filters.refresh") }}</v-btn
    >
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Subjects from "./Subjects";
import Languages from "./Languages";
// import Audience from "./Audience";
import Price from "./Price";
// import Day from "./Day";
// import Time from "./Time";
import Age from "./Age";
// import SortBy from "../sidepanel/SortBy.vue";

export default {
  components: {
    Subjects,
    Languages,
    // Audience,
    Price,
    // Day,
    // Time,
    Age,
    // SortBy,
  },
  data() {
    return {
      panel: [],
      search: {
        subjects: "",
        language: [],
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

<style lang="scss" scoped>
.container {
  height: fit-content;
  /* max-height: 70vh; */
  position: -webkit-sticky;
  position: sticky;

  width: 100%;
  min-width: 100px;
  overflow: auto;
}

.panels {
  margin: 0;
  border-radius: 15px;

  & * {
    transition: all 400ms;
    margin: 0 !important;
  }

  & *:hover {
    // margin: 5px 0 !important;
    transform: scale(0.95);
  }
}

#panel {
  margin: 5px;
  text-align: left;
}

.button {
  background-color: var(--v-background-base);
  color: var(--v-secondary-darken4);
  transition: background-color 600ms;
  opacity: 0.6;

  &:hover {
    background-color: var(--v-secondary-darken1);
  }
}
</style>
