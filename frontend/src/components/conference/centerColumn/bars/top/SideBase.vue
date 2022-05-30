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
    :style="`--w: ${w}px;`"
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
import { ButtonToggleEvent } from "@/components/conference/types";

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

  @Inject() readonly isLeft!: boolean;
  @Inject() readonly path!: ButtonToggleEvent;
  get isToggled(): boolean {
    return ToggleStore.isToggled[this.path.side][this.path.name];
  }

  get isFullScreen() {
    return LayoutHandler.centerColumnPos == (this.isLeft ? 1 : -1);
  }

  mounted(): void {
    this.panelRef.addEventListener("transitionstart", this.startResizing);
    this.panelRef.addEventListener("transitionend", this.endResizing);
    this.panelRef.addEventListener("transitioncancel", this.endResizing);

    this.topPadding = this.headerBarRef.$el.getBoundingClientRect().height;
    this.w = this.panelRef.offsetWidth;
    setTimeout(() => {
      this.isAfterMounted = true;
      this.isLeft
        ? LayoutHandler.setLeftPanelEl(this.$el)
        : LayoutHandler.setRightPanelEl(this.$el);
    }, 0);
  }
  beforeUnmount(): void {
    this.panelRef.removeEventListener("transitionstart", this.startResizing);
    this.panelRef.removeEventListener("transitionend", this.endResizing);
    this.panelRef.removeEventListener("transitioncancel", this.endResizing);
  }

  startResizing(): void {
    this.w = this.panelRef.offsetWidth;
    const id = setInterval(() => dispatchEvent(new Event("resize")), 0);
    this.transitionIds.push(id);
  }
  endResizing(): void {
    clearInterval(this.transitionIds[0]);
    this.transitionIds.shift();
  }

  @Watch("isFullScreen")
  onFullScreenChange(isFullScreen: boolean) {
    const self = this;

    if (isFullScreen)
      this.initialW = this.panelRef.getBoundingClientRect().width;
    smoothWidthChange(5);

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
      }, 0);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/styles.scss";

#panel {
  &.isAfterMounted {
    transition: margin 1s;
  }
  height: 100vh;
  color: var(--v-light-base);
  padding: 12px;
  max-width: 100vw;

  &.isFullScreen {
    // width: 100vw;
  }
  &.isLeft {
    &:not(.isToggled) {
      margin-left: calc(-1 * var(--w));
    }
  }
  &:not(.isLeft) {
    &:not(.isToggled) {
      margin-right: calc(-1 * var(--w));
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
