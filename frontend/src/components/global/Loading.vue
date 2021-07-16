<template>
  <div id="content">
    <div id="slot" ref="slot">
      <slot />
    </div>
    <div id="holder" ref="holder">
      <v-icon class="icon animated" v-for="i in 4" :key="i" ref="icon"
        >mdi-water</v-icon
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: Boolean,
  },
  methods: {
    async enable() {
      this.$refs.holder.classList.toggle("disabled", false);
      this.$refs.slot.classList.toggle("disabled", true);
      this.enableIconAnim(true);
    },
    async disable() {
      await this.waitIconAnim();
      this.enableIconAnim(false);
      this.$refs.holder.classList.toggle("disabled", true);
      this.$refs.slot.classList.toggle("disabled", false);
    },
    waitIconAnim() {
      return new Promise((res) =>
        this.$refs.icon[0].$el.addEventListener(
          "animationiteration",
          () => res(),
          { once: true }
        )
      );
    },
    enableIconAnim(val) {
      this.$refs.icon.forEach((icon) =>
        icon.$el.classList.toggle("animated", val)
      );
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
  $color: white;
  border-radius: 50%;
  border: 3px var(--v-accent-base) solid;
  font-size: 15px;
  position: absolute;
  left: 50%;
  top: 0.5em;
  transform: translateX(-50%);
  @include box-size(5em);
  @include flexbox();
  background: $color;
  transition: transform 1s ease;
  &.disabled {
    transform: translateX(-50%) scale(0);
  }
  .icon {
    position: absolute;
    color: var(--v-accent-base);
    font-size: 3em;
    @media screen and (-webkit-min-device-pixel-ratio: 0) {
      -webkit-text-stroke-width: 1px;
      -webkit-text-stroke-color: $color;
    }
    @media not screen and (-webkit-min-device-pixel-ratio: 0) {
      //?????????
      text-shadow: -1px 0 $color, 0 1px $color, 1px 0 $color, 0 -1px $color;
    }
    $offset-x: 35%;
    $offset-y: 23%;
    $scale: 0.2;
    $duration: 1s;
    $transforms: translate(-$offset-x, $offset-y) scale(0),
      translate(-$offset-x, $offset-y) scale(1-$scale), translate(0, 0) scale(1),
      translate($offset-x, -$offset-y) scale(1 + $scale),
      translate($offset-x, -$offset-y) scale(0);

    @for $i from 1 to length($transforms) {
      &:nth-child(#{$i}) {
        transform: nth($transforms, $i + 1);
        &.animated {
          @if $i == length($transforms)-1 {
            z-index: 1;
          } @else {
            z-index: 2;
          }
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