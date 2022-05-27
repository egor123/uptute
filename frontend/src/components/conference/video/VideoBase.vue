<template>
  <video
    ref="video"
    :srcObject.prop="stream"
    :muted="muted"
    playsinline
    autoplay
    :style="`
    --w: ${rect.w}px; 
    --h: ${rect.h}px;
    --margin: ${margin}px;
    `"
    :class="{ exists: ratio != 0 }"
  />
</template>

<script lang="ts">
import Videos from "@/components/conference/video/Videos.vue";

import Main from "@/store/modules/conference/main";
import { Axis, Rect, RatioEvent } from "@/components/conference/types";
import {
  Vue,
  Component,
  Prop,
  Watch,
  Ref,
  InjectReactive,
} from "vue-property-decorator";

@Component
export default class VideoBase extends Vue {
  @Ref("video") readonly videoRef!: HTMLVideoElement;

  ratio: number = 0;
  rect: Rect = { w: 0, h: 0 };

  @Prop({ type: Boolean, default: false }) readonly muted!: boolean;
  @Prop(Boolean) readonly isLocal!: boolean;

  @InjectReactive() readonly videosInstance!: Videos;
  @InjectReactive() readonly videosRect!: DOMRect;
  @InjectReactive() readonly axis!: Axis;
  @InjectReactive() readonly margin!: number;

  get stream(): MediaStream {
    return this.isLocal ? Main.streams.local : Main.streams.remote;
  }

  mounted(): void {
    this.videoRef.addEventListener("loadedmetadata", this.getRatio);
  }
  beforeDestroy(): void {
    this.videoRef.removeEventListener("loadedmetadata", this.getRatio);
  }

  getRatio(): void {
    const self = this;
    this.ratio = this.videoRef.videoWidth / this.videoRef.videoHeight;
    dispatchToVideos(this.ratio);

    function dispatchToVideos(ratio: number) {
      const isLocal: boolean = self.isLocal;
      const ratioEvent: RatioEvent = { isLocal, ratio };
      self.videosInstance.$emit("gotRatio", ratioEvent);
    }
  }
  calcRect(): void {
    const self = this;
    let rect: Rect = { w: 0, h: 0 };

    rect = getFromAxis(rect);
    rect = checkOutOfBounds(rect);

    this.rect = rect;

    function getFromAxis(rect: Rect): Rect {
      const r: number = self.ratio;
      const a: Axis = self.axis;
      let w: number = rect.w;
      let h: number = rect.h;

      if (a.x != 0) {
        w = a.x;
        h = w / r;
      } else if (a.y != 0) {
        h = a.y;
        w = r * h;
      }

      return { w, h };
    }
    function checkOutOfBounds(rect: Rect): Rect {
      const r: number = self.ratio;
      const m: number = 2 * self.margin;
      const maxW: number = self.videosRect.width;
      const maxH: number = self.videosRect.height;
      let w: number = rect.w;
      let h: number = rect.h;

      if (w > maxW) {
        w = maxW - m;
        h = w / r;
      } else if (h > maxH) {
        h = maxH - m;
        w = h * r;
      }

      return { w, h };
    }
  }

  @Watch("axis")
  onAxisChange = (): void => this.calcRect();
}
</script>

<style lang="scss" scoped>
@import "@/scss/styles.scss";

video {
  border-radius: 15px;
  &.exists {
    margin: var(--margin);
    width: var(--w);
    height: var(--h);
  }
  &:not(.exists) {
    @include box-size(0px);
  }

  transition: transform 300ms;
  &:hover {
    cursor: pointer;
    transform: scale(0.99);
  }
}
</style>
