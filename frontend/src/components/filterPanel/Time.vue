<template>
  <v-expansion-panel active-class="activePanel" id="panel">
    <v-expansion-panel-header class="panelHeader">
      {{ $l("find.filters.time.h") }}
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-row>
        <v-col cols="11" sm="5">
          <v-menu
            ref="menu3"
            v-model="menu3"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="timeMin"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="time"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="menu3"
              v-model="time"
              full-width
              @click:minute="$refs.menu3.save(time)"
            ></v-time-picker>
          </v-menu>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="11" sm="5">
          <v-menu
            ref="menu4"
            v-model="menu4"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="timeMax"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="time2"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="menu4"
              v-model="time2"
              full-width
              @click:minute="$refs.menu4.save(time2)"
            ></v-time-picker>
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
      times: this.value,
      time: this.value.min,
      time2: this.value.max,
      menu3: false,
      menu4: false,
    };
  },
  props: ["value"],
  async mounted() {
    this.times.min = this.time;
    this.times.max = this.time2;
  },
  watch: {
    value: function(val) {
      this.times = val;
      this.time = val.min;
      this.time2 = val.max;
    },
  },
  computed: {
    timeMin: {
      set: function(val) {
        this.times.min = val;
        this.time = val;
        if (this.compareTime(val, this.timeMax)) {
          this.times.max = val;
          this.time2 = val;
        }
        this.$emit("input", this.times);
      },
      get: function() {
        return this.times.min;
      },
    },
    timeMax: {
      set: function(val) {
        this.times.max = val;
        this.time2 = val;
        if (this.compareTime(this.timeMin, val)) {
          this.times.min = val;
          this.time = val;
        }
        this.$emit("input", this.times);
      },
      get: function() {
        return this.times.max;
      },
    },
  },
  methods: {
    compareTime(val1, val2) {
      var t = val1.split(":");
      var t2 = val2.split(":");
      if (t[0] > t2[0]) return true;
      if (t[0] === t2[0] && t[1] >= t2[1]) return true;
      return false;
    },
  },
};
</script>
