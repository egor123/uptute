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

      if (!ratios.local || !ratios.remote) return;

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
      function getSumRatios(ratios) {
        return {
          row: ratios.local + ratios.remote,
          col: (ratios.local * ratios.remote) / (ratios.local + ratios.remote),
        };
      }
      function getIfRow(sumRatios) {
        const percent = {
          row: getPercent(sumRatios.row),
          col: getPercent(sumRatios.col),
        };

        return percent.row > percent.col;

        function getPercent(sumRatio) {
          const windowRatio = innerWidth / innerHeight;
          if (sumRatio < windowRatio) return (100 * sumRatio) / windowRatio;
          else return (100 * windowRatio) / sumRatio;
        }
      }
      function getAxis() {
        const ifXFilled = getIfXFilled();
        const m = self.$refs.local.margin;
        return {
          x: getX(),
          y: getY(),
        };

        function getIfXFilled() {
          const windowRatio = innerWidth / innerHeight;
          return self.sumRatio > windowRatio ? true : false;
        }
        function getX() {
          const grossX = ifXFilled ? null : self.sumRatio * innerHeight;
          const margins = self.flexDir == "row" ? 4 * m : 2 * m;
          return grossX ? grossX - margins : null;
        }
        function getY() {
          const grossY = ifXFilled ? innerWidth / self.sumRatio : null;
          const margins = self.flexDir == "column" ? 4 * m : 2 * m;
          return grossY ? grossY - margins : null;
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
