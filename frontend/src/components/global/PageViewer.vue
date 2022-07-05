<template>
  <div id="container" ref="container">
    <div id="imgContainer" ref="imgContainer">
      <div class="imgCard" v-for="(img, index) in imgs" :key="index">
        <img :src="img.imageUrl" @click="expand(index)" />
        <button v-if="upload" @click="deleteImg(index)" class="deleteImg small">
          <v-icon class="closeIcon"> mdi-close </v-icon>
        </button>
      </div>

      <label v-if="upload" class="imgCard addImg">
        <v-icon id="plusIcon"> mdi-plus </v-icon>
        <input v-if="upload" type="file" accept="image/*" @change="addImg" />
      </label>
    </div>
    <v-dialog v-model="expandImg" fullscreen>
      <v-card id="card">
        <v-card-text>
          <div id="outsideWrapper" ref="outsideWrapper">
            <div v-for="(img, index) in imgs" :key="index" class="fullScreen">
              <div class="imgContainer">
                <img class="expandedImg" :src="img.imageUrl" alt="" />

                <button
                  v-if="upload"
                  @click="deleteImg(index)"
                  class="deleteImg large"
                >
                  <v-icon class="closeIcon"> mdi-close </v-icon>
                </button>
              </div>
            </div>
          </div>
          <NavButtons offset="2vw" animated @click="(i) => (currentImg += i)" />
          <button @click="expandImg = false" class="back">
            <v-icon class="backIcon"> mdi-close </v-icon>
          </button>
          <div id="radio-buttons">
            <RadioButton
              v-for="(c, i) in imgs"
              :key="i"
              :value="i"
              v-model="currentImg"
              @click="currentImg = i"
            />
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import NavButtons from "@/components/global/NavButtons.vue";
import RadioButton from "@/components/global/RadioButton.vue";

export default {
  data() {
    return {
      expandImg: false,
      currentImg: 0,
      // settings //
      gapSize: 8, //px
      minHeight: 100, //px
      labelAspectRatio: 1.41,
    };
  },
  props: {
    imgs: Array,
    upload: Boolean,
  },
  components: {
    NavButtons,
    RadioButton,
  },
  methods: {
    async expand(index) {
      this.expandImg = true;
      this.toggleWrapperTransition(false);
      await new Promise((res) => setTimeout(() => res(), 0));
      this.currentImg = index;
      await new Promise((res) => setTimeout(() => res(), 0));
      this.toggleWrapperTransition(true);
    },
    addImg(e) {
      const file = e.target.files[0];
      const newImg = { image: file, imageUrl: URL.createObjectURL(file) };
      this.$emit("imgs", [...this.imgs, newImg]);
    },
    deleteImg(index) {
      const _imgs = [...this.imgs];
      _imgs.splice(index, 1);
      this.$emit("imgs", _imgs);
    },
    keyDown(key) {
      if (!this.expandImg) return;
      switch (key.code) {
        case "KeyA":
        case "ArrowLeft":
          this.currentImg--;
          break;
        case "KeyD":
        case "ArrowRight":
          this.currentImg++;
          break;
      }
    },
    swipe({ x }, status) {
      if (!this.expandImg) return;
      switch (status) {
        case "move":
          if (Math.abs(x) > 3) {
            this.toggleWrapperTransition(false);
            this.setWrapperOffset(this.currentImg, x);
          }
          break;
        case "end":
          this.toggleWrapperTransition(true);
          this.setWrapperOffset(this.currentImg);
          if (Math.abs(x) > 0.1 * window.innerWidth)
            this.currentImg += x / Math.abs(x);
          break;
      }
    },
    toggleWrapperTransition(val) {
      this.$refs.outsideWrapper?.classList.toggle("transition", val);
    },
    setWrapperOffset(imgs, px = 0) {
      const wrapper = this.$refs.outsideWrapper;
      if (wrapper)
        wrapper.style.transform = `translateX(${
          (imgs + px / window.innerWidth) * -100
        }vw)`;
    },
    calculateSizes(maxWidth) {
      maxWidth =
        maxWidth ?? this.$refs.imgContainer.getBoundingClientRect().width;
      this.waitUntilImgsReady(() =>
        this.getRows(maxWidth)?.forEach((row, i) =>
          this.calculateRowSize(row, maxWidth, i)
        )
      );
    },
    getRows(maxWidth) {
      const imgs = Array.from(this.$refs.imgContainer.children);
      const rows = [[]];
      while (imgs.length > 0) {
        let el = imgs.shift();
        var row = rows[rows.length - 1];
        if (
          row.length === 0 ||
          this.getSizeMultiplier([...row, el], maxWidth) >= 1
        )
          row.push(el);
        else rows.push([el]);
      }
      return rows;
    },
    getAspectRatio(el) {
      if (el.nodeName === "LABEL") return this.labelAspectRatio;
      return el.offsetHeight / el.offsetWidth;
    },
    getSizeMultiplier(row, maxWidth) {
      const minRowWidth = row.reduce(
        (n, el) => n + this.minHeight / this.getAspectRatio(el),
        0
      );
      const gaps = (row.length + 1) * this.gapSize;
      const availableWidth = maxWidth - gaps;
      const multiplier = availableWidth / minRowWidth;
      return multiplier;
    },
    calculateRowSize(row, maxWidth, index) {
      const n = this.getSizeMultiplier(row, maxWidth);
      row.forEach((el) => {
        el.style.marginBottom = this.gapSize + "px";
        el.style.marginTop = (index === 0 ? this.gapSize : 0) + "px";

        el.style.height = this.minHeight * n + "px";
        if (el.nodeName === "LABEL") {
          el.style.width =
            (this.minHeight / this.getAspectRatio(el)) * n + "px";
          if (row.length === 1) el.style.height = this.minHeight + "px";
        }
      });
    },
    waitUntilImgsReady(res) {
      setTimeout(() => {
        if (this.isImgsReady()) res();
        else this.waitUntilImgsReady(res);
      }, 100);
    },
    isImgsReady() {
      if (!this.$refs.imgContainer) return undefined;
      for (const img of this.$refs.imgContainer.children)
        if (this.getAspectRatio(img) === Infinity) return false;
      return true;
    },
  },
  watch: {
    currentImg: function (val) {
      const imgs = this.$refs.imgContainer.children;
      let size = imgs.length;
      if (imgs[size - 1].nodeName === "LABEL") size--;
      if (val < 0) return (this.currentImg = size - 1);
      if (val > size - 1) return (this.currentImg = 0);
      this.setWrapperOffset(val);
    },
    imgs: function () {
      this.expandImg = false;
      this.calculateSizes();
      this.calculateSizes(); // ?!?!?!?!?!???!!??! WTF
    },
  },
  mounted() {
    let width = 0;
    new ResizeObserver((e) => {
      let currentWidth = e[0].contentRect.width;
      if (Math.abs(width - currentWidth) > 1) {
        width = currentWidth;
        this.calculateSizes(width);
      }
    }).observe(this.$refs.imgContainer);
    document.addEventListener("keydown", this.keyDown);
    this.$mb.addSwipeListener(this.swipe, this.$refs.outsideWrapper);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.keyDown);
    this.$mb.removeSwipeListener(this.swipe, this.$refs.outsideWrapper);
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";
#container {
  width: 100%;
  max-width: 100%;
}

#imgContainer {
  animation: fadeIn 2500ms 200ms ease both;
  overflow: hidden;

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: scale(0.5);
      max-height: 0px;
    }
    25% {
      opacity: 1;
      transform: scale(1);
    }
    99% {
      max-height: 1000px;
    }
    100% {
      max-height: fit-content;
    }
  }
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  @include box-shadow();
  border-radius: 15px;
  overflow: hidden;
  width: 100%;
}

.imgCard {
  display: block;
  @include flexbox;
  width: fit-content;
  position: relative;
  cursor: pointer;

  transition: transform 500ms;
  &:hover {
    transform: scale(0.98);
  }

  &.addImg {
    @include flexbox;
    border: 2px dashed var(--v-accent-base);
    transition: 200ms ease-in-out;
    border-radius: 15px;

    #plusIcon {
      color: var(--v-accent-base);
      transition: 500ms ease-in-out;
    }
    input {
      display: none;
    }
    &:hover {
      background: var(--v-backgroundHover-base);
      #plusIcon {
        transform: rotate(-180deg);
      }
    }
  }

  img {
    height: 100%;
    border-radius: 15px;
  }
}

#radio-buttons {
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  ::before {
    background-color: var(--v-secondary-base);
  }
}

$buttons-offset: 5vw;
$buttons-offset-at-900px: 2vw;

::v-deep {
  &.v-dialog__content {
    $background: rgba(
      $color: #000,
      $alpha: 0.7,
    );
    background-color: transparent;

    transition: background-color 0.8s;
    &.v-dialog__content--active {
      background-color: $background;
      .imgContainer {
        transform: scale(1) !important;
        opacity: 1 !important;
      }
    }
    .v-dialog {
      overflow: hidden;
      // background: var(--v-background-base);
      // background: transparent;
      // @include flexbox;
      box-shadow: none;
      background-color: transparent;
      border-radius: 15px;
      transition: opacity 0.45s, transform 0.6s;
      // transform: scale(1);
      // opacity: 1;

      .v-card {
        min-height: 0;
        // background: var(--v-background-base);
        border-radius: 0;
        background: transparent;

        box-shadow: none;
        .v-card__text {
          padding: 0;
          display: flex;
          overflow: hidden;
          #outsideWrapper {
            @include flexbox;
            &.transition {
              transition: all 400ms;
            }
            .fullScreen {
              @include flexbox;

              width: 100vw;
              height: 100vh;

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
#card {
  position: relative;
}
</style>
