<template>
  <div id="main" ref="block" :style="backgroundColor">
    <h1 v-animate="'fadeIn'" id="title" v-if="title">{{ title }}</h1>

    <div class="row" ref="row" v-for="(row, i) in rows" :key="i">
      <div class="rowCard">
        <div
          class="rowInner"
          ref="rowInner"
          v-animate="'slideInFromBottom'"
          :inversed="isInvesed(i)"
        >
          <div class="text-field">
            <h2>{{ row.title }}</h2>
            <p>{{ row.txt }}</p>
          </div>
          <div class="image-field">
            <img
              :width="imageSize"
              :height="imageSize"
              :src="getImgUrl(row.img)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { scrolled } from "@/plugins/utilityMethods";

export default {
  props: {
    title: String,
    rows: Array,
    inversed: Boolean,
    color: String,
    imgSize: Number,
  },
  computed: {
    imageSize() {
      return this.imgSize ?? 100;
    },
    backgroundColor() {
      var color = this.color ?? "secondary";
      if (!color.includes("-")) color += "-base";
      color = getComputedStyle(document.documentElement).getPropertyValue(
        `--v-${color}`
      );
      return `--color: ${color};`;
    },
  },
  mounted() {
    window.addEventListener("scroll", () =>
      scrolled({ cards: this.$refs.row })
    );
  },
  beforeDestroy() {
    window.removeEventListener("scroll", () =>
      scrolled({ cards: this.$refs.row })
    );
  },
  methods: {
    isInvesed(index) {
      return (index % 2 == this.inversed).toString();
    },
    getImgUrl(img) {
      return require(`@/assets/icons/${img}.svg`);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/mixins.scss";

$max-width: 800px;

$element-width: 28ch;
$element-height: 12ch;
$spacing-width: 15ch;
$spacing-height: 0ch;

$padding: 15rem 10vw;
$title-margin-bottom: 2rem;

#main {
  padding: $padding;
  background-color: var(--color);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // gap: var(--vertical-margin);
}
#title {
  color: var(--v-accent-base);
  margin-bottom: $title-margin-bottom;
}
.row {
  @include box-size(fit-content);
  padding: 1rem 0;
  // transform: scale(1);

  // &.raised {
  //   @include box-shadow-raised();
  //   transform: scale(1.08);
  // }
  .rowCard {
    padding: 3rem 1rem;
    @include box-shadow();
    border-radius: 15px;

    .rowInner {
      display: grid;
      grid-auto-rows: max-content;
      @include box-size(100%);
      .text-field {
        grid-area: text;
        text-align: left;
        hyphens: auto;
        h2 {
          text-align: center;
          margin-bottom: 0.8em;
        }
        p {
          text-align: center;
          margin-bottom: 0;
        }
      }
      grid-template-columns: $element-width;
      grid-template-rows: auto;
      grid-template-areas: "text" "image";
      gap: $spacing-height;
      @media (min-width: $max-width) {
        grid-template-columns: $element-width $spacing-width $element-width;
        gap: 0px;
        &[inversed="false"] {
          grid-template-areas: "text . image";
        }
        &[inversed="true"] {
          grid-template-areas: "image . text";
        }
      }
    }
  }
  .image-field {
    grid-area: image;
    margin: auto;
    padding: 1rem 0;
  }
}
</style>

