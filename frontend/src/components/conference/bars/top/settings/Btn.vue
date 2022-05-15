<template>
  <BtnBase @click="$emit('click')" id="settings" mdiIcon="cog" />
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
