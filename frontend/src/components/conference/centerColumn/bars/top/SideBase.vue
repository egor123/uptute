<template>
  <div
    ref="panel"
    id="panel"
    :class="{
      isLeft: isLeft,
      isToggled: isToggled,
      isAfterMounted: isAfterMounted,
    }"
    :style="`--m: ${-1 * w}px;`"
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

import ToggleStore from "@/store/modules/conference/toggleStore";
import { Vue, Component, Ref, Inject } from "vue-property-decorator";

@Component({ components: { Header } })
export default class SideBase extends Vue {
  @Ref("panel") panelRef!: HTMLDivElement;
  @Ref("headerBar") headerBarRef!: Header;

  w: number = 0;
  topPadding: number = 0;
  transitionIds: number[] = [];
  isAfterMounted: boolean = false;

  @Inject() readonly isLeft!: boolean;
  @Inject() readonly path!: ButtonToggleEvent;
  get isToggled(): boolean {
    return ToggleStore.isToggled[this.path.side][this.path.name];
  }

  mounted(): void {
    this.panelRef.addEventListener("transitionstart", this.startResizing);
    this.panelRef.addEventListener("transitionend", this.endResizing);
    this.panelRef.addEventListener("transitioncancel", this.endResizing);

    this.topPadding = this.headerBarRef.$el.getBoundingClientRect().height;
    this.w = this.panelRef.offsetWidth;
    setTimeout(() => (this.isAfterMounted = true), 0);
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
}
</script>

<style lang="scss" scoped>
@import "@/scss/styles.scss";

#panel {
  &.isAfterMounted {
    transition: margin 1s;
  }
  height: 100vh;
  width: fit-content;
  // width: 100vw;
  color: var(--v-light-base);

  &.isLeft {
    padding: 12px 0px 12px 12px;
    &:not(.isToggled) {
      margin-left: var(--m);
    }
  }
  &:not(.isLeft) {
    padding: 12px 12px 12px 0px;
    &:not(.isToggled) {
      margin-right: var(--m);
    }
  }

  #card {
    @include box-size(100%);
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
