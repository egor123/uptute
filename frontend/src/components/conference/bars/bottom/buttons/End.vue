<template>
  <BtnBase
    @click="$emit('click')"
    :icons="icons"
    :isToggled="isToggled"
    bgColor="var(--v-error-darken1)"
  />
</template>

<script>
import BtnBase from "@/components/conference/bars/BtnBase.vue";

export default {
  data() {
    return {
      icons: {
        on: "phone-hangup",
        off: "phone-hangup",
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
