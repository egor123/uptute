<template>
  <div id="videosWrapper">
    <div id="videos" :class="{ flexRow: isFlexRow }">
      <LocalVideo ref="local" />
      <RemoteVideo ref="remote" />
    </div>
  </div>
</template>

<script lang="ts">
import LocalVideo from "@/components/conference/video/LocalVideo.vue";
import RemoteVideo from "@/components/conference/video/RemoteVideo.vue";

import { Rect, Axis, RatioEventPayload } from "@/interfaces/Conference";
import {
  Vue,
  Component,
  ProvideReactive,
  Ref,
  InjectReactive,
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
  @Ref("local") localRef!: LocalVideo;
  @Ref("remote") remoteRef!: RemoteVideo;

  rect: Rect = { w: 0, h: 0 };
  ratios: Ratios = { local: 0, remote: 0 };
  isFlexRow: boolean = true;
  sumRatio: number = 0;
  @ProvideReactive() axis: Axis = { x: 0, y: 0 };
  @ProvideReactive() videosRect: DOMRect = new DOMRect();
  @ProvideReactive() videosInstance: Videos = this;

  @InjectReactive()
  margin!: number;

  mounted(): void {
    this.$on("gotRatio", this.onGotRatio);
    addEventListener("resize", this.onResize);
  }
  beforeDestroy(): void {
    this.$off("gotRatio", this.onGotRatio);
    removeEventListener("resize", this.onResize);
  }

  onGotRatio({ isLocal, ratio }: RatioEventPayload): void {
    const type: string = isLocal ? "local" : "remote";
    this.ratios[type] = ratio;
    this.onResize();
  }
  async onResize(): Promise<void> {
    const self = this;

    const sumRatios: SumRatios = getSumRatios(this.ratios);
    this.isFlexRow = getIfRow(sumRatios);

    this.sumRatio = this.isFlexRow ? sumRatios.row : sumRatios.col;
    this.videosRect = this.$el.getBoundingClientRect();
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
}
</script>

<style lang="scss" scoped>
@import "@/scss/styles.scss";

#videosWrapper {
  @include box-size(100%);
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
