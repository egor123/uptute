<template>
  <div
    ref="wrapper"
    id="videosWrapper"
    :style="`--w: ${width}px; --h: ${height}px;`"
  >
    <div id="videos" :class="{ flexRow: isFlexRow }">
      <LocalVideo ref="local" />
      <RemoteVideo ref="remote" />
    </div>
  </div>
</template>

<script lang="ts">
import LocalVideo from "@/components/conference/centerColumn/video/LocalVideo.vue";
import RemoteVideo from "@/components/conference/centerColumn/video/RemoteVideo.vue";

import { Rect, Axis, RatioEvent } from "@/components/conference/types";
import LayoutHandler from "@/store/modules/conference/layoutHandler";
import ToggleStore from "@/store/modules/conference/toggleStore";
import {
  Vue,
  Component,
  ProvideReactive,
  Ref,
  InjectReactive,
  Watch,
} from "vue-property-decorator";

interface Ratios {
  [index: string]: number;
  local: number;
  remote: number;
}
interface SumRatios {
  [index: string]: number;
  row: number;
  col: number;
}

@Component({ components: { LocalVideo, RemoteVideo } })
export default class Videos extends Vue {
  @Ref("wrapper") wrapperRef!: HTMLDivElement;
  @Ref("local") localRef!: LocalVideo;
  @Ref("remote") remoteRef!: RemoteVideo;

  width: number = window.innerWidth;
  height: number = window.innerHeight;
  widthTransitionId: number = -1;
  heightTransitionId: number = -1;

  rect: Rect = { w: 0, h: 0 };
  ratios: Ratios = { local: 0, remote: 0 };
  isFlexRow: boolean = true;
  sumRatio: number = 0;
  @ProvideReactive() axis: Axis = { x: 0, y: 0 };
  @ProvideReactive() videosRect: DOMRect = new DOMRect();
  @ProvideReactive() videosInstance: Videos = this;

  @InjectReactive() margin!: number;
  @InjectReactive() transitionTime!: number;

  mounted(): void {
    this.$on("gotRatio", this.onGotRatio);
    addEventListener("resize", this.onResize);
  }
  beforeDestroy(): void {
    this.$off("gotRatio", this.onGotRatio);
    removeEventListener("resize", this.onResize);
  }

  onGotRatio({ isLocal, ratio }: RatioEvent): void {
    const type: string = isLocal ? "local" : "remote";
    this.ratios[type] = ratio;
    this.recalc();
  }
  onResize() {
    this.resizeAxis({ isX: true });
    this.resizeAxis({ isX: false });
  }
  recalc(): void {
    const self = this;

    const sumRatios: SumRatios = getSumRatios(this.ratios);
    this.isFlexRow = getIfRow(sumRatios);

    this.sumRatio = this.isFlexRow ? sumRatios.row : sumRatios.col;
    this.videosRect = this.wrapperRef.getBoundingClientRect();
    this.axis = getAxis();

    function getSumRatios(ratios: Ratios): SumRatios {
      const l = ratios.local;
      const r = ratios.remote;
      const row: number = l + r;
      const col: number = r == 0 ? l : (l * r) / (l + r);
      return { row, col };
    }
    function getIfRow(sumRatios: SumRatios): boolean {
      return getFraction(sumRatios.row) > getFraction(sumRatios.col);

      function getFraction(sumRatio: number): number {
        const rect: DOMRect = self.$el.getBoundingClientRect();
        const containerRatio: number = rect.width / rect.height;
        return sumRatio < containerRatio
          ? sumRatio / containerRatio
          : containerRatio / sumRatio;
      }
    }
    function getAxis(): Axis {
      const rect: DOMRect = self.$el.getBoundingClientRect();
      const containerW: number = rect.width;
      const containerH: number = rect.height;

      const ifXFilled: boolean = getIfXFilled();
      const m: number = self.margin;
      return { x: getX(), y: getY() };

      function getIfXFilled(): boolean {
        const containerRatio: number = containerW / containerH;
        return self.sumRatio > containerRatio;
      }
      function getX(): number {
        const isOneInCol: boolean = self.ratios.remote == 0 || self.isFlexRow;
        const my: number = isOneInCol ? 2 * m : 4 * m;
        return ifXFilled ? 0 : self.sumRatio * (containerH - my);
      }
      function getY(): number {
        const isOneInRow: boolean = self.ratios.remote == 0 || !self.isFlexRow;
        const mx: number = isOneInRow ? 2 * m : 4 * m;
        return ifXFilled ? (containerW - mx) / self.sumRatio : 0;
      }
    }
  }
  async resizeAxis({ isX }: { isX: boolean }) {
    await new Promise((r) => setTimeout(() => r("")));

    const self = this;

    const name = isX ? "width" : "height";

    const target = isX ? getTargetW() : getTargetH();
    const cur = self.wrapperRef.getBoundingClientRect()[name];
    const totalChange = target - cur;

    if (totalChange == 0) return;

    let curTime = Date.now();

    const id = setInterval(() => smoothAxisChange(), 0);

    const curId = isX ? this.widthTransitionId : this.heightTransitionId;
    if (curId > 0) clearInterval(curId);

    isX ? (this.widthTransitionId = id) : (this.heightTransitionId = id);

    function getTargetW(): number {
      const pos: number = LayoutHandler.centerColumnPos;

      if (pos != 0) return self.wrapperRef.getBoundingClientRect().width;

      const leftPanel: Element | null = LayoutHandler.LeftPanelEl;
      const rightPanel: Element | null = LayoutHandler.RightPanelEl;
      if (!leftPanel || !rightPanel) throw new Error("Panel element is null");
      const lW: number = leftPanel?.getBoundingClientRect().width || 0;
      const rW: number = rightPanel?.getBoundingClientRect().width || 0;
      const isLeftToggled: boolean = ToggleStore.isToggled.top.settings;
      const isRightToggled: boolean = ToggleStore.isToggled.top.chat;

      const sidepanelWidth = isLeftToggled ? lW : isRightToggled ? rW : 0;

      return window.innerWidth - sidepanelWidth;
    }
    function getTargetH(): number {
      const topBarEl: Element | null = LayoutHandler.topBarEl;
      const bottomBarel: Element | null = LayoutHandler.bottomBarEl;

      if (!topBarEl || !bottomBarel) throw new Error("Bar is null");

      const topBarH = topBarEl?.getBoundingClientRect().height || 0;
      const bottomBarH = bottomBarel?.getBoundingClientRect().height || 0;

      let barsHeightSum: number = 0;
      if (LayoutHandler.isBarOpen.top) barsHeightSum += topBarH;
      if (LayoutHandler.isBarOpen.bottom) barsHeightSum += bottomBarH;

      return window.innerHeight - barsHeightSum;
    }
    function smoothAxisChange(): void {
      const cur: number = self.wrapperRef.getBoundingClientRect()[name];
      const dT: number = Date.now() - curTime;
      const d: number = (totalChange * dT) / self.transitionTime;

      const isOverflow = totalChange < 0 ? cur + d < target : cur + d > target;

      if (isOverflow) {
        self[name] = target;
        const id = isX ? self.widthTransitionId : self.heightTransitionId;
        clearInterval(id);
        isX ? (self.widthTransitionId = -1) : (self.heightTransitionId = -1);
      } else {
        self[name] = cur + d;
        curTime = Date.now();
      }

      self.recalc();
    }
  }

  get isChatToggled() {
    return ToggleStore.isToggled.top.chat;
  }
  get isSettingsToggled() {
    return ToggleStore.isToggled.top.settings;
  }
  @Watch("isChatToggled")
  @Watch("isSettingsToggled")
  onPanelStateChange = () => this.resizeAxis({ isX: true });

  get isTopOpen() {
    return LayoutHandler.isBarOpen.top;
  }
  get isBottomOpen() {
    return LayoutHandler.isBarOpen.bottom;
  }
  @Watch("isTopOpen")
  @Watch("isBottomOpen")
  onBarStateChange = () => this.resizeAxis({ isX: false });
}
</script>

<style lang="scss" scoped>
@import "@/scss/styles.scss";

#videosWrapper {
  transition: transform 1s;
  transform: scaleX(var(--xPercent));
  width: var(--w);
  height: var(--h);
  position: relative;
  #videos {
    position: absolute;
    @include box-size(100%);
    &.flexRow {
      @include flexbox(row);
    }
    &:not(.flexRow) {
      @include flexbox(column);
    }
  }
}
</style>
