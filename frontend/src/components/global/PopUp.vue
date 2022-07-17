<template>
  <v-snackbar
    max-width="800"
    min-width="fit-content"
    :color="Module.backgroundColor"
    timeout="-1"
    :value="Module.title.length > 0"
    :style="`--color: ${Module.color}`"
  >
    <div id="snackTitle">{{ Module.title }}</div>
    <div id="snackButtons">
      <v-btn
        v-for="(button, id) in Module.buttons"
        :key="id"
        text
        @click="$emit('input', button.name)"
      >
        {{ button.text }}
      </v-btn>
    </div>
  </v-snackbar>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import Module from "@/store/modules/popUp/popUp";

@Component
export default class PopUp extends Vue {
  Module = Module;

  private emitInput(name: string) {
    this.$root.$emit("popUpAnswer", name);
    Module.setDefauls();
  }

  mounted() {
    this.$on("input", this.emitInput);
    Module.setDefauls();
  }
}
</script>

<style scoped lang="scss">
::v-deep(.v-snack__wrapper) {
  display: block;
  border-radius: 15px;
}

#snackTitle {
  width: 100%;
  text-align: center;
  font-weight: bold;
  padding: 10px 0;
  font-size: 1.1rem;
  color: var(--color);
}
#snackButtons .v-btn {
  border-radius: 15px !important;
  color: var(--color);
  &:not(:last-child) {
    margin-right: 1rem;
  }
}
</style>

