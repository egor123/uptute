<template>
  <v-snackbar
    max-width="800"
    min-width="fit-content"
    :color="backgroundColor"
    timeout="-1"
    :value="value"
    :style="`--color: ${color}`"
  >
    <div id="snackTitle">{{ title }}</div>
    <div id="snackButtons">
      <v-btn
        v-for="button in buttons"
        :key="button.id"
        text
        @click="$emit('input', button.name)"
      >
        {{ button.text }}
      </v-btn>
    </div>
  </v-snackbar>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Snackbar extends Vue {
  @Prop(String) readonly title!: string;
  @Prop(Array) readonly buttons!: { text: string; name: string }[];
  @Prop({ type: String, default: "var(--v-accent-base)" })
  readonly backgroundColor!: string;
  @Prop({ type: String, default: "#fff" }) readonly color!: string;

  value = false;

  /**
   * Opens a snackbar.
   * May ask for button click.
   */
  public async getInput() {
    this.value = true;

    console.warn();

    const name = await new Promise((r) => this.$on("input", r));

    console.warn("NAME", name);

    this.value = false;

    return name;
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

