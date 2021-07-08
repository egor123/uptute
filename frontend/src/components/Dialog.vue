<template>
  <v-dialog>
    <template v-slot:activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on">
        <slot name="object" />
      </div>
    </template>

    <v-card class="card">
      <v-card-title id="cardTitle" class="justify-center text-h5 background">
        <slot name="title" />
      </v-card-title>

      <v-card-text id="cardText">
        <slot name="text" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
#cardText {
  padding: 2rem;
}

::v-deep {
  .v-card {
    #cardTitle {
      font-family: Comfortaa !important;
    }

    & > .v-card__text {
      color: var(--v-primary-lighten3);
    }
  }

  .v-dialog {
    // min-width: 22rem;
    // width: fit-content;
    // max-width: 50rem;
    min-width: fit-content;
    width: 40rem;
    max-width: calc(100vw - 2rem);
    border-radius: 15px;
  }

  .v-sheet.v-card {
    border-radius: 0;
  }

  // ::-webkit-scrollbar-track {
  //   background: #ffffff;
  //   border-radius: 0 15px 15px 0;
  // }

  ::-webkit-scrollbar {
    // background: red;
    // border-radius: 0 15px 15px 0 !important;
    width: 0px;
  }

  // ::-webkit-scrollbar-thumb {
  //   background: var(--v-secondary-darken2);

  //   &:hover {
  //     background: var(--v-secondary-darken3);
  //   }
  // }
}
</style>
