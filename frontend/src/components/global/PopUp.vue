<template>
  <v-snackbar
    max-width="800"
    min-width="fit-content"
    :color="Module.backgroundColor"
    timeout="-1"
    :value="Module.isVisible"
    :style="`--color: ${Module.color}`"
    ref="Snackbar"
  >
    <div id="snackTitle">{{ Module.title }}</div>
    <div id="snackButtons">
      <v-btn
        v-for="(button, id) in Module.buttons"
        :key="id"
        text
        @click="$emit('input', button.value)"
      >
        {{ button.text }}
      </v-btn>
    </div>
  </v-snackbar>
</template>

<script lang="ts">
import { Vue, Component, Ref } from "vue-property-decorator";
import Module from "@/store/modules/popUp/popUp";
import { Value } from "@/store/modules/popUp/types";

@Component
export default class PopUp extends Vue {
  @Ref() readonly Snackbar!: Vue;
  Module = Module;

  private emitAnswer(answer: Value) {
    this.$root.$emit("popUpAnswer", answer);
    Module.setIfVisible(false);
  }

  mounted() {
    this.$on("input", this.emitAnswer);
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
#snackButtons {
  display: flex;
  justify-content: space-evenly;
  & .v-btn {
    border-radius: 15px !important;
    color: var(--color);
    display: flex;
    flex-grow: 1;
    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
}
</style>

