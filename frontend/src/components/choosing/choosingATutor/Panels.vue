<template>
  <div id="main">
    <div v-for="(tutor, index) in tutors" :key="index">
      <v-tooltip left content-class="tooltip" open-delay="300">
        <template v-slot:activator="{ on, attrs }">
          <div v-bind="attrs" v-on="on">
            <Panel :tutor="tutor" />
          </div>
        </template>
        <span>
          <Moto :moto="tutor.moto" />
          <Comments :id="tutor.uuid" :background="tooltipBackground" />
        </span>
      </v-tooltip>
    </div>
  </div>
</template>

<script>
import Panel from "./Panel.vue";
import Moto from "./aboutTutor/Moto.vue";
import Comments from "@/components/choosing/choosingATutor/aboutTutor/Comments.vue";

export default {
  props: {
    tutors: Array,
  },
  components: {
    Panel,
    Moto,
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
      console.log(this.tooltipBackground);
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

::v-deep {
  .comments {
    margin-top: 1rem;
  }
  #moto {
    margin: 1rem auto 2.5rem auto;
  }
}

.tooltip {
  margin-left: -1.5rem; // hard-cocded
  background: var(--tooltipBackground) !important;
  @include box-shadow();
  @media (max-width: 1120px) {
    display: none;
  }
  // transform: translateY(calc(50% - 93.5px));
}
</style>
