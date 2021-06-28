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
          <Moto />

          <Comments />
        </span>
      </v-tooltip>
    </div>
  </div>
</template>

<script>
import Panel from "@/components/tutorPanel/Panel.vue";
import Moto from "@/components/Moto.vue";
import Comments from "@/components/Comments.vue";

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

::v-deep .card {
  animation: slideInfFromLeft 1s ease-in-out; //for later when they will be added one by one
  position: relative;

  /* max-width: clamp(260px, 80%, 800px); */
  width: 100%;
  background: var(--v-secondary-base);
  border-radius: 15px;
  margin: 15px auto;
  padding: 15px;

  & .tutor {
    margin: 36px 0 -36px 0;
  }

  & .button {
    opacity: 0;

    &:hover {
      opacity: 1 !important;
    }
  }

  &:not(:hover) {
    & .tutor {
      transition: all 500ms ease 200ms;
    }
    & .button {
      transition: opacity 500ms ease 0ms;
    }
  }

  &:hover {
    & .tutor {
      margin: 0 !important;
      transition: all 600ms ease 0ms;
    }
    & .button {
      opacity: 1;
      transition: opacity 800ms ease 100ms;
    }
  }
}

::v-deep .comments {
  margin-top: 1rem;
}

.tooltip {
  margin-left: -1rem;
  width: 350px;
  color: var(--v-primary-base);
  background: var(--v-secondary-base);
  opacity: 0.4 !important;
  border-radius: 15px;
}

@media (max-width: 1120px) {
  .tooltip {
    display: none;
  }
}
</style>
