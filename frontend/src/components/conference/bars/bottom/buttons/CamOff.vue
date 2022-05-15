<template>
  <BtnBase :mdiIcon="icons.on" />
</template>

<script>
import BtnBase from "@/components/conference/bars/BtnBase.vue";

export default {
  data() {
    return {
      icons: {
        on: "video",
        off: "video-off",
      },
    };
  },
  components: {
    BtnBase,
  },
};
</script>
