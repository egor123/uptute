<template>
  <BtnBase
    @click="$emit('click')"
    id="settings"
    :icons="icons"
    :isToggled="isToggled"
  />
</template>

<script>
import BtnBase from "@/components/conference/bars/BtnBase.vue";

export default {
  data() {
    return {
      icons: {
        on: "window-close",
        off: "cog",
      },
    };
  },
  components: {
    BtnBase,
  },
  props: {
    isToggled: Boolean,
  },
};
</script>

<style lang="scss" scoped></style>
