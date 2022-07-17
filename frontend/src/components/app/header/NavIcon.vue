<template>
  <div id="navIcon">
    <v-app-bar-nav-icon @click="setNavBar(getNavBar)" />
  </div>
</template>

<script lang="ts">
import { mapActions } from "vuex";

import { Vue, Component } from "vue-property-decorator";

@Component({ methods: { ...mapActions(["setNavBar", "getNavBar"]) } })
export default class HeaderNavIcon extends Vue {}
</script>

<style scoped lang="scss">
#navIcon {
  padding: calc(var(--gap) / 2);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 10px;
  .v-btn {
    color: var(--v-accent-base) !important;
  }
}
</style>
