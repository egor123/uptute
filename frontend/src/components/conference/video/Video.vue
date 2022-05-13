<template>
  <video
    :srcObject.prop="stream"
    :muted="muted"
    playsinline
    autoplay
    :style="`
    --w: ${Math.floor(w)}px; 
    --h: ${Math.floor(h)}px;
    --margin: ${margin}px;
    `"
  ></video>
</template>

<script>
export default {
  data() {
    return {
      ratio: 0,
      w: 0,
      h: 0,
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
  mounted() {},
  methods: {
    onResize() {
      const self = this;

      var size = getFromAxis();
      size = checkOutOfBounds(size);

      this.w = size.w;
      this.h = size.h;

      function getFromAxis() {
        var w = null;
        var h = null;
        const axis = self.axis;

        if (axis.x) {
          w = axis.x;
          h = w / self.ratio;
        } else if (axis.y) {
          h = axis.y;
          w = self.ratio * h;
        }

        return { w, h };
      }
      function checkOutOfBounds(size) {
        var w = size.w;
        var h = size.h;

        const maxW = innerWidth;
        const maxH = innerHeight;

        if (w > maxW) {
          w = maxW - 2 * self.margin;
          h = w / self.ratio;
        } else if (h > maxH) {
          h = maxH - 2 * self.margin;
          w = h * self.ratio;
        }

        return { w, h };
      }
    },
  },
  watch: {
    stream(stream) {
      const self = this;
      stream.onaddtrack = getRatio;

      function getRatio() {
        const settings = stream.getVideoTracks()[0].getSettings();
        self.ratio = settings.width / settings.height;
        self.$parent.onResize();
      }
    },
    axis() {
      this.onResize();
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
}
</style>
