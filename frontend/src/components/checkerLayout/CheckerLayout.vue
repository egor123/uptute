<template>
  <div id="main" :style="backgroundColor">
    <h1 v-animate="'fadeIn'" id="title" v-if="title">{{ title }}</h1>
    <div
      v-animate="'slideInFromBottom'"
      class="row"
      v-for="(row, i) in rows"
      :key="i"
      :inversed="isInvesed(i)"
    >
      <div class="text-field">
        <h2>{{ row.title }}</h2>
        <p>{{ row.txt }}</p>
      </div>
      <div class="image-field">
        <img :width="imageSize" :height="imageSize" :src="getImgUrl(row.img)" />
      </div>
    </div>
  </div>
</template>

<script>
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
$max-width: 800px;

$element-width: 25ch;
$element-height: 12ch;
$spacing-width: 15ch;
$spacing-height: 2ch;

$padding: 15rem 10vw;
$vertical-margin: 10ch;
$title-margin-bottom: 1rem;

#main {
  padding: $padding;
  background-color: var(--color);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: $vertical-margin;
}
#title {
  color: var(--v-accent-base);
  margin-bottom: $title-margin-bottom;
}
.row {
  display: grid;
  grid-auto-rows: $element-height;
  .text-field {
    grid-area: text;
    h2 {
      margin-bottom: 1em;
    }
    p {
      text-align: justify;
    }
  }
  .image-field {
    grid-area: image;
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
</style>
