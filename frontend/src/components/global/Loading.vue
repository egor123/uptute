<template>
  <div id="content">
    <div id="slot" ref="slot">
      <slot />
    </div>
    <div id="holder" ref="holder" :style="`--background: ${background}`">
      <img
        v-for="i in 4"
        :key="i"
        class="flameDropWrapper icon animated"
        ref="icon"
        src="@/assets/icons/one-flame-drop.svg"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: Boolean,
    background: String,
  },
  methods: {
    async enable() {
      this.$refs.holder.classList.toggle("disabled", false);
      this.$refs.slot.classList.toggle("disabled", true);
      this.enableIconAnim(true);
    },
    async disable() {
      this.$refs.holder.classList.toggle("disabled", true);
      this.$refs.slot.classList.toggle("disabled", false);
      this.$root.$emit("loadingEnded");
      await this.waitTransition();
      this.enableIconAnim(false);
    },
    waitTransition() {
      return new Promise((res) =>
        this.$refs.holder.addEventListener("transitionend", () => res(), {
          once: true,
        })
      );
    },
    enableIconAnim(val) {
      this.$refs.icon.forEach((icon) => icon.classList.toggle("animated", val));
    },
  },
  watch: {
    loading: function (val) {
      if (val === true) this.enable();
      else this.disable();
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/mixins.scss";
#content {
  position: relative;
  min-height: 100px;
}

#slot {
  transition: opacity 1s ease;
  &.disabled {
    opacity: 0;
  }
}

#holder {
  $color: var(--background);
  border-radius: 50%;
  font-size: 15px;
  position: absolute;
  left: 50%;
  top: 0.5em;
  transform: translateX(-50%);
  @include box-size(5em);
  @include flexbox();
  transition: all 600ms ease;
  &.disabled {
    transform: translateX(-50%) scale(0.5);
    opacity: 0;
  }

  .icon {
    position: absolute;
    width: 0.8rem !important;
    filter: drop-shadow(2px 0px 0px $color);

    font-size: 3em;
    $start-multiplier: 1.5;
    $duration: 1s;
    $transforms: translate(-84% * $start-multiplier, 38% * $start-multiplier)
        scale(0),
      //-------------------------------------------------//
      translate(-84%, 38%) scale(1, 1),
      //-------------------------------------------------//
      translate(0, 0) scale(1.21, 1.204),
      //-------------------------------------------------//
      translate(95%, -42%) scale(1.52, 1.481),
      //-------------------------------------------------//
      translate(95% / $start-multiplier, -42% / $start-multiplier) scale(0);

    @for $i from 1 to length($transforms) {
      &:nth-child(#{$i}) {
        transform: nth($transforms, $i + 1);
        &.animated {
          z-index: length($transforms)-$i;
          animation: loading-#{$i} $duration infinite;
        }
      }
      @keyframes loading-#{$i} {
        0% {
          transform: nth($transforms, $i);
        }
        100% {
          transform: nth($transforms, $i + 1);
        }
      }
    }
  }
}
</style>
