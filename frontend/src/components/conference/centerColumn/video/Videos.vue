<template>
  <div id="videosWrapper" :style="`--w: ${rect.w}px; --h: ${rect.h}px;`">
    <div id="videos" :class="{ flexRow: isFlexRow }">
      <LocalVideo ref="local" />
      <RemoteVideo ref="remote" />
    </div>
  </div>
</template>

<script lang="ts">
import LocalVideo from "@/components/conference/centerColumn/video/LocalVideo.vue";
import RemoteVideo from "@/components/conference/centerColumn/video/RemoteVideo.vue";

import {
  Rect,
  Axis,
  RatioEvent,
  RectTransitionIds,
  Ratios,
  SumRatios,
  BarElements,
  BarHeights,
  ColumnElemnts,
} from "@/components/conference/types";
import LayoutHandler from "@/store/modules/conference/layoutHandler";
import ToggleStore from "@/store/modules/conference/toggleStore";
import {
  Vue,
  Component,
  ProvideReactive,
  InjectReactive,
  Watch,
} from "vue-property-decorator";

@Component({ components: { LocalVideo, RemoteVideo } })
export default class Videos extends Vue {
  @InjectReactive() private readonly margin!: number;
  @InjectReactive() private readonly transitionTime!: number;

  private transitionIds: RectTransitionIds = { w: -1, h: -1 };
  private ratios: Ratios = { local: 0, remote: 0 };

  public isFlexRow: boolean = true; // public for HTML
  public rect: Rect = { w: window.innerWidth, h: window.innerHeight };

  @ProvideReactive() axis: Axis = { x: 0, y: 0 };
  @ProvideReactive() readonly videosInstance: Videos = this;

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

    const sumRatio = this.isFlexRow ? sumRatios.row : sumRatios.col;
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

      function getFraction(sumRatioVar: number): number {
        const containerRatio: number = self.rect.w / self.rect.h;
        return sumRatioVar < containerRatio
          ? sumRatioVar / containerRatio
          : containerRatio / sumRatioVar;
      }
    }
    function getAxis(): Axis {
      const ifXFilled: boolean = getIfXFilled();
      const m: number = self.margin;
      return { x: getX(), y: getY() };

      function getIfXFilled(): boolean {
        const containerRatio: number = self.rect.w / self.rect.h;
        return sumRatio > containerRatio;
      }
      function getX(): number {
        const isOneInCol: boolean = self.ratios.remote == 0 || self.isFlexRow;
        const my: number = isOneInCol ? 2 * m : 4 * m;
        return ifXFilled ? 0 : sumRatio * (self.rect.h - my);
      }
      function getY(): number {
        const isOneInRow: boolean = self.ratios.remote == 0 || !self.isFlexRow;
        const mx: number = isOneInRow ? 2 * m : 4 * m;
        return ifXFilled ? (self.rect.w - mx) / sumRatio : 0;
      }
    }
  }
  async resizeAxis({ isX }: { isX: boolean }) {
    await new Promise((r) => setTimeout(() => r("")));
    const self = this;

    const alias: string = isX ? "w" : "h";

    const target = isX ? getTargetW() : getTargetH();
    const totalChange = target - self.rect[alias];

    if (totalChange == 0) return;

    let curTime = Date.now();

    const id = setInterval(() => smoothAxisChange());

    reassignTransitionId(id);

    function getTargetW(): number {
      const pos: number = LayoutHandler.centerColumnPos;

      if (pos != 0) return self.rect.w;

      const columns: ColumnElemnts = LayoutHandler.columns;

      if (!columns.left || !columns.right)
        throw new Error("Panel element is null");

      const w: { l: number; r: number } = {
        l: columns.left.clientWidth,
        r: columns.right.clientWidth,
      };
      const isOpen: { l: boolean; r: boolean } = {
        l: ToggleStore.isToggled.top.settings,
        r: ToggleStore.isToggled.top.chat,
      };

      const sidepanelWidth = isOpen.l ? w.l : isOpen.r ? w.r : 0;

      return window.innerWidth - sidepanelWidth;
    }
    function getTargetH(): number {
      const bars: BarElements = LayoutHandler.bars;

      if (!bars.top || !bars.bottom) throw new Error("Bar is null");

      const heights: BarHeights = {
        t: bars.top.clientHeight,
        b: bars.bottom.clientHeight,
      };
      const isOpen: { t: boolean; b: boolean } = {
        t: LayoutHandler.isBarOpen.top,
        b: LayoutHandler.isBarOpen.bottom,
      };

      let h = window.innerHeight;
      if (isOpen.t) h -= heights.t;
      if (isOpen.b) h -= heights.b;

      return h;
    }
    function smoothAxisChange(): void {
      const newVal: number = getNewVal();

      const isOverflow = totalChange < 0 ? newVal < target : newVal > target;

      if (isOverflow) {
        self.rect[alias] = target;
        reassignTransitionId(-1);
      } else {
        self.rect[alias] = newVal;
        curTime = Date.now();
      }

      self.recalc();

      function getNewVal() {
        const dT: number = Date.now() - curTime;
        const d: number = (totalChange * dT) / self.transitionTime;
        return self.rect[alias] + d;
      }
    }
    function reassignTransitionId(newId: number) {
      const curId = self.transitionIds[alias];
      if (curId > 0) clearInterval(curId);

      self.transitionIds[alias] = newId;
    }
  }

  get isPanelToggled() {
    return ToggleStore.isToggled.top;
  }
  @Watch("isPanelToggled", { deep: true })
  onPanelStateChange = () => this.resizeAxis({ isX: true });

  get isBarOpen() {
    return LayoutHandler.isBarOpen;
  }
  @Watch("isBarOpen", { deep: true })
  onBarStateChange = () => this.resizeAxis({ isX: false });
}
</script>

<style lang="scss" scoped>
@import "@/scss/styles.scss";

#videosWrapper {
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
