<template>
  <BtnBase @click="$emit('click')" :icons="icons" :isToggled="isToggled" />
</template>

<script>
import BtnBase from "@/components/conference/bars/BtnBase.vue";

export default {
  data() {
    return {
      icons: {
        on: "window-close",
        off: "draw",
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
