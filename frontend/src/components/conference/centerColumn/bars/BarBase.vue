<template>
  <div
    id="buttons"
    :class="{ isTop: isTop, isVisible: isVisible }"
    :style="`--t: ${transitionTime}ms;`"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import LayoutHandler from "@/store/modules/conference/layoutHandler";
import { Vue, Component, Prop, Watch, Inject } from "vue-property-decorator";

@Component
export default class ConferenceBarBase extends Vue {
  @Inject() readonly transitionTime!: number;
  @Prop(Boolean) readonly isTop!: boolean;

  private hideTime: number = 2500; // ms
  private timeoutId: number = -1;

  public get isVisible(): boolean {
    return this.timeoutId >= 0;
  }
  private get side(): "top" | "bottom" {
    return this.isTop ? "top" : "bottom";
  }

  private mounted(): void {
    this.dispatchEl();
    this.dispatchVisibility();

    addEventListener("mousemove", this.makeTemporarilyVisible);
  }
  private beforeUnmount(): void {
    removeEventListener("mousemove", this.makeTemporarilyVisible);
  }

  private dispatchEl() {
    LayoutHandler.setbarEl({ isTop: this.isTop, el: this.$el });
  }
  private dispatchVisibility(): void {
    LayoutHandler.setBarState({ isTop: this.isTop, val: this.isVisible });
  }

  private makeTemporarilyVisible(): void {
    const id: number = setTimeout(() => this.setTimeoutId(-1), this.hideTime);
    this.setTimeoutId(id);
  }

  private setTimeoutId(val: number): void {
    if (this.timeoutId >= 0) clearTimeout(this.timeoutId);
    this.timeoutId = val;
  }

  private get remoteIsVisible(): boolean {
    return LayoutHandler.isBarOpen[this.side];
  }
  @Watch("remoteIsVisible")
  onLayoutHandlerVisibleChange = (remoteIsVisible: boolean): void =>
    remoteIsVisible ? this.makeTemporarilyVisible() : this.setTimeoutId(-1);

  @Watch("isVisible")
  onLocalIsVisibleChange = this.dispatchVisibility;
}
</script>

<style lang="scss" scoped>
@import "@/scss/styles.scss";

#buttons {
  transition: transform var(--t);
  flex: 0;
  $padding: 6px;
  @include flexbox(row);
  width: 100%;
  padding-right: $padding;
  padding-left: $padding;
  position: absolute;

  &.isVisible {
    transition: transform var(--t) calc(var(--t) / 2);
  }

  &.isTop {
    padding-top: $padding;
    top: 0px;
    &:not(.isVisible) {
      transform: translateY(-100%);
    }
  }
  &:not(.isTop) {
    padding-bottom: $padding;
    bottom: 0px;
    &:not(.isVisible) {
      transform: translateY(100%);
    }
  }
}
</style>
