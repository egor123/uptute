<template>
  <div app id="header" ref="header">
    <slot />
    <h3 v-if="title">{{ title }}</h3>
  </div>
</template>

<script>
export default {
  props: {
    title: String(),
  },
  mounted() {
    this.$root.$emit("getSubHeader", (parent) => {
      if (this.$refs.header.innerHTML !== "<!---->")
        parent.append(this.$refs.header);
    });
  },
  destroyed() {
    this.$root.$emit("removeSubHeader");
  },
};
</script>
