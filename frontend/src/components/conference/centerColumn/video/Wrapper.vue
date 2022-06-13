<template>
  <div
    id="wrapper"
    :class="{ nudgeUp: isNudgedUp, nudgeDown: isNudgedDown }"
    :style="`--transitionTime: ${transitionTime}ms`"
  >
    <Videos />
  </div>
</template>

<script lang="ts">
import Videos from "@/components/conference/centerColumn/video/Videos.vue";
import LayoutHandler from "@/store/modules/conference/layoutHandler";

import { Vue, Component, Inject } from "vue-property-decorator";

@Component({ components: { Videos } })
export default class ConferenceVideosWrapper extends Vue {
  @Inject() readonly transitionTime!: number;

  get isNudgedUp() {
    const isBarOpen = LayoutHandler.isBarOpen;
    return isBarOpen.bottom && !isBarOpen.top;
  }
  get isNudgedDown() {
    const isBarOpen = LayoutHandler.isBarOpen;
    return isBarOpen.top && !isBarOpen.bottom;
  }
}
</script>

<style lang="scss">
@import "@/scss/styles.scss";

#wrapper {
  @include box-size(fit-content);
  transition: transform var(--transitionTime);

  &.nudgeUp {
    transform: translateY(calc(-1 * (100vh - 100%) / 2));
  }
  &.nudgeDown {
    transform: translateY(calc((100vh - 100%) / 2));
  }
}
</style>
