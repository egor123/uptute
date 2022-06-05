<template>
  <div
    ref="panel"
    id="panel"
    :class="{
      isLeft: isLeft,
      isToggled: isToggled,
      isAfterMounted: isAfterMounted,
      isFullScreen: isFullScreen,
    }"
    :style="`--w: ${w}px; --transitionTime: ${transitionTime}ms`"
  >
    <div id="card">
      <Header ref="headerBar" />
      <div id="content" :style="`--pt: ${topPadding}px;`">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Header from "@/components/conference/centerColumn/bars/top/HeaderBar.vue";
import { ButtonToggleEvent, ColumnName } from "@/components/conference/types";

import LayoutHandler from "@/store/modules/conference/layoutHandler";
import ToggleStore from "@/store/modules/conference/toggleStore";
import { Vue, Component, Ref, Inject, Watch } from "vue-property-decorator";

@Component({ components: { Header } })
export default class SideBase extends Vue {
  @Ref("panel") panelRef!: HTMLDivElement;
  @Ref("headerBar") headerBarRef!: Header;

  w: number = 0;
  initialW: number = 0;
  topPadding: number = 0;
  transitionIds: number[] = [];
  isAfterMounted: boolean = false;

  @Inject() readonly transitionTime!: number;
  @Inject() readonly isLeft!: boolean;
  @Inject() readonly path!: ButtonToggleEvent;
  get isToggled(): boolean {
    return ToggleStore.isToggled[this.path.side][this.path.name];
  }

  get isFullScreen() {
    return LayoutHandler.centerColumnPos == (this.isLeft ? 1 : -1);
  }

  mounted(): void {
    this.topPadding = this.headerBarRef.$el.clientHeight;
    this.w = this.panelRef.offsetWidth;
    setTimeout(() => {
      this.isAfterMounted = true;

      const name: ColumnName = this.isLeft ? "left" : "right";
      LayoutHandler.setColumnEl({ name, el: this.$el });
    }, 0);
  }
  @Watch("isFullScreen")
  async onFullScreenChange(isFullScreen: boolean): Promise<void> {
    const self = this;

    if (isFullScreen)
      this.initialW = this.panelRef.getBoundingClientRect().width;

    if (LayoutHandler.centerColumnPos == 0)
      await new Promise((r) => setTimeout(() => r(""), this.transitionTime));

    smoothWidthChange(10);

    function smoothWidthChange(delta: number) {
      const id: number = setInterval(() => {
        const curW: number = self.panelRef.getBoundingClientRect().width;
        const isExpand: boolean = self.isFullScreen;

        const ifIteerate: boolean = isExpand
          ? curW < window.innerWidth
          : curW > self.initialW;

        if (ifIteerate)
          self.panelRef.style.width =
            curW + (isExpand ? +delta : -delta) + "px";
        else clearInterval(id);

        self.w = self.panelRef.offsetWidth;
      }, 0);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/styles.scss";

#panel {
  height: 100vh;
  color: var(--v-light-base);
  padding: 12px;
  max-width: 100vw;
  position: absolute;
  z-index: 10;
  &.isAfterMounted {
    transition: transform var(--transitionTime);
  }
  &.isToggled {
    transition: transform var(--transitionTime) calc(var(--transitionTime) / 2);
  }
  &.isLeft {
    right: 100vw;
    &.isToggled {
      transform: translate(var(--w));
    }
  }
  &:not(.isLeft) {
    left: 100vw;
    &.isToggled {
      transform: translate(calc(-1 * var(--w)));
    }
  }

  #card {
    height: 100%;
    background: var(--v-card-base);
    border-radius: 15px;
    position: relative;

    #content {
      @include box-size(100%);
      padding: 12px;
      overflow: auto;
      padding-top: var(--pt);
    }
  }
}
</style>
