<template>
  <div
    id="videos"
    :style="`--flexDir: ${flexDir}; --h: ${rect.h}px; --w: ${rect.w}px;`"
  >
    <Video ref="local" :stream="streams.local" :axis="axis" muted />
    <Video ref="remote" :stream="streams.remote" :axis="axis" muted />
  </div>
</template>

<script>
import Video from "@/components/conference/video/Video.vue";

export default {
  data() {
    return {
      rect: {
        h: null,
        w: null,
      },
      flexDir: null,
      sumRatio: null,
      axis: {
        x: null,
        y: null,
      },
    };
  },
  props: {
    streams: Object,
    colW: Number,
  },
  components: {
    Video,
  },
  mounted() {
    addEventListener("resize", this.onResize);
  },
  beforeDestroy() {
    removeEventListener("resize", this.onResize);
  },
  methods: {
    async onResize() {
      const self = this;
      this.rect.h = getHeight();
      this.rect.w = getWidth();

      await this.sleep();

      const ratios = getVideoRatios();

      if (!ifAllExist(ratios)) return;

      const sumRatios = getSumRatios(ratios);
      const ifRow = getIfRow(sumRatios);

      this.sumRatio = ifRow ? sumRatios.row : sumRatios.col;
      this.flexDir = ifRow ? "row" : "column";
      this.axis = getAxis();

      function getHeight() {
        const topBarH = self.$parent.$refs.topBar?.$el.offsetHeight || 0;
        const bottomBarH = self.$parent.$refs.bottomBar?.$el.offsetHeight || 0;
        return innerHeight - (topBarH + bottomBarH);
      }
      function getWidth() {
        return self.colW;
      }
      function getVideoRatios() {
        return {
          local: self.$refs.local.ratio,
          remote: self.$refs.remote.ratio,
        };
      }
      function ifAllExist(ratios) {
        return !!ratios.local && !!ratios.remote;
      }
      function getSumRatios(ratios) {
        return {
          row: ratios.local + ratios.remote,
          col: (ratios.local * ratios.remote) / (ratios.local + ratios.remote),
        };
      }
      function getIfRow(sumRatios) {
        return getFraction(sumRatios.row) > getFraction(sumRatios.col);

        function getFraction(sumRatio) {
          const containerRatio = self.$el.offsetWidth / self.$el.offsetHeight;
          if (sumRatio < containerRatio) return sumRatio / containerRatio;
          else return containerRatio / sumRatio;
        }
      }
      function getAxis() {
        const containerW = self.$el.offsetWidth;
        const containerH = self.$el.offsetHeight;

        const ifXFilled = getIfXFilled();
        const m = self.$refs.local.margin;
        return { x: getX(), y: getY() };

        function getIfXFilled() {
          const containerRatio = containerW / containerH;
          return self.sumRatio > containerRatio ? true : false;
        }
        function getX() {
          const my = self.flexDir == "column" ? 4 * m : 2 * m;
          return ifXFilled ? null : self.sumRatio * (containerH - my);
        }
        function getY() {
          const mx = self.flexDir == "row" ? 4 * m : 2 * m;
          return ifXFilled ? (containerW - mx) / self.sumRatio : null;
        }
      }
    },
    sleep(ms = 0) {
      return new Promise((r) => setTimeout(r, ms));
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/styles.scss";

#videos {
  $flex-direction: var(--flexDir);
  @include flexbox($flex-direction);
  width: var(--w);
  height: var(--h);
}
</style>
