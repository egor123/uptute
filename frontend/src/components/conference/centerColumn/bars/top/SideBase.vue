<template>
  <div
    ref="panel"
    id="panel"
    :class="{
      isLeft: isLeft,
      isToggled: isToggled,
      isAfterMounted: isAfterMounted,
    }"
    :style="{ '--m': '-' + w + 'px' }"
  >
    <div id="card">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from "vue-property-decorator";

@Component
export default class SideBase extends Vue {
  @Ref("panel") panelRef!: HTMLDivElement;

  w: number = 0;
  transitionIds: number[] = [];
  isAfterMounted: boolean = false;

  @Prop(Boolean) isToggled!: boolean;
  @Prop(Boolean) isLeft!: boolean;

  mounted(): void {
    this.panelRef.addEventListener("transitionstart", this.startResizing);
    this.panelRef.addEventListener("transitionend", this.endResizing);
    this.panelRef.addEventListener("transitioncancel", this.endResizing);

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
  color: var(--v-light-base);

  &.isLeft {
    padding: 12px 6px 12px 12px;
    &:not(.isToggled) {
      margin-left: var(--m);
    }
  }
  &:not(.isLeft) {
    padding: 12px 12px 12px 6px;
    &:not(.isToggled) {
      margin-right: var(--m);
    }
  }

  #card {
    @include box-size(100%);
    background: var(--v-card-base);
    border-radius: 15px;
    padding: 12px;
    overflow: hidden;
  }
}
</style>
