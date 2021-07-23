<template>
  <div id="nav-buttons">
    <button
      v-animate="'slideInFromLeft'"
      action="previous"
      class="btn"
      ref="btnPrev"
      :style="getStyles()"
      :animated="animated"
    />
    <button
      v-animate="'slideInFromRight'"
      action="next"
      class="btn"
      ref="btnNext"
      :style="getStyles()"
      :animated="animated"
    />
  </div>
</template>

<script>
export default {
  props: {
    offset: String,
    animated: Boolean,
  },
  methods: {
    btnIsPressed(event) {
      const btn = event.currentTarget;
      switch (btn.getAttribute("action")) {
        case "next":
          this.$emit("click", 1);
          break;
        case "previous":
          this.$emit("click", -1);
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
    getStyles() {
      return `--offset: ${this.offset ?? 0}`;
    },
  },
  mounted() {
    this.$refs.btnPrev.addEventListener("click", this.btnIsPressed);
    this.$refs.btnNext.addEventListener("click", this.btnIsPressed);
  },
  beforeDestroy() {
    this.$refs.btnPrev.removeEventListener("click", this.btnIsPressed);
    this.$refs.btnNext.removeEventListener("click", this.btnIsPressed);
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

$nav-btn-size: 4rem;
$buttons-size: 0.6;
$nav-btn-hover-offset: 5px;

.btn {
  z-index: 10;
  position: absolute;
  overflow: hidden;
  font-size: $nav-btn-size;
  @include box-size(1em);
  @include flexbox;
  top: 40%;
  border-radius: 50%;
  &::after {
    color: var(--v-accent-base);
    top: 0;
    text-align: center;
    opacity: 0.8;
    transition-property: transform opacity;
    transition-duration: 0.5s;
    transition-timing-function: ease-in-out;
    user-select: none;
  }
  &[action="previous"] {
    left: var(--offset);
    &[animated] {
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
    &::after {
      content: "\002039";
      transform: scale($buttons-size) translateX($nav-btn-hover-offset);
    }
  }

  &[action="next"] {
    right: var(--offset);
    &[animated] {
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
    &::after {
      content: "\00203A";
      transform: scale($buttons-size) translateX(-$nav-btn-hover-offset);
    }
  }
  &:hover::after {
    transform: scale(0.6) translateX(0);
    opacity: 1;
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
