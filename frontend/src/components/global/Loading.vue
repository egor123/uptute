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
  data() {
    return {
      transition: false,
      nextAction: null,
    };
  },
  props: {
    loading: Boolean,
    background: String,
  },
  computed: {
    slot: function() {
      return this.$refs.slot;
    },
    holder: function() {
      return this.$refs.holder;
    },
  },
  methods: {
    async enable() {
      console.log("enable start");
      this.transition = true;
      this.nextAction = null;
      await new Promise((res) => setTimeout(() => res(), 0));
      this.holder.classList.toggle("disabled", false);
      this.enableIconAnim(true);
      this.slot.style.opacity = 0;
      await this.transitionEnd(this.slot);
      this.$emit("opacity0");
      this.slot.style.height = 0;
      await this.transitionEnd(this.slot);
      console.log("enable finish");
      if (this.nextAction != this.enable) this.nextAction?.call();
      this.transition = false;
    },
    async disable() {
      console.log("disable start");
      this.transition = true;
      this.nextAction = null;
      // const slot = this.$refs.slot;
      // const holder = this.$refs.holder;
      await new Promise((res) => setTimeout(() => res(), 0));
      let slotHeight = this.slot.children[0].clientHeight;
      this.slot.style.height = slotHeight + "px";
      await this.transitionEnd(this.slot);
      this.toggleTransition(this.holder, "disabled", true).then(() =>
        this.enableIconAnim(false)
      );
      this.slot.style.opacity = 1;
      await this.transitionEnd(this.slot);
      console.log("disable finish");
      if (this.nextAction != this.disable) this.nextAction?.call();
      this.transition = false;
    },
    toggleTransition(el, transitionClass, bool) {
      el.classList.toggle(transitionClass, bool);
      return this.transitionEnd(el);
    },
    transitionEnd(el) {
      return new Promise((res) =>
        el.addEventListener("transitionend", () => res(), {
          once: true,
        })
      );
    },
    enableIconAnim(val) {
      this.$refs.icon.forEach((icon) => icon.classList.toggle("animated", val));
    },
    state(val) {
      if (this.transition) {
        this.nextAction = val ? this.enable : this.disable;
        console.log("add next action " + this.nextAction.name);
      } else if (val) this.enable();
      else this.disable();
    },
  },
  watch: {
    loading: function(val) {
      this.state(val);
    },
  },
  mounted() {
    this.state(this.loading);
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/mixins.scss";
#content {
  position: relative;
  // min-height: 100px;
}

#slot {
  transition: all 2s ease;
  overflow: hidden;
  $min-height: 100px;
  min-height: $min-height;
  height: $min-height;
  opacity: 0.5;
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
