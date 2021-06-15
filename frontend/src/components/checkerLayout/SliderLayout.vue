<template>
  <div id="main">
    <div id="container">
      <h1>{{ title }}</h1>
      <div id="content">
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
      <div id="radio-butttons">
        <label class="radio" v-for="(c, i) in elements" :key="i">
          <span class="radio-input">
            <input
              type="radio"
              name="radio"
              :value="i"
              v-model="current"
              :ref="`radio${i}`"
            />
            <span class="radio-control"></span>
          </span>
        </label>
      </div>
      <div id="nav-buttons">
        <button
          type="button"
          id="button-previous"
          ref="previousButton"
          v-on:click="current--"
        >
          &#8249;
        </button>
        <button
          type="button"
          id="button-next"
          ref="nextButton"
          v-on:click="current++"
        >
          &#8250;
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
          250}px, 0, ${distance * -50}px)`;
      }
    },
  },
};
</script>

<style scoped lang="scss">
$max-width-padding: 500px;
$max-width-buttons: 1260px;

$vertical-padding: 15rem;

$content-height: 22rem;

$element-width: 24ch;
$element-height: 27ch;

$nav-btn-size: 4rem;

$radio-size: 2rem;
$radio-margin: 0.5rem;
#main {
  padding: $vertical-padding var(--side-margin);
  @media (max-width: $max-width-padding) {
    padding: $vertical-padding 1rem;
  }
  h1 {
    color: var(--v-accent-base);
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
#radio-butttons {
  display: flex;
  margin: auto;
  margin-top: 15px;
  .radio {
    font-size: $radio-size;
    color: var(--v-primary-base);
    & + .radio {
      margin-left: $radio-margin;
    }
    .radio-input {
      input {
        display: none;
      }
      .radio-control {
        display: grid;
        place-items: center;
        &:hover,
        &:focus {
          box-shadow: 0 0 0.2em 0.01em currentColor;
        }
      }
      input + .radio-control::before {
        content: "";
        width: 0.5em;
        height: 0.5em;
        box-shadow: inset 0.5em 0.5em currentColor;
        border-radius: 50%;
        transition: 0.2s transform ease-in-out;
        transform: scale(0);
      }
      input:checked + .radio-control::before {
        transform: scale(1);
      }
    }
    .radio-control {
      display: block;
      width: 1em;
      height: 1em;
      border-radius: 50%;
      border: 0.1em solid currentColor;
    }
  }
}
#nav-buttons {
  @media (max-width: $max-width-buttons) {
    display: none;
  }
  #button-previous {
    left: 0;
  }
  #button-next {
    right: 0;
  }
  * {
    position: absolute;
    font-size: $nav-btn-size;
    height: 2em;
    width: 2em;
    top: 40%;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background: radial-gradient(
        circle at center,
        rgba(0, 0, 0, 0.2) 0.2em,
        transparent 0.5em
      );
    }
    &::before {
      content: "";
      position: absolute;
      width: 1em;
      height: 1em;
      box-shadow: inset 1em 1em currentColor;
      border-radius: 50%;
      opacity: 0.2;
      transition: 0.05s transform ease-in-out;
      transform: scale(0);
    }
    &:active:before {
      transform: scale(1);
    }
  }
}
#content {
  width: 100%;
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
    background-color: rgba($color: #000000, $alpha: 0.1);
    border-radius: 0.5em;
    padding: 1em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    @media (min-width: 1000px) {
      backdrop-filter: blur(2px);
      background-color: rgba($color: #000000, $alpha: 0.02);
    }
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
