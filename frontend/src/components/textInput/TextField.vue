<template>
  <v-text-field :label="label" filled rounded>
    <template v-if="imgName != null" v-slot:append>
      <img id="zoomImg" width="30" height="30" :src="getImg()" alt="" />
    </template>
  </v-text-field>
</template>

<script>
export default {
  props: {
    label: String,
    imgName: String,
  },
  methods: {
    getImg() {
      return require(`@/assets/icons/${this.imgName}.svg`);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  input {
    border: solid 1px var(--v-background-base);
    border-radius: 15px;

    padding: 0.5rem 0.5rem !important;
    margin: 1rem 0 !important;
  }

  .v-input__slot {
    margin: 0 !important;
    background: white !important;
  }

  .v-text-field__details {
    display: none;
  }

  .v-text-field__slot {
    .v-label {
      color: var(--v-secondary-darken2) !important;
      background: #fff;
      border-radius: 15px;
      overflow: visible;
      padding: 0.3rem;
      margin: 0rem 0 0 0.5rem;

      &--active {
        transform: translate(0, -0.9rem) scale(0.8);
      }
    }
    .v-input__append-inner {
      padding: 0;
      margin: auto 0 auto 0.1rem;
    }
  }
}
</style>
