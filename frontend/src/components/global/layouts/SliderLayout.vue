<template>
  <div id="main">
    <div id="container">
      <h1 v-animate="'fadeIn'">{{ title }}</h1>
      <div v-animate="'fadeIn'" id="content" ref="swipable">
        <div
          class="element"
          v-for="(element, i) in elements"
          :key="i"
          :ref="`element${i}`"
          v-on:click="current = i"
        >
          <p>{{ element.txt }}</p>
          <img
            :width="imageSize"
            :height="imageSize"
            :src="getImgUrl(element.img)"
          />
        </div>
      </div>
      <div v-animate="'slideInFromBottom'" id="radio-buttons">
        <input
          type="radio"
          name="radio"
          v-for="(c, i) in elements"
          :key="i"
          :value="i"
          v-model="current"
          :ref="`radio${i}`"
        />
      </div>
      <NavButtons v-if="!$mb.isMobileInput()" />
    </div>
  </div>
</template>

<script>
import NavButtons from "@/components/global/NavButtons.vue";
import { bus } from "@/main.js";

export default {
  components: {
    NavButtons,
  },
  data() {
    return {
      SwipeX: 0,
      currentValue: 0,
      total: Number,
      enabled: true,
    };
  },
  props: {
    elements: Array,
    title: String,
  },
  created() {
    if (this.elements.length % 2 === 0)
      this.elements.push({ txt: "", img: "happiness" });
  },
  mounted() {
    this.total = this.elements.length;
    this.setStyles(false);
    bus.$on("currentChange", (data) => {
      this.current += data;
    });
    document.addEventListener("touchend", this.touchend);
    this.$nextTick(() => {
      this.$mb.addSwipeListener(this.swipe, this.$refs.swipable);
    });
  },
  computed: {
    imageSize() {
      return this.imgSize ?? 100;
    },
    current: {
      get: function() {
        return this.currentValue;
      },
      set: function(value) {
        if (!this.enabled) return;
        this.currentValue = value;
        if (this.current < 0) this.currentValue = this.total - 1;
        else if (this.current >= this.total) this.currentValue = 0;
        this.setActive(false);
        setTimeout(() => {
          this.setActive(true);
        }, 600);
        this.setStyles();
      },
    },
  },
  methods: {
    swipe(e) {
      this.SwipeX = e.x;
    },
    touchend() {
      if (this.SwipeX > 30) {
        this.current++;
      } else if (this.SwipeX < -30) {
        this.current--;
      }
    },
    setActive(val) {
      for (var i = 0; i < this.total; i++)
        this.$refs[`radio${i}`][0].disabled = !val;
      this.enabled = val;
    },
    getImgUrl(img) {
      return require(`@/assets/icons/${img}.svg`);
    },
    setStyles(transition = true) {
      for (var i = 0; i < this.total; i++) {
        const element = this.$refs[`element${i}`][0];
        var position = i - this.current;

        const maxPosition = Math.round(this.total / 2);
        const offset = Math.abs(position) - maxPosition + 1;
        if (offset > 0) {
          if (position > 0) position = offset - maxPosition;
          else position = maxPosition - offset;
        }

        element.style.zIndex = -(Math.abs(position) - this.total);

        const distance = Math.abs(position);

        element.classList.toggle("transition", transition);
        element.style.transform = `perspective(200px) translate3d(${position *
          330}px, 0, ${distance * -120}px)`;
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/styles.scss";

$max-width-padding: 500px;

$vertical-padding: 15rem;

$content-height: 22rem;

$element-width: 24ch;
$element-height: 27ch;

// $radio-size: 2rem;
// $radio-margin: 0.5rem;

$max-width-buttons: 900px;
$buttons-offset: calc(50vw - 450px);
$buttons-offset-at-900px: 5%;

#main {
  padding: $vertical-padding 0; //var(--side-margin)
  @media (max-width: $max-width-padding) {
    padding: $vertical-padding 1rem;
  }
  #container {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
}

#radio-buttons {
  display: flex;
  flex-direction: row-reverse;
  margin-top: 15px;
}

::v-deep #nav-buttons {
  @media (max-width: $max-width-buttons) {
    display: none;
  }
  [action="previous"] {
    left: $buttons-offset;
    @media (max-width: 900px) {
      left: $buttons-offset-at-900px;
    }
  }
  [action="next"] {
    right: $buttons-offset;
    @media (max-width: 900px) {
      right: $buttons-offset-at-900px;
    }
  }
}

#content {
  width: 100vw;
  height: $content-height;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  & > * {
    position: absolute;
    width: $element-width;
    height: $element-height;
    border-radius: 0.5em;
    padding: 1em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    backdrop-filter: blur(2px);
    background-color: rgba($color: #000000, $alpha: 0.015);
    &.transition {
      transition: 0.6s transform ease-in-out;
    }
    &:hover {
      box-shadow: 0px 0px 16px 2px var(--v-secondary-darken1);
    }
  }
  &::after {
    content: "";
    position: absolute;
    pointer-events: none;
    width: 100%;
    height: 100%;
    z-index: 99;
    box-shadow: inset 0px 0px 1rem 1rem white;
  }
}
</style>
