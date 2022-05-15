<template>
  <BtnBase @click="$emit('click')" id="chat" mdiIcon="message" />
</template>

<script>
import BtnBase from "@/components/conference/bars/BtnBase.vue";

export default {
  components: {
    BtnBase,
  },
};
</script>

<style lang="scss" scoped></style>
