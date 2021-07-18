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
          <Comments :id="tutor.uuid" background="var(--v-secondary-base)" />
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
};
</script>

<style lang="scss" scoped>
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
    margin: 1rem 0 2.5rem 0;
  }
  &.tooltip {
    // margin-left: -1rem;
    @media (max-width: 1120px) {
      display: none;
    }
    position: absolute !important;
    transform: translateY(calc(50% - 93.5px));
  }
}
</style>
