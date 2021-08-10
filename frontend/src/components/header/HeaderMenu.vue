<template>
  <v-menu
    offset-y
    open-on-hover
    hide-on-scroll
    transition="scale-transition"
    origin="top center"
    attach="#title"
  >
    <template v-slot:activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on" id="title">
        <!-- !!!!!!!!!!! -->
        <slot name="title" />
      </div>
    </template>
    <v-list
      :style="
        `--color: ${color}; 
        --textColor: ${textColor}; 
        --borderRadius: ${borderRadius}; 
        --border: ${border}`
      "
    >
      <!-- !!!!!!!!!!! -->
      <slot name="content" />
    </v-list>
  </v-menu>
</template>

<script>
export default {
  props: {
    color: String,
    textColor: String,
    borderRadius: String,
    border: String,
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

#title {
  height: 100%;
  width: max-content;
  cursor: default;
  @include flexbox();
  padding: 0.5rem 1rem;
  margin: 0 auto;

  color: var(--v-accent-base) !important;
  font-weight: 500;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 3px;
}

.v-menu__content {
  box-shadow: none;
  border-radius: 0px;
  transition: all 0.3s !important;
  .v-list {
    background: var(--color) !important;
    border-radius: var(--borderRadius);
    border: var(--border);
  }
}

::v-deep {
  .v-list-item > * {
    margin: 0;

    width: 100%;
    .v-btn {
      border-radius: 50px;
      width: 100%;
      color: var(--textColor) !important;
      text-transform: none;
      img {
        margin-right: 10px;
        @include box-size(1.5rem);
        color: var(--v-accent-base);
      }
    }
  }
}
</style>
