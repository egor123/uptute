<template>
  <div app id="header" ref="header">
    <slot />
    <h3>{{ title }}</h3>
  </div>
</template>

<script>
export default {
  props: {
    title: String(),
  },
  mounted() {
    this.$root.$emit("getSubHeader", (parent) => {
      parent.append(this.$refs.header);
    });
  },
  destroyed() {
    this.$root.$emit("removeSubHeader");
  },
};
</script>
