<template>
  <div class="helpImgWrapper">
    <div class="helpImgDiv" v-for="(img, index) in imgs" :key="index">
      <img
        class="helpImg imgPage"
        :src="img.imageUrl"
        @click="
          expand();
          currentImg = index;
        "
      />
      <button @click="deleteImg(index)" class="deleteImg small">
        <v-icon class="closeIcon">
          mdi-close
        </v-icon>
      </button>
    </div>

    <label v-if="upload" class="addImg imgPage" for="uploadImg">
      <v-icon id="plusIcon">
        mdi-plus
      </v-icon>
    </label>
    <input
      v-if="upload"
      type="file"
      accept="image/*"
      @change="addImg"
      name="uploadImg"
      id="uploadImg"
    />

    <v-dialog v-model="expandImg" fullscreen>
      <v-card>
        <v-card-text>
          <div id="outsideWrapper" ref="outsideWrapper">
            <div v-for="(img, index) in imgs" :key="index" class="fullScreen">
              <div class="imgContainer">
                <img class="expandedImg" :src="img.imageUrl" alt="" />

                <button @click="deleteImg(index)" class="deleteImg large">
                  <v-icon class="closeIcon">
                    mdi-close
                  </v-icon>
                </button>
              </div>
            </div>
          </div>
          <NavButtons />
          <button @click="expandImg = false" class="back">
            <v-icon class="backIcon">
              mdi-close
            </v-icon>
          </button>
          <div id="radio-buttons">
            <input
              type="radio"
              name="radio"
              v-for="(c, i) in imgs"
              :key="i"
              :value="i"
              v-model="currentImg"
              @click="radioClick()"
              :ref="`radio${i}`"
            />
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import NavButtons from "@/components/global/NavButtons.vue";

export default {
  data() {
    return {
      setUp: false,
      expandImg: false,

      imgElems: [],

      w: 0,
      h: 0,

      currentImg: 0,
      xChange: 0,
      xPosition: 0,
    };
  },
  props: {
    imgs: Array,
    upload: Boolean,
  },
  components: {
    NavButtons,
  },
  methods: {
    addImg(e) {
      const file = e.target.files[0];

      this.imgs.push({
        image: file,
        imageUrl: URL.createObjectURL(file),
      });

      this.currentImg = this.imgs.length - 1;
      this.xPosition = this.currentImg * this.w;
    },
    deleteImg(index) {
      if (this.imgs.length - 1 === index) this.currentImg--;

      this.imgs.splice(index, 1);

      this.touchend();
      if (this.imgs.length < 1) {
        this.expandImg = false;
      }
    },
    expand() {
      this.expandImg = true;

      this.$nextTick(() => {
        if (!this.setUp) {
          this.outsideWrapper = this.$refs.outsideWrapper;

          this.$mb.addSwipeListener(this.swipe, this.$refs.outsideWrapper);
          document.addEventListener("touchend", this.touchend);
          document.addEventListener("keydown", (key) => this.keyDown(key));
          window.addEventListener("resize", this.widowResized);
          this.$root.$on("currentChange", (data) => {
            this.xChange = -data * this.w;
            this.touchend();
          });

          this.setUp = true;
        }

        this.widowResized();
      });
    },
    swipe(e) {
      this.xChange = e.x;
      var currentPos = -1 * (this.xPosition + this.xChange);

      this.outsideWrapper.style.transition = "all 0ms";
      this.outsideWrapper.style.transform = "translateX(" + currentPos + "px)";
    },
    touchend() {
      if (Math.abs(this.xChange) > 0.1 * this.w) {
        if (this.currentImg + this.xChange / Math.abs(this.xChange) < 0)
          this.currentImg = this.imgs.length - 1;
        else if (
          this.currentImg + this.xChange / Math.abs(this.xChange) >
          this.imgs.length - 1
        )
          this.currentImg = 0;
        else this.currentImg += this.xChange / Math.abs(this.xChange);
      }

      this.xPosition = this.currentImg * this.w;

      if (this.xChange != 0) {
        this.outsideWrapper.style.transition = "all 400ms";
      }

      this.outsideWrapper.style.transform =
        "translateX(" + -this.xPosition + "px)";

      this.xChange = 0;
    },
    widowResized() {
      this.w = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      );
      this.h = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      );

      this.touchend();
    },
    radioClick() {
      setTimeout(() => {
        this.xChange = 1;
        this.touchend();
      }, 1);
    },
    keyDown(key) {
      if (key.key === "ArrowLeft") {
        this.xChange = -this.w;
        this.touchend();
      } else if (key.key === "ArrowRight") {
        this.xChange = this.w;
        this.touchend();
      }
    },
  },

  beforeDestroy() {
    document.removeEventListener("touchend", this.touchend);
    window.removeEventListener("resize", this.widowResized);
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

.helpImgWrapper {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  .imgPage {
    height: 100px;
    max-width: 100%;
    border-radius: 5px;
    &.helpImg {
      background: var(--v-secondary-base);
      border: none;

      transition: box-shadow 400ms;
      &:hover {
        cursor: pointer;
        box-shadow: 1px 2px 5px 0px var(--v-secondary-darken2);
      }
    }
    &.addImg {
      cursor: pointer;
      width: 70.9px;
      border: 2px dashed var(--v-accent-base);
      @include flexbox;

      transition: 200ms ease-in-out;
      #plusIcon {
        color: var(--v-accent-base);

        transition: 500ms ease-in-out;
      }
      &:hover {
        background: var(--v-backgroundHover-base);
        #plusIcon {
          transform: rotate(-180deg);
        }
      }
    }
  }
}

#radio-buttons {
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  ::before {
    background-color: var(--v-secondary-base);
  }
}

$buttons-offset: 5vw;
$buttons-offset-at-900px: 2vw;

::v-deep {
  #nav-buttons {
    .btn {
      top: 50%;
      transform: translateY(-50%);
      @media (pointer: none), (pointer: coarse) {
        display: none;
      }
      position: fixed;

      &[action="previous"] {
        left: $buttons-offset;
        @media (max-width: 900px) {
          left: $buttons-offset-at-900px;
        }

        animation: fromLeft 0.5s ease-in both;

        @keyframes fromLeft {
          from {
            transform: translateX(-4rem);
            opacity: 0;
          }
          to {
            transform: translateX(0rem);
            opacity: 1;
          }
        }
      }
      &[action="next"] {
        right: $buttons-offset;
        @media (max-width: 900px) {
          right: $buttons-offset-at-900px;
        }

        animation: fromRight 0.5s ease-in both;

        @keyframes fromRight {
          from {
            transform: translateX(4rem);
            opacity: 0;
          }
          to {
            transform: translateX(0rem);
            opacity: 1;
          }
        }
      }
    }
  }

  .v-dialog {
    overflow: hidden;
    background: var(--v-background-base);
    @include flexbox;
    .v-card {
      //   overflow: hidden;
      min-height: 0;
      background: var(--v-background-base);

      box-shadow: none;
      .v-card__text {
        padding: 0;
        display: flex;
        overflow: hidden;
        #outsideWrapper {
          @include flexbox;
          // position: relative;
          .fullScreen {
            @include flexbox;

            border-right: 1px solid var(--v-background-base);
            border-left: 1px solid var(--v-background-base);

            width: 100vw;
            height: 100vh;

            background: var(--v-background-base);

            .imgContainer {
              position: relative;
              .expandedImg {
                min-width: 30vw;
                max-width: 95vw;
                min-height: 30vh;
                max-height: 95vh;
                border-radius: 15px;
                margin: 5px;
              }
            }
          }
        }
      }
    }
  }
}

.helpImgDiv {
  position: relative;
  height: 100px;
  margin: 2px;
}

.deleteImg {
  position: absolute;
  .closeIcon {
    transition: all 500ms;
    &:hover {
      transform: rotate(180deg) scale(0.8);
      color: var(--v-accent-base) !important;
    }
  }
  &.large {
    top: 10px;
    right: 10px;
    .closeIcon {
      color: var(--v-accent-base);
    }
  }
  &.small {
    transform: scale(0.7);
    top: 0px;
    right: 0px;
    .closeIcon {
      color: var(--v-secondary-darken2);
    }
  }
}

.back {
  position: fixed;
  top: 15px;
  right: 30px;
  .backIcon {
    color: var(--v-accent-base);
    transform: scale(1.2);

    transition: all 500ms;
    &:hover {
      transform: rotate(-180deg);
    }
  }
}
</style>
