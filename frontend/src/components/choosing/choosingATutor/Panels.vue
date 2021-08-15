<template>
  <div id="main">
    <div v-for="(tutor, index) in tutors" class="vForDiv" :key="index">
      <v-tooltip
        :attach="`#panel-${tutor.uuid}`"
        content-class="tooltip"
        open-delay="300"
        absolute
      >
        <template v-slot:activator="{ on, attrs }">
          <div
            v-bind="attrs"
            v-on="on"
            class="panelWrapper"
            :id="`panel-${tutor.uuid}`"
          >
            <Panel :tutor="tutor" class="panel" />
          </div>
        </template>
        <span>
          <!-- <Moto :moto="tutor.moto" /> -->
          <Comments :id="tutor.uuid" :background="tooltipBackground" />
        </span>
      </v-tooltip>
    </div>
  </div>
</template>

<script>
import Panel from "./Panel.vue";
// import Moto from "./aboutTutor/Moto.vue";
import Comments from "@/components/choosing/choosingATutor/aboutTutor/Comments.vue";

export default {
  props: {
    tutors: Array,
  },
  components: {
    Panel,
    // Moto,
    Comments,
  },
  data() {
    return {
      tooltipBackground: "var(--v-background-base)",
    };
  },
  mounted() {
    this.$nextTick(() => {
      document.styleSheets[0].insertRule(`:root{
      --tooltipBackground: ${this.tooltipBackground};
      }`);
    });
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

$button-height: 36px;
$card-rows-margin: 5px;

#main {
  width: 100%;
  min-width: 0px; /* ??? */
}

@keyframes slideInfFromLeft {
  from {
    transform: translateX(-8rem);
    opacity: 0;
  }
  to {
    transform: translateX(0rem);
    opacity: 1;
  }
}

// ::v-deep {
// #moto {
//   margin: 1rem auto;
//   border-radius: 15px;
// }
// }

.vForDiv:last-child {
  & .panel {
    margin: 10px auto 0 auto;
  }
  & .tooltip {
    bottom: 0 !important;
  }
}

.panelWrapper {
  position: relative;
  @include flexbox();

  .panel {
    @include box-size(100%);
    margin: 10px auto;
  }
  .tooltip {
    left: auto !important;
    top: auto !important;
    right: calc(100% + 20px);
    top: auto !important;

    background: var(--tooltipBackground) !important;
    @include box-shadow();
    @media (max-width: 1120px) {
      display: none;
    }
  }
}
</style>
