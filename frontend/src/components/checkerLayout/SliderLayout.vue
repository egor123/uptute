<template>
  <div id="main">
    <div id="container">
      <h1 v-animate="'fadeIn'">{{ title }}</h1>
      <div v-animate="'fadeIn'" id="content">
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
      <div v-animate="'slideInFromBottom'" id="radio-butttons">
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
      <div id="nav-buttons" v-for="i in 1" :key="i">
        <button
          v-animate="'slideInFromLeft'"
          action="previous"
          class="btn"
          ref="btn"
        />
        <button
          v-animate="'slideInFromRight'"
          action="next"
          class="btn"
          ref="btn"
        />
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

    this.$refs.btn.forEach((btn) =>
      btn.addEventListener("click", this.btnIsPressed)
    );
  },
  beforeDestroy() {
    this.$refs.btn.forEach((btn) =>
      btn.removeEventListener("click", this.btnIsPressed)
    );
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
    btnIsPressed(event) {
      const btn = event.currentTarget;
      switch (btn.getAttribute("action")) {
        case "next":
          this.current--;
          break;
        case "previous":
          this.current++;
          break;
      }
      const ripple = document.createElement("div");
      const d = btn.clientWidth;
      const r = d / 2;
      const rect = btn.getBoundingClientRect();
      ripple.style.width = ripple.style.height = `${d}px`;
      ripple.style.left = `${event.clientX - (rect.left + r)}px`;
      ripple.style.top = `${event.clientY - (rect.top + r)}px`;
      ripple.classList.add("ripple");
      btn.appendChild(ripple);
      setTimeout(
        () => ripple.remove(),
        getComputedStyle(ripple).animationDuration.replace("s", "") * 1000
      );
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
$max-width-padding: 500px;
$max-width-buttons: 1260px;
$buttons-offset: 1rem;
$buttons-size: 0.6;

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
    color: rgba($color: #000000, $alpha: 0.03);
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
          color: rgba($color: #000000, $alpha: 0.04);
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
        color: rgba($color: #000000, $alpha: 0.1);
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
  .btn {
    display: flex;
    position: absolute;
    overflow: hidden;
    font-size: $nav-btn-size;
    height: 1em;
    width: 1em;
    top: 40%;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    z-index: 99;
    &::after {
      top: 0;
      text-align: center;
      opacity: 0.3;
      transition-property: transform opacity;
      transition-duration: 0.6s;
      transition-timing-function: ease-in-out;
      user-select: none;
    }
    &[action="previous"] {
      left: 0;
      &::after {
        content: "\002039";
        transform: translateX($buttons-offset) scale($buttons-size);
      }
    }
    &[action="next"] {
      right: 0;
      &::after {
        content: "\00203A";
        transform: translateX(-$buttons-offset) scale($buttons-size);
      }
    }
    &:hover::after {
      transform: scale(0.6) translateX(0);
      opacity: 0.35;
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
<style lang="scss">
.ripple {
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  background-color: rgba($color: #000000, $alpha: 0.03);
  animation: ripple 1s ease-in;
}
@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
</style>
