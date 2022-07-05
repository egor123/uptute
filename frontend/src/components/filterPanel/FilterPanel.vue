<template>
  <v-expansion-panels flat ref="Panel">
    <slot />
  </v-expansion-panels>
</template>

<script lang="ts">
import { Vue, Component, Ref } from "vue-property-decorator";
import { VExpansionPanel } from "vuetify/lib";
import { sleep } from "@/plugins/utilityMethods";

interface Field extends Vue {
  isValid: () => boolean;
  refresh: () => void;
}

@Component
export default class FilterPanel extends Vue {
  @Ref() readonly Panel!: InstanceType<typeof VExpansionPanel>;

  inProgress: boolean = false;

  async isValid(): Promise<boolean> {
    if (this.inProgress) return false;

    this.inProgress = true;

    let val = true;

    for (const field of this.onlyInputs()) {
      if (!field.isValid()) val = false;
      await sleep(100);
    }

    var nextVal: Promise<boolean> = new Promise((r) => r);
    this.$emit("next", "isValid", (r: Promise<boolean>) => (nextVal = r));

    if (!(await nextVal)) val = false;

    this.inProgress = false;

    return val;
  }
  onlyInputs(): Field[] {
    const isInput = (field: Vue) => !field.$el.classList.contains("notInput");
    return this.Panel.$children.filter(isInput) as Field[];
  }
  refresh() {
    for (const field of this.onlyInputs()) field.refresh();
    this.$emit("next", "refresh");
  }
}
</script>

<style scoped lang="scss">
.v-expansion-panels {
  border-radius: 15px;
}
</style>

