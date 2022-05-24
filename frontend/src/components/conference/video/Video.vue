<template>
  <video
    ref="video"
    :srcObject.prop="stream"
    :muted="muted"
    playsinline
    autoplay
    :style="`
    --w: ${Math.floor(rect.w)}px; 
    --h: ${Math.floor(rect.h)}px;
    --margin: ${margin}px;
    `"
  ></video>
</template>

<script lang="ts">
import { IsToggled, Axis } from "@/interfaces/Conference";
import {
  Vue,
  Component,
  Prop,
  Watch,
  Ref,
  InjectReactive,
  Emit,
} from "vue-property-decorator";

interface Rect {
  w: number;
  h: number;
}

@Component
export default class ConfrenceVideo extends Vue {
  @Ref("video") readonly videoRef!: HTMLVideoElement;

  public ratio: number = 0;
  rect: Rect = {
    w: 0,
    h: 0,
  };
  margin: number = 6;

  @Prop(MediaStream) stream!: MediaStream;
  @Prop(Object) axis!: Axis;
  @Prop({ type: Boolean, default: false }) muted!: boolean;
  @Prop(Object) parentRect!: Rect;

  @InjectReactive() isToggled!: IsToggled;

  mounted() {
    this.videoRef.addEventListener("loadedmetadata", this.getRatio);
  }
  beforeDestroy(): void {
    this.videoRef.removeEventListener("loadedmetadata", this.getRatio);
  }

  @Emit("gotRatio")
  getRatio(): void {
    const el: HTMLVideoElement = this.videoRef;
    this.ratio = el.videoWidth / el.videoHeight;
  }
  recalcRect(): void {
    const self = this;
    var rect: Rect = { w: 0, h: 0 };

    rect = getFromAxis(rect);
    rect = checkOutOfBounds(rect);

    this.rect = rect;

    function getFromAxis(rect: Rect): Rect {
      const ratio: number = self.ratio;
      const a: Axis = self.axis;
      var w: number = rect.w;
      var h: number = rect.h;

      if (a.x) {
        w = a.x;
        h = w / ratio;
      } else if (a.y) {
        h = a.y;
        w = ratio * h;
      }

      return { w, h };
    }
    function checkOutOfBounds(rect: Rect): Rect {
      const ratio: number = self.ratio;
      const m: number = 2 * self.margin;
      var w: number = rect.w;
      var h: number = rect.h;
      const parent: Element = self.$parent.$el;
      const maxW: number = parent.clientWidth;
      const maxH: number = parent.clientHeight;

      if (w > maxW) {
        w = maxW - m;
        h = w / ratio;
      }
      if (h > maxH) {
        h = maxH - m;
        w = h * ratio;
      }

      return { w, h };
    }
  }

  @Watch("axis")
  onAxisChange = (): void => this.recalcRect();
  @Watch("isToggled.bottom.camOff")
  onCamOffToggle(isToggled: boolean) {
    this.stream.getVideoTracks()[0].enabled = !isToggled;
  }
  @Watch("isToggled.bottom.micOff")
  onMicOffToggle(isToggled: boolean) {
    this.stream.getAudioTracks()[0].enabled = !isToggled;
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/styles.scss";

video {
  border-radius: 15px;
  margin: var(--margin);
  width: var(--w);
  height: var(--h);

  transition: transform 300ms;
  &:hover {
    cursor: pointer;
    transform: scale(0.99);
  }
}
</style>
