<template>
  <v-dialog v-model="showDialog">
    <template v-slot:activator="{ on, attrs }">
      <div class="activator" v-bind="attrs" v-on="on">
        <slot name="object" />
      </div>
    </template>

    <v-card class="card">
      <div ref="start" />
      <v-card-title id="cardTitle" class="justify-center text-h5 background">
        <button class="cross" @click="crossClick()">
          <v-icon class="backIcon">
            mdi-close
          </v-icon>
        </button>

        <slot name="title" />
      </v-card-title>

      <v-card-text id="cardText">
        <slot name="text" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      showDialog: false,
    };
  },
  props: {
    toComments: Boolean,
  },
  created() {
    this.showDialog = this.toComments;
  },
  methods: {
    crossClick() {
      this.showDialog = false;
    },
  },
  watch: {
    toComments: function(val) {
      this.showDialog = val;
    },
    showDialog: function() {
      console.log(this.showDialog);
      if (this.showDialog === true) {
        this.$root.$emit("dialogOpened");
        this.$nextTick(() => {
          this.$refs.start.scrollIntoView({ block: "start" });
        });
      } else {
        this.$root.$emit("dialogClosed");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

#cardText {
  padding: 2rem;
  background: var(--v-background-base);
}

[role="button"] {
  height: max-content;
}

::v-deep {
  .v-dialog {
    scrollbar-width: none;
  }
  .v-card {
    // overflow-x: hidden;
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

.cross {
  position: absolute;
  top: 9px;
  right: 9px;
  @include box-size(max-content);
  @include flexbox;

  &:hover .backIcon {
    transform: rotate(-180deg) scale(0.8);
  }
  .backIcon {
    color: var(--v-accent-base);
    // padding: 5px;
    z-index: 11;
    transition: all 500ms;
  }
}
</style>
