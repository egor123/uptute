<template>
  <div id="main">
    <div id="container">
      <h1 v-animate="'fadeIn'">{{ title }}</h1>
      <div v-animate="'fadeIn'" id="content" ref="content">
        <div
          class="element boxShadow"
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
        <RadioButton
          v-for="(c, i) in elements"
          :key="i"
          :value="i"
          v-model="current"
          :ref="`radio${i}`"
        />
      </div>
      <NavButtons
        v-if="!$mb.isMobileInput()"
        offset="10vw"
        @click="(val) => (current += val)"
      />
    </div>
  </div>
</template>

<script>
import NavButtons from "@/components/global/NavButtons.vue";
import RadioButton from "@/components/global/RadioButton.vue";

export default {
  components: {
    NavButtons,
    RadioButton,
  },
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
    this.$mb.addSwipedListener(this.swipe, this.$refs.content);
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
        this.setStyles();
      },
    },
  },
  methods: {
    swipe(data) {
      if (data === "left") this.current--;
      if (data === "right") this.current++;
    },
    setActive(val) {
      for (var i = 0; i < this.total; i++)
        this.$refs[`radio${i}`][0].$el.querySelector("input").disabled = !val;
      this.enabled = val;
    },
    getImgUrl(img) {
      return require(`@/assets/icons/${img}.svg`);
    },
    setStyles(transition = true) {
      let c = this.currentValue;
      this.setActive(false);
      setTimeout(() => {
        this.setActive(true);
        if (c != this.currentValue) this.setStyles();
      }, 600);
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
        if (i === c) element.style.cursor = "default";
        else element.style.cursor = "pointer";
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
$element-height: max-content;

$max-width-buttons: 900px;
$buttons-offset: calc(50vw - 450px);
$buttons-offset-at-900px: 5%;

$background: var(--v-header-base);

#main {
  padding: $vertical-padding 0; //var(--side-margin)
  background: $background;
  @media (max-width: $max-width-padding) {
    padding: $vertical-padding 1rem;
  }
  position: relative;
  #container {
    position: relative;
    background: #ffffff00; //!!
    display: flex;
    align-items: center;
    flex-direction: column;
  }
}

#radio-buttons {
  display: flex;
  flex-direction: row;
  margin-top: 15px;
}

#content {
  width: 100vw;
  background: #ffffff00; //!!

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
    border-radius: 15px;
    padding: 1em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    backdrop-filter: blur(2px);

    transition: box-shadow 300ms ease-in-out;
    img {
      margin: 1rem 0;
    }
    &.transition {
      transition: transform 0.6s ease-in-out, box-shadow 300ms ease-in-out; //????
    }
    &:hover {
      box-shadow: 1px 2px 5px 1px var(--v-secondary-darken1);
    }
  }
  &::after {
    background: #ffffff00; //!!!!
    content: "";
    position: absolute;
    pointer-events: none;
    width: 100%;
    height: 100%;
    z-index: 99;
    box-shadow: inset 0px 0px 1rem 1rem $background;
  }
}
</style>
