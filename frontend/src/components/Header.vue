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
    const header = this.$refs.header;
    this.$root.$emit("setSubHeader", header.innerHTML);
    header.parentElement.removeChild(header);
  },
  destroyed() {
    this.$root.$emit("setSubHeader", "");
  },
};
</script>
