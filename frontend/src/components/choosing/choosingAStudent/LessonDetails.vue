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
        <v-card>
          <v-card-text>
            <div id="outsideWrapper" ref="outsideWrapper">
              <div v-for="(img, id) in imgs" :key="id" class="expandedImg">
                {{ img }}
                <v-btn @click="expandImg = false" class="close" small icon text>
                  <v-icon>
                    mdi-close
                  </v-icon>
                </v-btn>
              </div>
            </div>
            <NavButtons />
            <div id="radio-buttons">
              <input
                type="radio"
                name="radio"
                v-for="(c, i) in imgs"
                :key="i + 1"
                :value="i + 1"
                v-model="currentImg"
                @click="radioClick()"
                :ref="`radio${i}`"
              />
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>

    <Dialog>
      <template v-slot:object>
        <v-btn rounded outlined color="accent">
          {{ $l("choose_a.student.dialog.offer") }}
        </v-btn>
      </template>

      <template v-slot:title>
        {{ $l("choose_a.student.dialog.title") }}
      </template>

      <template v-slot:text>
        {{ $l("choose_a.student.dialog.text") }}
      </template>
    </Dialog>
  </div>
</template>

<script>
import NavButtons from "@/components/global/NavButtons.vue";
import { bus } from "@/main.js";

import Dialog from "@/components/global/Dialog.vue";

export default {
  data() {
    return {
      wrapperWacher: null,
      setUp: false,
      igmElems: [],

      v: 0,
      w: 0,

      expandImg: false,
      imgs: [1, 2, 3, 4, 5, 6, 7],
      currentImg: 1,
      xChange: 0,
      xPosition: 0,
    };
  },
  components: {
    NavButtons,
    Dialog,
  },
  methods: {
    expand() {
      this.expandImg = true;

      if (!this.setUp) {
        setTimeout(() => {
          this.outsideWrapper = this.$refs.outsideWrapper; //is assigned every time expandImg opens
          this.igmElems = document.getElementsByClassName("expandedImg");

          this.widowResized();

          this.$mb.addSwipeListner(this.swipe, this.$refs.outsideWrapper);
          document.addEventListener("touchend", this.touchend);
          window.addEventListener("resize", this.widowResized);

          bus.$on("currentChange", (data) => {
            this.xChange = -data * this.w;
            this.touchend();
          });
        }, 1);

        this.setUp = true;
      }
    },
    swipe(e) {
      this.xChange = e.x;
      var currentPos = -1 * (this.xPosition + this.xChange);

      this.outsideWrapper.style.transition = "all 0ms";
      this.outsideWrapper.style.transform = "translateX(" + currentPos + "px)";
    },
    touchend() {
      if (Math.abs(this.xChange) > 0.1 * this.w) {
        if (this.currentImg + this.xChange / Math.abs(this.xChange) < 1)
          this.currentImg = this.imgs.length;
        else if (
          this.currentImg + this.xChange / Math.abs(this.xChange) >
          this.imgs.length
        )
          this.currentImg = 1;
        else this.currentImg += this.xChange / Math.abs(this.xChange);
      }

      this.xPosition = (this.currentImg - 1) * this.w;

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

      if (1.41 * this.w >= this.h) {
        this.igmElems.forEach(
          (el) => (el.style.margin = "0 calc((100vw - 70.9vh) / 2)")
        );
      } else {
        this.igmElems.forEach((el) => (el.style.margin = "0"));
      }

      if (this.currentImg != 1) this.touchend();
    },
    radioClick() {
      setTimeout(() => {
        console.log(123);
        this.xChange = 1;
        this.touchend();
      }, 1);
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

#radio-buttons {
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
}

$buttons-offset: calc(50vw - 550px);
$buttons-offset-at-1400px: 5vw;
$buttons-offset-at-900px: 2vw;

::v-deep {
  #nav-buttons {
    .btn {
      @media (pointer: none), (pointer: coarse) {
        display: none;
      }
      position: fixed;

      &[action="previous"] {
        left: $buttons-offset;
        @media (max-width: 1400px) {
          left: $buttons-offset-at-1400px;
        }
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
        @media (max-width: 1400px) {
          right: $buttons-offset-at-1400px;
        }
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
    background: var(--v-header-base);
    @include flexbox;
    .v-card {
      // border-radius: 0;
      // min-width: 0;
      min-height: 0;
      background: var(--v-header-base);

      box-shadow: none;
      .v-card__text {
        padding: 0;
        display: flex;
        overflow: hidden;
        #outsideWrapper {
          @include flexbox;
          // position: relative;
          .expandedImg {
            position: relative;
            border-right: 1px solid var(--v-header-base);
            border-left: 1px solid var(--v-header-base);

            width: 100vw;
            height: 141vw; //1.41 -- A4 ratio

            max-width: 70.9vh;
            max-height: 100vh;

            background: var(--v-secondary-base);

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
