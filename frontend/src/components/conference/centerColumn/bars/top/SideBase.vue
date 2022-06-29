<template>
  <div
    ref="panelRef"
    id="panel"
    :class="{
      isLeft: isLeft,
      isToggled: isToggled,
      isAfterMounted: isAfterMounted,
      isFullScreen: isFullScreen,
    }"
    :style="`
    --w: ${w}px; 
    --transitionTime: ${transitionTime}ms; 
    --margin: ${margin}px;
    `"
  >
    <div id="card">
      <HeaderCustom ref="headerBar" />
      <div id="content" :style="`--pt: ${topPadding}px;`">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import HeaderCustom from "@/components/conference/centerColumn/bars/top/HeaderBar.vue";
import { ButtonToggleEvent, ColumnName } from "@/components/conference/types";

import LayoutHandler from "@/store/modules/conference/layoutHandler";
import ToggleStore from "@/store/modules/conference/toggleStore";
import { Vue, Component, Ref, Inject, Watch } from "vue-property-decorator";

@Component({ components: { HeaderCustom } })
export default class SideBase extends Vue {
  @Inject() readonly transitionTime!: number;
  @Inject() readonly margin!: number;
  @Inject() readonly isLeft!: boolean;
  @Inject() readonly path!: ButtonToggleEvent;

  get isToggled(): boolean {
    return ToggleStore.isToggled[this.path.side][this.path.name];
  }
  get isFullScreen(): boolean {
    return LayoutHandler.centerColumnPos == (this.isLeft ? 1 : -1);
  }

  @Ref() readonly panelRef!: HTMLDivElement;
  @Ref("headerBar") readonly headerBarRef!: HeaderCustom;

  private initialW: number = 0;
  private intervalId: number = -1;

  public isAfterMounted: boolean = false; // for HTML
  public w: number = 0; // for HTML
  public topPadding: number = 0; // for HTML

  mounted(): void {
    const instanceElToLayoutHandler = () => {
      const name: ColumnName = this.isLeft ? "left" : "right";
      LayoutHandler.setColumnEl({ name, el: this.$el });
    };

    addEventListener("resize", this.onResize);

    this.topPadding = this.headerBarRef?.$el.clientHeight | 0;
    this.initialW = this.w = this.$el.clientWidth;
    instanceElToLayoutHandler();

    setTimeout(() => (this.isAfterMounted = true));
  }

  async onResize() {
    if (this.isFullScreen) this.smoothWidthChange(this.transitionTime / 10);
    else {
      this.isAfterMounted = false;
      await new Promise((r) => this.$nextTick(() => r("")));
      this.initialW = this.w = this.$el.clientWidth;
      this.isAfterMounted = true;
    }
  }

  smoothWidthChange(time: number) {
    const frameWidthChange = (): void => {
      const curW: number = this.$el.clientWidth;
      const newTime: number = Date.now();
      const dT: number = newTime - curTime;
      curTime = newTime;

      const ifIteerate: boolean = isExpand ? curW < targetW : curW > targetW;

      const delta: number = (dT / time) * totalChange;

      if (ifIteerate) this.w = curW + delta;
      else {
        this.w = targetW;
        clearInterval(this.intervalId);
        this.intervalId = -1;
      }
    };

    if (this.intervalId > 0) {
      clearInterval(this.intervalId);
    }

    let curTime: number = Date.now();
    const isExpand: boolean = this.isFullScreen;
    const targetW: number = isExpand ? window.innerWidth : this.initialW;
    const totalChange: number = targetW - this.$el.clientWidth;

    this.intervalId = setInterval(() => frameWidthChange());
  }

  @Watch("isFullScreen")
  async smoothResize(): Promise<void> {
    if (LayoutHandler.centerColumnPos == 0)
      await new Promise((r) => setTimeout(() => r(""), this.transitionTime));

    this.smoothWidthChange(1); // 1 ms => instant
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/styles.scss";

#panel {
  height: 100vh;
  color: var(--v-light-base);
  padding: var(--margin);
  max-width: 100vw;
  position: absolute;
  z-index: 10;
  width: auto;
  &.isAfterMounted {
    width: var(--w);

    $t: var(--transitionTime);
    transition: transform $t;
    &.isToggled {
      &.isFullScreen {
        transition: transform $t calc($t / 3);
      }
      &:not(.isFullScreen) {
        transition: transform $t calc($t / 2);
      }
    }
    &:not(.isFullScreen):not(.isToggled) {
      transition: transform $t, padding $t $t;
    }
  }

  &.isLeft {
    right: 100vw;
    &.isToggled {
      transform: translate(var(--w));
    }
    &:not(.isFullScreen) {
      padding-right: 0px;
    }
  }
  &:not(.isLeft) {
    left: 100vw;
    &.isToggled {
      transform: translate(calc(-1 * var(--w)));
    }
    &:not(.isFullScreen) {
      padding-left: 0px;
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
