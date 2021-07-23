<template>
  <div id="swipable" :style="backgroundColor" ref="swipable">
    <div
      class="bubble"
      :class="{ dropBubble: current === index }"
      :style="getStyles(index)"
      v-for="(bubble, index) in bubbles"
      :key="index"
      :id="`bubble${index}`"
      :ref="`bubble${index}`"
    >
      <i></i>
      <p>
        {{ bubbles[index].txt }}
      </p>
      <div
        class="miniBubble"
        :id="`${index}-mini-${miniIndex}`"
        v-for="(i, miniIndex) in miniBubbles"
        :key="miniIndex"
      ></div>
    </div>

    <ImgAppeaering :img="bubbles[this.current].img" />

    <div id="radioButtons">
      <RadioButton
        v-for="(bubble, index) in bubbles"
        :key="index"
        :value="index"
        v-model="current"
        :ref="`radio${index}`"
      />
    </div>
    <NavButtons
      v-if="!$mb.isMobileInput()"
      offset="10vw"
      @click="
        (val) => {
          swipeXY.x += val * 50;
          touchend();
        }
      "
    />
  </div>
</template>

<script>
import ImgAppeaering from "@/components/global/layouts/bubbleLayout/ImgAppeaering.vue";
import NavButtons from "@/components/global/NavButtons.vue";
import RadioButton from "@/components/global/RadioButton.vue";

export default {
  components: {
    ImgAppeaering,
    NavButtons,
    RadioButton,
  },
  props: {
    title: String,
    bubbles: Array,
    color: String,
    imgSize: Number,
  },
  data() {
    return {
      current: 0,
      swipeXY: { x: 0, y: 0 },
      bubbleSize: 200,
      maxMiniBubbleSize: 100,
      transition: 600,
      miniBubbles: 5,
      dropBubble: 500,
      dropSmallBubble: 50,
    };
  },
  mounted() {
    document.addEventListener("touchend", this.touchend);
    this.$nextTick(() => {
      this.$mb.addSwipeListener(this.swipe, this.$refs.swipable);
    });
    document.styleSheets[0].insertRule(`:root{
      --delay: ${this.transition}ms;
      --bubbleSize: ${this.bubbleSize}px;
      --dropBubble: ${this.dropBubble}ms;
      }`);
  },
  beforeDestroy() {
    document.removeEventListener("touchend", this.touchend);
  },
  computed: {
    currentBubble() {
      return this.$refs[`bubble${this.current}`][0];
    },
    backgroundColor() {
      var color = this.color ?? "secondary";
      if (!color.includes("-")) color += "-base";
      color = getComputedStyle(document.documentElement).getPropertyValue(
        `--v-${color}`
      );
      return `--color: ${color};`;
    },
  },
  methods: {
    getStyles(index) {
      if (this.current === this.bubbles.length - 1 && index === 0)
        return `opacity: 0; left: 110%;`;
      if (this.current === 0 && index === this.bubbles.length - 1)
        return `opacity: 0; left: -10%;`;
      if (index < this.current) return `opacity: 0; left: -10%; `;
      if (index === this.current) return `left: 50%;`;

      return `opacity: 0; left: 110%;`;
    },
    swipe(e) {
      this.swipeXY = e;
      this.currentBubble.style.transition = "all 0ms";
      this.currentBubble.style.transform = `translate(calc(-50% + ${-this
        .swipeXY.x}px),-50%)`;
    },
    touchend() {
      this.currentBubble.style.transition = `all ${this.transition}ms`;
      this.currentBubble.style.transform = "translate(-50%,-50%)";

      if (this.swipeXY.x > 30) {
        if (this.current < this.bubbles.length - 1) {
          this.current++;
        } else {
          this.current = 0;
        }
      } else if (this.swipeXY.x < -30) {
        if (this.current > 0) {
          this.current--;
        } else {
          this.current = this.bubbles.length - 1;
        }
      }

      this.currentBubble.style.transition = `all ${this.transition}ms`;
      this.swipeXY.x = 0;

      this.miniBubblesParams();
    },

    async miniBubblesParams() {
      // setTimeout(() => {
      await new Promise((res) =>
        setTimeout(() => res(), this.transition + this.dropBubble)
      );

      for (let i = 0; i < this.miniBubbles; i++) {
        let size =
          (Math.random() * this.maxMiniBubbleSize) / 2 +
          this.maxMiniBubbleSize / 2;

        let halfWidth = (this.bubbleSize - this.maxMiniBubbleSize) / 2;

        let leftObj = this.calcLeft(halfWidth);
        let topObj = this.calcTop(leftObj.base, halfWidth);

        document.getElementById(
          `${this.current}-mini-${i}`
        ).style = `width: ${size}px; height: ${size}px; left: ${halfWidth +
          leftObj.total}px; top: ${halfWidth + topObj.total}px;`;
        // this.dropSmallBubble
        await new Promise((res) =>
          setTimeout(() => res(), this.dropSmallBubble)
        );
      }
      // }, this.transition + this.dropBubble);
    },

    calcLeft(halfWidth) {
      var sum = Math.random() * halfWidth;
      var total = 0;

      let zeroOrOne = Math.round(Math.random());

      if (zeroOrOne === 1) {
        sum *= -1;
        total = sum - (Math.random() * this.maxMiniBubbleSize) / 2;
      } else {
        total = sum + (Math.random() * this.maxMiniBubbleSize) / 2;
      }

      return {
        base: sum,
        total: total,
      };
    },
    calcTop(left, halfWidth) {
      var sum = Math.sqrt(Math.pow(halfWidth, 2) - Math.pow(left, 2));
      var total = 0;

      let zeroOrOne = Math.round(Math.random());

      if (zeroOrOne === 1) {
        sum *= -1;
        total = sum - (Math.random() * this.maxMiniBubbleSize) / 2;
      } else {
        total = sum + (Math.random() * this.maxMiniBubbleSize) / 2;
      }

      return {
        base: sum,
        total: total,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

#swipable {
  width: 100vw;
  height: 100vh;
  position: relative;
  //   background: red;
  background-color: var(--color);
}

.bubble {
  --p: 15px; /* padding */

  // @include box-size(200px); // !!!!!!!!!here

  width: var(--bubbleSize);
  height: var(--bubbleSize);

  background: var(--v-accent-base);
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: all var(--delay) linear;
  text-align: center;
  z-index: 3;

  // box-shadow: 1px 2px 8px 3px red;

  &.dropBubble {
    animation: dropBubble var(--dropBubble) var(--delay) ease-out both;
  }

  @keyframes dropBubble {
    0% {
      transform: scale(1) translate(-50%, -50%);
    }
    80% {
      transform: scale(1.1) translate(-50%, -50%);
    }
    100% {
      transform: scale(1) translate(-50%, -50%);
    }
  }

  p {
    margin: auto 0;
    width: 100%;
    height: 100%;
    color: var(--v-secondary-base);
    z-index: 3;
  }

  i,
  &::before {
    content: "";
    float: left;
    height: 100%;
    width: 50%;
    shape-outside: radial-gradient(
      farthest-side at right,
      transparent calc(100% - var(--p)),
      #fff 0
    );

    // background: red;
  }
  i {
    float: right;
    shape-outside: radial-gradient(
      farthest-side at left,
      transparent calc(100% - var(--p)),
      #fff 0
    );
    // background: green;
  }
  .miniBubble {
    position: absolute;
    left: 0;
    top: 0;
    background: var(--v-accent-base);
    border-radius: 50%;
    z-index: -1;

    // box-shadow: 1px 2px 8px 3px red;
  }
}

#radioButtons {
  position: absolute;
  @include flexbox();
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}
</style>
