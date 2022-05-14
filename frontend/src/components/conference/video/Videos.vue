<template>
  <div id="videos" :style="`--flexDir: ${flexDir}`">
    <Video ref="local" :stream="streams.local" :axis="axis" muted />
    <Video ref="remote" :stream="streams.remote" :axis="axis" muted />
  </div>
</template>

<script>
import Video from "@/components/conference/video/Video.vue";

export default {
  data() {
    return {
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
    onResize() {
      const self = this;
      const ratios = getVideoRatios();

      if (!ifAllExist(ratios)) return;

      const sumRatios = getSumRatios(ratios);
      const ifRow = getIfRow(sumRatios);

      this.sumRatio = ifRow ? sumRatios.row : sumRatios.col;
      this.flexDir = ifRow ? "row" : "column";
      this.axis = getAxis();

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
          const windowRatio = innerWidth / innerHeight;
          if (sumRatio < windowRatio) return sumRatio / windowRatio;
          else return windowRatio / sumRatio;
        }
      }
      function getAxis() {
        const ifXFilled = getIfXFilled();
        const m = self.$refs.local.margin;
        return { x: getX(), y: getY() };

        function getIfXFilled() {
          const windowRatio = innerWidth / innerHeight;
          return self.sumRatio > windowRatio ? true : false;
        }
        function getX() {
          const my = self.flexDir == "column" ? 4 * m : 2 * m;
          return ifXFilled ? null : self.sumRatio * (innerHeight - my);
        }
        function getY() {
          const mx = self.flexDir == "row" ? 4 * m : 2 * m;
          return ifXFilled ? (innerWidth - mx) / self.sumRatio : null;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/styles.scss";

#videos {
  $flex-direction: var(--flexDir);
  @include flexbox($flex-direction);
  position: fixed;
  @include box-size(100%);
  padding: 8px;
}
</style>
