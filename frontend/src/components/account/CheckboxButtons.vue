<template>
  <AccountSideButtons>
    <div id="sliderDiv">
      <div
        class="checkboxDiv"
        v-for="checkboxRow in checkboxRows"
        :key="checkboxRow.index"
      >
        <p class="txt">{{ checkboxRow.txt }}</p>
        <v-icon>{{ checkboxRow.icon }}</v-icon>
        <v-checkbox
          color="white"
          v-model="selected"
          :value="checkboxRow.value"
        />
      </div>
    </div>
  </AccountSideButtons>
</template>

<script>
import AccountSideButtons from "@/components/account/AccountSideButtons.vue";

export default {
  components: {
    AccountSideButtons,
  },
  data() {
    return {
      selected: [],
    };
  },
  mounted() {
    this.selected.push("received");
  },
  props: {
    checkboxRows: Array,
  },
  watch: {
    selected: function() {
      this.$emit("selectedChanged", this.selected);
    },
  },
};
</script>

<style lang="scss" scoped>
$gap: 0.5rem;

::v-deep {
  #sliderDiv {
    flex-direction: column;
    border-radius: 0 15px 15px 0 !important;
    border-left: none;
    // margin-top: 5px;

    &:not(:hover) {
      transform: translateX(calc(-100% + 2 * #{$gap} + 34px + 1.5rem));
    }

    .checkboxDiv {
      padding: 0 $gap;
      display: flex;

      &:first-child {
        margin-top: $gap;
      }
      margin: 0 0 $gap auto;

      & > * {
        &,
        * {
          margin: 0;
          padding: 0;
        }
        &.v-input--checkbox {
          position: relative;
          .v-input--selection-controls__ripple {
            position: absolute;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%);
          }
          .v-messages {
            display: none !important;
          }
        }
        &.v-icon {
          height: max-content;
          margin: 0 $gap 0 $gap * 2;
        }
      }
    }
  }
}
</style>
