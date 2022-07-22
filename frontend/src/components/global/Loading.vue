<template>
  <div id="content" ref="content">
    <div id="slot" ref="slot">
      <slot />
    </div>
    <div
      id="holder"
      class="disabled"
      :class="{ centered: centered }"
      ref="holder"
      :style="`--background: ${background}`"
    >
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
      loading: false,
      nextProps: null,
    };
  },
  props: {
    action: Function, //returns promise
    background: String,
    centered: {
      type: Boolean,
      default: false,
    },
    isActive: Boolean,
  },
  methods: {
    invoke(props) {
      if (this.loading) this.nextProps = props;
      else this.executeSequence(props);
    },
    executeSequence(props) {
      console.log("started");
      // const scrollHeight = 20;
      const slot = this.$refs.slot;
      const holder = this.$refs.holder;
      const icons = this.$refs.icon;

      const enable = () =>
        new Promise((res) => {
          Promise.resolve()
            // .then(
            //   () => new Promise((res) => this.waitUntilSlotCreated(slot, res))
            // )
            .then(() => {
              console.log("enable start");
              this.toggleClass(holder, "disabled", false);
              icons.forEach((i) => this.toggleClass(i, "animated", true));
              return this.setProperty(slot, "opacity", 0, true);
            })
            .then(() => this.setProperty(slot, "height", 0, true))
            .then(() => {
              console.log("enable finished");
              res();
            });
        });
      const emit = (val) =>
        new Promise((res) => {
          console.log("emiting...");
          // console.log(val);
          this.$emit("callback", val);
          setTimeout(() => res(), 0);
        });
      const disable = () =>
        new Promise((res) => {
          Promise.resolve()
            .then(() => {
              console.log("disable start");
              const height =
                Array.from(slot.children).reduce(
                  (val, el) => val + el.offsetHeight,
                  0
                ) + "px";
              // slot.children[0].clientHeight + scrollHeight + "px";
              return this.setProperty(slot, "height", height, true);
            })
            .then(() => {
              this.toggleClass(holder, "disabled", true, true).then(() =>
                icons.forEach((i) => this.toggleClass(i, "animated", false))
              );
              return this.setProperty(slot, "opacity", 1, true);
            })
            .then(() => {
              console.log("disable finished");
              res();
            });
        });
      const check = (val) =>
        new Promise((res, rej) => {
          console.log("checking for next prop...");
          if (this.nextProps == null) res(val);
          else {
            console.log("found new prop:" + this.nextProps);
            let currentProps = this.nextProps;
            this.nextProps = null;
            rej(currentProps);
          }
        });

      this.loading = true;
      Promise.allSettled([this.action(props), enable()])
        .catch((e) => console.warn(e))
        .then((val) => val[0].value)
        .then(check)
        .catch(this.action)
        .then(emit)
        .then(disable)
        .then(check)
        .catch(this.executeSequence)
        .finally(() => (this.loading = false));
    },

    toggleClass(el, clazz, val, wait = false) {
      return new Promise((res) => {
        let stop = el.classList.contains(clazz) === val;
        el.classList.toggle(clazz, val);
        if (stop || !wait) res();
        el.addEventListener("transitionend", () => res(), { once: true });
      });
    },
    setProperty(el, prop, val, wait = false) {
      return new Promise((res, rej) => {
        let stop = el.style[prop] === val;
        el.style[prop] = val;
        if (stop || !wait) res();

        el.addEventListener("transitionend", () => res(), { once: true });
        setTimeout(() => {
          rej();
        }, 500);
        // !!!!!! TO-DO
      }).catch((r) => {
        console.log("Transition wasn't ended");
        return r;
      });
    },
    // waitUntilSlotCreated(slot, res) {
    //   console.log(slot.style.opacity != "");
    //   console.log(slot.style.opacity);
    //   console.log(slot);
    //   slot.style.opacity = 1;
    //   console.log("opacity === 1");
    //   if (slot.style.opacity != "") return res();
    //   setTimeout(() => this.waitUntilSlotCreated(slot, res), 1000);
    // },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/mixins.scss";
#content {
  position: relative;
}

#slot {
  transition: all 400ms ease-in-out;
  overflow: auto;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  $min-height: 100px;
  min-height: $min-height;
  height: $min-height;
  max-height: 100vh;
  @media (pointer: none), (pointer: coarse) {
    scrollbar-width: none !important;
    &::-webkit-scrollbar {
      width: 0 !important;
      height: 0 !important;
    }
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

  transform-origin: center;
  @include box-size(5em);
  @include flexbox();

  transition: all 600ms ease;
  &.disabled {
    transform: translateX(-50%) scale(0.5);
    opacity: 0;
  }
  &.centered {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    &.disabled {
      transform: translate(-50%, -50%) scale(0);
    }
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
