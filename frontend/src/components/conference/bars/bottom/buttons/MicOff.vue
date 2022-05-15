<template>
  <BtnBase :mdiIcon="icons.on" />
</template>

<script>
import BtnBase from "@/components/conference/bars/BtnBase.vue";

export default {
  data() {
    return {
      icons: {
        on: "microphone",
        off: "microphone-off",
      },
    };
  },
  components: {
    BtnBase,
  },
};
</script>
