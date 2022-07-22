<template>
  <div id="conferenceWrapper">
    <PreConference v-if="InitState.isMediaAllowed === null" />
    <MediaBlocked v-if="InitState.isMediaAllowed === false" />
    <Interface v-if="Main.roomRef != undefined" />
  </div>
</template>

<script lang="ts">
import PreConference from "@/components/conference/preConference/PreConference.vue";
import MediaBlocked from "@/components/conference/MediaBlocked.vue";
import Interface from "@/components/conference/Interface.vue";

import InitState from "@/store/modules/conference/initState";
import Main from "@/store/modules/conference/main";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: { PreConference, MediaBlocked, Interface },
  name: "Conference",
})
export default class Conference extends Vue {
  public InitState = InitState;
  public Main = Main;
  async mounted() {
    this.$vuetify.theme.dark = true;
  }
}
</script>

<style>
#conferenceWrapper {
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  background: var(--v-background-base);
  position: relative;
}
</style>
