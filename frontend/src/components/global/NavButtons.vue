<template>
  <div>
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
</template>

<script>
export default {
  methods: {
    btnIsPressed(event) {
      const btn = event.currentTarget;
      switch (btn.getAttribute("action")) {
        case "next":
          //   this.current--;
          this.$root.$emit("currentChange", -1);
          break;
        case "previous":
          //   this.current++;
          this.$root.$emit("currentChange", 1);
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
  },
  mounted() {
    this.$refs.btn.forEach((btn) =>
      btn.addEventListener("click", this.btnIsPressed)
    );
  },
  beforeDestroy() {
    this.$refs.btn.forEach((btn) =>
      btn.removeEventListener("click", this.btnIsPressed)
    );
  },
};
</script>

<style lang="scss" scoped>
// $max-width-buttons: 1260px;

$nav-btn-size: 4rem;
$buttons-size: 0.6;
$nav-btn-hover-offset: 0.6rem;

#nav-buttons {
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
      color: var(--v-accent-base);
      top: 0;
      text-align: center;
      opacity: 0.8;
      transition-property: transform opacity;
      transition-duration: 0.5s;
      transition-timing-function: ease-in-out;
      user-select: none;
    }
    &[action="previous"]::after {
      content: "\002039";
      transform: scale($buttons-size) translateX($nav-btn-hover-offset);
    }

    &[action="next"]::after {
      content: "\00203A";
      transform: scale($buttons-size) translateX(-$nav-btn-hover-offset);
    }
    &:hover::after {
      transform: scale(0.6) translateX(0);
      opacity: 1;
    }
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
