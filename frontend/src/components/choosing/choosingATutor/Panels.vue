<template>
  <div id="main">
    <div v-for="tutor in tutors" :key="tutor.id">
      <v-tooltip left content-class="tooltip" open-delay="300">
        <template v-slot:activator="{ on, attrs }">
          <div v-bind="attrs" v-on="on">
            <Panel :tutor="tutor" />
          </div>
        </template>

        <span>
          <Moto :moto="tutor.moto" />

          <Comments />
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
}

.tooltip {
  margin-left: -1rem;
  width: 350px;
  color: var(--v-primary-base);
  background: var(--v-secondary-base);
  opacity: 0.4 !important;
  border-radius: 15px;
}

::v-deep #moto {
  margin: 1rem 0 2.5rem 0;
}

@media (max-width: 1120px) {
  .tooltip {
    display: none;
  }
}
</style>
