<template>
  <v-expansion-panels flat id="panels" ref="panel">
    <slot />
  </v-expansion-panels>
</template>

<script>
export default {
  data() {
    return {
      inProgress: false,
    };
  },
  props: ["next"],
  methods: {
    async isValid() {
      if (this.inProgress) return;
      this.inProgress = true;
      let val = true;
      for (const el of this.$refs.panel.$children) {
        if (!el.isValid()) val = false;
        await new Promise((res) => setTimeout(res, 100));
      }
      if ((await this.$emit("next", "isValid")) === false) val = false;
      if (!val) await new Promise((res) => setTimeout(res, 1100));
      this.inProgress = false;

      return val;
    },
    refresh() {
      for (const el of this.$refs.panel.$children) {
        el.refresh();
      }
      this.$emit("next", "refresh");
    },
  },
};
</script>

<style scoped lang="scss">
.v-expansion-panels {
  border-radius: 15px;
}
</style>
