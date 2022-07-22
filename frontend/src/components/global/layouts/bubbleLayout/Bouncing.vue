<template>
  <div id="container">
    <div id="ball" ref="ball">
      <img id="img" :src="getImgUrl(img)" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      w: 0,
      h: 0,
      ball: {
        x: 0,
        y: 0,
        vx: 1,
        vy: 1,
        w: 96,
        h: 96,
      },
    };
  },
  props: {
    img: String,
  },
  mounted() {
    window.addEventListener("resize", this.resized);
    this.resized();
    this.startBouncing();
  },
  methods: {
    getImgUrl(img) {
      return require(`@/assets/icons/${img}.svg`);
    },
    resized() {
      this.w = window.innerWidth;
      this.h = window.innerHeight;
    },
    startBouncing() {
      if (this.ball.x < 0 || this.ball.x >= this.w - this.ball.w) {
        this.ball.vx = -this.ball.vx;
      }
      if (this.ball.y < 0 || this.ball.y >= this.h - this.ball.h) {
        this.ball.vy = -this.ball.vy;
      }

      this.ball.x += this.ball.vx;
      this.ball.y += this.ball.vy;

      this.$refs.ball.style = `left: ${this.ball.x}px; top: ${this.ball.y}px;`;
      setTimeout(() => {
        this.startBouncing();
      }, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

#container {
  position: relative;
  @include box-size(100%);
  z-index: 1;
}

#ball {
  position: absolute;

  border-radius: 50%;
  left: 0;
  top: 0;
  z-index: 3; // thought goes under

  #img {
    @include box-size(64px); // !! if changing, change "wrapperSize" also
    margin: 32px;
  }
}
</style>
