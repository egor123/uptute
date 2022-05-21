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

<script>
export default {
  data() {
    return {
      ratio: 0,
      rect: {
        w: 0,
        h: 0,
      },
      margin: 6,
    };
  },
  props: {
    stream: MediaStream,
    axis: Object,
    muted: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    const video = this.$refs.video;
    video.addEventListener("loadedmetadata", this.getRatio);
  },
  beforeDestroy() {
    const video = this.$refs.video;
    video.removeEventListener("loadedmetadata", this.getRatio);
  },
  methods: {
    getRatio(e) {
      const el = e.srcElement;
      this.ratio = el.videoWidth / el.videoHeight;
      this.$parent.onResize();
    },
    recalcRect() {
      const self = this;
      var rect = { w: null, h: null };

      rect = getFromAxis(rect);
      rect = checkOutOfBounds(rect);

      this.rect = rect;

      function getFromAxis(rect) {
        const ratio = self.ratio;
        const a = self.axis;
        var w = rect.w;
        var h = rect.h;

        if (a.x) {
          w = a.x;
          h = w / ratio;
        } else if (a.y) {
          h = a.y;
          w = ratio * h;
        }

        return { w, h };
      }
      function checkOutOfBounds(rect) {
        const ratio = self.ratio;
        const m = 2 * self.margin;
        var w = rect.w;
        var h = rect.h;
        const parent = self.$parent.$el;
        const maxW = parent.offsetWidth;
        const maxH = parent.offsetHeight;

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
    },
  },
  watch: {
    axis() {
      this.recalcRect();
    },
  },
};
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
