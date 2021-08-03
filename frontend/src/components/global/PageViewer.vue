<template>
  <div id="container">
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
      gapSize: 4, //px
      estimatedHeight: 100, //px
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
      this.imgs.push({
        image: file,
        imageUrl: URL.createObjectURL(file),
      });
    },
    deleteImg(index) {
      this.imgs.splice(index, 1);
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
          imgs * -window.innerWidth - px
        }px)`;
    },
    calculateSizes() {
      const maxWidth = this.$refs.imgContainer.getBoundingClientRect().width;
      this.waitUntilImgsReady(() =>
        this.getRows(maxWidth, this.estimatedHeight, this.gapSize)?.forEach(
          (row) =>
            this.calculateRowSize(
              row,
              maxWidth,
              this.estimatedHeight,
              this.gapSize
            )
        )
      );
    },
    getRows(maxWidth, estimatedHeight, gapSize) {
      const imgs = Array.from(this.$refs.imgContainer.children);
      const rows = [[]];
      while (imgs.length > 0) {
        let el = imgs.shift();
        var row = rows[rows.length - 1];
        const elWidth = estimatedHeight / this.getAspectRatio(el);
        const rowWidth =
          this.getEstimatedRowWidth(row, estimatedHeight) +
          elWidth +
          row.length * gapSize;
        if (row.length === 0 || rowWidth <= maxWidth) row.push(el);
        else rows.push([el]);
      }
      console.log(rows);
      return rows;
    },
    getAspectRatio(el) {
      if (el.nodeName === "LABEL") return this.labelAspectRatio;
      return el.offsetHeight / el.offsetWidth;
    },
    getEstimatedRowWidth(row, estimatedHeight) {
      return row.reduce(
        (val, el) => val + estimatedHeight / this.getAspectRatio(el),
        0
      );
    },
    calculateRowSize(row, maxWidth, estimatedHeight, gapSize) {
      let estimatedRowSize = this.getEstimatedRowWidth(row, estimatedHeight);
      estimatedRowSize += (row.length - 1) * gapSize;
      const n = maxWidth / estimatedRowSize;
      row.forEach((el) => {
        console.log(this.getAspectRatio(el));
        el.style.height = estimatedHeight * n + "px";
        if (el.nodeName === "LABEL") {
          el.style.width =
            (estimatedHeight / this.getAspectRatio(el)) * n + "px";
          if (row.length === 1) el.style.height = estimatedHeight + "px";
        }
      });
    },
    waitUntilImgsReady(res) {
      setTimeout(() => {
        if (this.isImgsReady()) res();
        else this.waitUntilImgsReady(res);
      }, 0);
    },
    isImgsReady() {
      for (const img of this.$refs.imgContainer.children)
        if (this.getAspectRatio(img) === Infinity) return false;
      return true;
    },
  },
  watch: {
    currentImg: function (val) {
      const size = this.$refs.imgContainer.children.length;
      if (val < 0) return (this.currentImg = size - 2);
      if (val > size - 2) return (this.currentImg = 0);
      this.setWrapperOffset(val);
    },
    imgs: function () {
      this.expandImg = false;
      this.calculateSizes();
    },
  },
  mounted() {
    this.calculateSizes();
    window.addEventListener("resize", this.calculateSizes);
    document.addEventListener("keydown", this.keyDown);
    this.$mb.addSwipeListener(this.swipe, this.$refs.outsideWrapper);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.calculateSizes);
    document.removeEventListener("keydown", this.keyDown);
    this.$mb.removeSwipeListener(this.swipe, this.$refs.outsideWrapper);
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

#imgContainer {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.imgCard {
  display: block;
  @include flexbox;
  position: relative;
  cursor: pointer;
  margin-bottom: 10px;
  &.addImg {
    @include flexbox;
    border: 2px dashed var(--v-accent-base);
    transition: 200ms ease-in-out;
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
  &:not(.addImg) {
    transition: box-shadow 400ms;
    img {
      border-radius: 5px;
      height: 100%;
    }
    &:hover {
      box-shadow: 1px 2px 5px 0px var(--v-secondary-darken2);
    }
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
  .v-dialog {
    overflow: hidden;
    background: var(--v-background-base);
    @include flexbox;
    .v-card {
      min-height: 0;
      background: var(--v-background-base);

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

// .helpImgDiv {
//   position: relative;
//   height: 100px;
// }

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
