<template>
  <BtnBase
    @click="$emit('click')"
    id="chat"
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
        on: "message",
        off: "window-close",
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
