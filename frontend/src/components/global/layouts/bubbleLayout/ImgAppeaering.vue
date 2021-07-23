<template>
  <div id="container">
    <div id="wrapper" ref="wrapper">
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
      wrapperSize: 96,
    };
  },
  props: {
    img: String,
  },
  mounted() {
    window.addEventListener("resize", this.resized);
    this.resized();
    this.move();
  },
  methods: {
    move() {
      this.$refs.wrapper.style = `left: ${Math.random() *
        (this.w - this.wrapperSize)}px; top: ${Math.random() *
        (this.h - this.wrapperSize)}px;`;
      setTimeout(() => {
        this.move();
      }, 10000);
    },
    getImgUrl(img) {
      return require(`@/assets/icons/${img}.svg`);
    },
    resized() {
      this.w = window.innerWidth;
      this.h = window.innerHeight;
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
  #wrapper {
    border-radius: 50%;
    position: absolute;

    animation: expand 10s 1ms infinite ease-in-out;

    @keyframes expand {
      0% {
        box-shadow: 0px 0px 0px 0px transparent;
      }

      50% {
        box-shadow: 4px 6px 10px 0px var(--v-secondary-darken2);
      }

      100% {
        box-shadow: 0px 0px 0px 0px transparent;
      }
    }

    #img {
      margin: 32px;
      @include box-size(64px);
      // background: green;

      animation: visibility 10s 1ms infinite ease-in-out;

      @keyframes visibility {
        0% {
          opacity: 0;
        }
        15% {
          opacity: 0;
        }
        50% {
          opacity: 0.4;
        }
        85% {
          opacity: 0;
        }
        100% {
          opacity: 0;
        }
      }
    }
  }
}
</style>
