<template>
  <div id="conferenceWrapper">
    <PreConference v-if="$store.state.conferenceMain.room.ref == undefined" />
    <Interface v-if="$store.state.conferenceMain.room.ref != undefined" />
  </div>
</template>

<script>
import PreConference from "@/components/conference/preConference/PreConference.vue";
import Interface from "@/components/conference/Interface.vue";
export default {
  components: { PreConference, Interface },
  async mounted() {
    this.$vuetify.theme.dark = true;
  },
};
</script>

<style>
#conferenceWrapper {
  overflow: hidden;
}
</style>
