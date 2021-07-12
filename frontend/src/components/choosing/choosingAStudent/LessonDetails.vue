<template>
  <div class="content">
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio labore harum
      dolores eum deserunt facere dolorem ipsum rem nisi! Dolorum!
    </p>
    <div class="helpImgWrapper">
      <div
        class="helpImg"
        v-for="img in imgs"
        :key="img.index"
        @click="
          expand();
          currentImg = img;
        "
      />

      <v-dialog v-model="expandImg" fullscreen>
        <!-- rewrite so hat will be only one scroller -->
        <v-card>
          <v-card-text>
            <div id="outsideWrapper" ref="outsideWrapper">
              <div v-for="img in imgs" :key="img.index" class="expandedImg">
                {{ img }}
                <v-btn @click="expandImg = false" class="close" small icon text>
                  <v-icon>
                    mdi-close
                  </v-icon>
                </v-btn>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      expandImg: false,
      imgs: [1, 2, 3, 4, 5, 6, 7],
      currentImg: 1,
      xChange: 0,
      xPosition: 0,
    };
  },
  methods: {
    expand() {
      this.expandImg = true;
      setTimeout(() => {
        this.widowResized();
      }, 1);
    },
    swipe(e) {
      var elem = document.getElementById("outsideWrapper");

      this.xChange = e.x;
      var currentPos = -1 * (this.xPosition + this.xChange);

      elem.style.transition = "all 0ms";
      elem.style.transform = "translateX(" + currentPos + "px)";
    },
    touchend() {
      var w = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      );

      if (
        Math.abs(this.xChange) > 0.1 * w &&
        this.currentImg + this.xChange / Math.abs(this.xChange) > 0 &&
        this.currentImg + this.xChange / Math.abs(this.xChange) <=
          this.imgs.length
      ) {
        this.currentImg += this.xChange / Math.abs(this.xChange);
      }

      this.xPosition = (this.currentImg - 1) * w;
      console.log(this.xPosition);

      var elem = document.getElementById("outsideWrapper");
      if (this.xChange != 0) {
        elem.style.transition = "all 1s";
      }

      elem.style.transform = "translateX(" + -this.xPosition + "px)";

      this.xChange = 0;
    },
    widowResized() {
      var w = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      );
      var h = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      );

      var elems = document.getElementsByClassName("expandedImg");

      if (1.41 * w >= h) {
        elems.forEach(
          (el) => (el.style.margin = "0 calc((100vw - 70.9vh) / 2)")
        );
      } else {
        elems.forEach((el) => (el.style.margin = "0"));
      }

      if (this.currentImg != 0) {
        this.touchend();
      }
    },
  },
  mounted() {
    this.$mb.addSwipeListner(this.swipe, this.$refs.outsideWrapper);
    document.addEventListener("touchend", this.touchend);
    window.addEventListener("resize", this.widowResized);
  },
  beforeDestroy() {
    document.removeEventListener("touchend", this.touchend);
    window.removeEventListener("resize", this.widowResized);
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

.content {
  & > *:not(:last-child) {
    margin-bottom: 5rem;
  }
}

p {
  margin-bottom: 0;
}

.helpImgWrapper {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .helpImg {
    width: 100px;
    height: 141px;
    border-radius: 5px;
    background: var(--v-secondary-base);
    margin-top: 4px;

    &:not(:last-child) {
      margin-right: 4px;
    }

    transition: box-shadow 400ms;
    &:hover {
      cursor: pointer;
      box-shadow: 1px 2px 5px 0px var(--v-secondary-darken2);
    }
  }
}

::v-deep {
  .v-dialog {
    background: var(--v-header-base);
    @include flexbox;
    .v-card {
      border-radius: 0;
      min-width: 0;
      min-height: 0;
      background: var(--v-header-base);

      box-shadow: none;
      .v-card__text {
        padding: 0;
        display: flex;
        overflow: hidden;
        #outsideWrapper {
          @include flexbox;
          .expandedImg {
            position: relative;
            border-right: 1px solid var(--v-header-base);
            border-left: 1px solid var(--v-secondary-darken1);

            width: 100vw;
            height: 141vw; //1.41 -- A4 ratio

            max-width: 70.9vh;
            max-height: 100vh;
            // background: green;
            background: var(--v-secondary-base);

            // margin: 0 calc((100vw - 70.9vh) / 2); //TO-DO

            .close {
              position: absolute;
              top: 10px;
              right: 10px;
              color: var(--v-accent-base);
            }
          }
        }
      }
    }
  }
}
</style>
