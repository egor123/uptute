<template>
  <div
    id="container"
    v-if="ifExists"
    :style="`--nudgeX: ${nudgeX}px; --destroyT: ${destroyTimeout}ms`"
    :class="{ hideToRight: pos == 1, hideToLeft: pos === -1 }"
  >
    <button @click="ifExists = false" id="close">
      <v-icon>mdi-window-close</v-icon>
    </button>
    Try using
    <div class="text" v-if="!$mb.isMobileInput()">
      <code>↑</code>, <code> ↓</code>, <code>→</code>, <code>←</code>
    </div>
    <div class="text" v-if="$mb.isMobileInput()"><code>swipes</code></div>
  </div>
</template>

<script lang="ts">
import { SwipeStatus, Vector } from "@/types";
import { Vue, Component, Watch } from "vue-property-decorator";

@Component
export default class ConferenceNavigationTip extends Vue {
  public ifExists: boolean = true; // for HTML
  public nudgeX: number = 0; // for HTML
  public destroyTimeout: number = 1000; // for HTML
  public pos: -1 | 0 | 1 = 0;

  mounted() {
    this.$mb.addSwipeListener(this.setHorizontalPos, this.$el);
  }
  beforeDestroy() {
    this.$mb.removeSwipeListener(this.setHorizontalPos, this.$el);
  }

  private setHorizontalPos(move: Vector, state: SwipeStatus): void {
    console.log(move, state);
    switch (state) {
      case "start":
      case "move":
        this.nudgeX = -move.x;
        break;
      case "end":
        if (this.nudgeX > 50) this.pos = 1;
        else if (this.nudgeX < -50) this.pos = -1;
        this.nudgeX = 0;
        break;
      default:
        break;
    }
  }

  @Watch("pos")
  onPosChange(pos: -1 | 0 | 1) {
    if (pos === 0) return;
    setTimeout(() => (this.ifExists = false), this.destroyTimeout);
  }
}
</script>

<style scoped lang="scss">
@import "@/scss/styles.scss";

#container {
  position: relative;
  border: 1px var(--v-card-lighten1) solid;
  border-radius: 15px;
  padding: 16px;

  transform: translateX(var(--nudgeX));
  transition: transform 100ms;
  &:hover {
    cursor: default !important;
  }
  &.hideToRight,
  &.hideToRight {
    transition: transform var(--destroyT);
  }
  &.hideToRight {
    transform: translateX(120%);
  }
  &.hideToLeft {
    transform: translateX(-120%);
  }
  .text,
  .text * {
    display: inline-block;
  }
  button#close {
    position: absolute;
    right: 0px;
    top: 0px;
    padding: 6px;

    .v-icon {
      color: var(--v-card-lighten1);
      top: 0px;

      transition: color 300ms;
      &:hover {
        color: var(--v-card-lighten3);
      }
    }
  }
}
</style>
