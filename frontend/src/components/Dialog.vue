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
  background: var(--v-background-base);
}

::v-deep {
  .v-card {
    #cardTitle {
      z-index: 10;
      font-family: Comfortaa !important;
      position: sticky;
      background: var(--v-header-base) !important;
      opacity: 0.7;
      top: 0px;
      border-radius: 15px 15px 0 0;
      width: 100%;
      color: var(--v-primary-base);
      box-shadow: 0px 2px 6px var(--v-secondary-darken1);
      * {
        font-weight: 600;
      }
    }

    & > .v-card__text {
      color: var(--v-primary-lighten3);
    }
  }

  .v-dialog {
    width: 40rem;
    max-width: calc(100vw - 2rem);

    border-radius: 15px;
  }

  .v-sheet.v-card {
    border-radius: 0;
  }

  ::-webkit-scrollbar {
    width: 0px;
  }
}
</style>
