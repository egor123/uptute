<template>
  <BaseComponent
    ref="base"
    v-model="date"
    :label="$l('set_up.birth')"
    :text="date"
    propURL="date"
  >
    <v-menu
      class="menu"
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
      :menu-props="{ borderRadius: '15' }"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          label="Birthday date"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>

      <v-date-picker
        v-model="date"
        :active-picker.sync="activePicker"
        :max="
          new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .substr(0, 10)
        "
        min="1930-01-01"
        @change="save"
      ></v-date-picker>
    </v-menu>
  </BaseComponent>
</template>

<script>
import BaseComponent from "./BaseComponent.vue";

export default {
  components: {
    BaseComponent,
  },
  data() {
    return {
      activePicker: null,
      date: null,
      menu: false,
    };
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  .v-picker__title.primary {
    background: var(--v-secondary-darken3) !important;
  }
  .v-picker {
    border-radius: 15px;
  }
  &.v-menu__content {
    border-radius: 15px !important;
  }
  ::-webkit-scrollbar-track {
    background: var(--v-secondary-base);
    margin: 10px 0;
  }
}
</style>
