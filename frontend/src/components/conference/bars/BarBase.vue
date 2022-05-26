<template>
  <div ref="bar" id="buttons" :class="{ isTopBar: isTopBar }">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop, Watch } from "vue-property-decorator";

@Component
export default class BarBase extends Vue {
  @Ref() readonly bar!: HTMLDivElement;

  visibilityCounter: number = 0;
  hideTime: number = 2000; // ms
  transitionIds: number[] = [];

  @Prop(Boolean) readonly isTopBar!: boolean;

  get isVisible(): boolean {
    return this.visibilityCounter > 0;
  }

  mounted(): void {
    addEventListener("mousemove", this.onMouseMove);
    this.bar.addEventListener("transitionstart", this.startResizing);
    this.bar.addEventListener("transitionend", this.endResizing);
    this.bar.addEventListener("transitioncancel", this.endResizing);
  }
  beforeUnmount(): void {
    removeEventListener("mousemove", this.onMouseMove);
    this.bar.removeEventListener("transitionstart", this.startResizing);
    this.bar.removeEventListener("transitionend", this.endResizing);
    this.bar.removeEventListener("transitioncancel", this.endResizing);
  }

  onMouseMove(): void {
    this.visibilityCounter++;
    setTimeout(() => this.visibilityCounter--, this.hideTime);
  }
  startResizing(): void {
    const id: number = setInterval(() => dispatchEvent(new Event("resize")), 0);
    this.transitionIds.push(id);
  }
  endResizing(): void {
    clearInterval(this.transitionIds[0]);
    this.transitionIds.shift();
  }
  setStyle(): void {
    const style: CSSStyleDeclaration = this.bar.style;
    const h: number = this.bar.offsetHeight;
    const side: string = this.isTopBar ? "Top" : "Bottom";
    const m: string = this.isVisible ? `0px` : `-${h}px`;

    // @ts-ignore
    style[`margin${side}`] = m;
  }

  @Watch("isVisible")
  onIsVisibleChange = (): void => this.setStyle();
}
</script>

<style lang="scss" scoped>
@import "@/scss/styles.scss";

#buttons {
  transition: margin 1s;
  flex: 0;
  $padding: 6px;
  @include flexbox(row);
  width: 100%;
  padding-right: $padding;
  padding-left: $padding;

  &.isTopBar {
    padding-top: $padding;
  }
  &:not(.isTopBar) {
    padding-bottom: $padding;
  }
}
</style>
