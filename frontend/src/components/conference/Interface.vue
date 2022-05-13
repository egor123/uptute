<template>
  <div>
    <div id="conferenceId">
      Conference ID: {{ room.ref ? room.ref.id : "" }}
    </div>
    <Videos :streams="streams" />
  </div>
</template>

<script>
import Videos from "@/components/conference/video/Videos.vue";

export default {
  props: {
    streams: Object,
    room: Object,
  },
  components: {
    Videos,
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/styles.scss";

#conferenceId {
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translate(-50%);
}
</style>
