<template>
  <v-expansion-panel active-class="activePanel" id="panel">
    <v-expansion-panel-header class="panelHeader">
      {{ $l("find.filters.day.h") }}
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-row>
        <v-col cols="12" lg="6">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="dateFirst"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              :month-format="getMonthFormat"
              :header-date-format="getMonthFormat"
              :first-day-of-week="1"
              :min="getDate()"
              v-model="date"
              no-title
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">
                {{ $l("data.actions.cancel") }}
              </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)">
                {{ $l("data.actions.ok") }}
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" lg="6">
          <v-menu
            ref="menu2"
            v-model="menu2"
            :close-on-content-click="false"
            :return-value.sync="dateLast"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date2"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              :month-format="getMonthFormat"
              :header-date-format="getMonthFormat"
              :first-day-of-week="1"
              :min="getDate()"
              v-model="date2"
              no-title
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu2 = false">
                {{ $l("data.actions.cancel") }}
              </v-btn>
              <v-btn text color="primary" @click="$refs.menu2.save(date2)">
                {{ $l("data.actions.ok") }}
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
export default {
  data() {
    return {
      menu: false,
      menu2: false,
      date: this.value.first,
      date2: this.value.last,
      dates: this.value,
    };
  },
  props: ["value"],
  watch: {
    value: function(val) {
      this.dates = val;
      this.date = val.first;
      this.date2 = val.last;
    },
  },
  computed: {
    dateFirst: {
      set: function(val) {
        this.dates.first = val;
        this.dates.last = this.addDays(val, 7);
        this.date2 = this.dates.last;
        this.date = val;

        this.$emit("input", this.dates);
      },
      get: function() {
        return this.dates.first;
      },
    },
    dateLast: {
      set: function(val) {
        var f = this.addDays(val, -7);
        var today = this.getDate();
        if (today > f) this.dateFirst = today;
        else this.dateFirst = f;
      },
      get: function() {
        return this.dates.first;
      },
    },
  },
  methods: {
    getMonthFormat(isoDate) {
      var i = isoDate.split("-")[1] - 1;
      var m = [
        "jan",
        "feb",
        "mar",
        "apr",
        "may",
        "jun",
        "jul",
        "aug",
        "sept",
        "oct",
        "nov",
        "dec",
      ];
      if (m[i] === undefined) return isoDate;
      return this.$l(`data.months.${m[i]}.full`);
    },
    getDate() {
      return new Date().toISOString().slice(0, 10);
    },
    addDays(date, days) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result.toISOString().slice(0, 10);
    },
  },
};
</script>
