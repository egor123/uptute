<template>
  <HiddenButtonCard :tutor="tutor">
    <template v-slot:static>
      <div class="profile">
        <UserImg :tutor="tutor" />

        <div>
          <p class="pph">{{ pph }} UC/{{ $l("tutor.hour") }}</p>
          <h3>{{ tutor.firstName }} {{ tutor.lastName }}</h3>
          <p>{{ tutor.age }} {{ $l("find.filters.tutor_age.p") }}</p>
        </div>
      </div>
    </template>

    <template v-slot:moving>
      <div class="tutor">
        <v-tooltip top content-class="tooltip" open-delay="300">
          <template v-slot:activator="{ on, attrs }">
            <div class="hoursDiv" v-bind="attrs" v-on="on">
              <img
                width="20px"
                height="20px"
                class="mr-1"
                src="@/assets/icons/clock.svg"
              />
              <p>{{ hours }}{{ $l("tutor.hour") }}</p>
            </div>
          </template>
          <span>
            hours taught
          </span>
        </v-tooltip>

        <Rating :value="tutor.rating" class="rating" />

        <v-tooltip top content-class="tooltip" open-delay="300">
          <template v-slot:activator="{ on, attrs }">
            <div class="commentsDiv" v-bind="attrs" v-on="on">
              <img
                width="20px"
                height="20px"
                class="mr-1"
                src="@/assets/icons/message.svg"
              />
              <p>{{ tutor.comments }}</p>
            </div>
          </template>
          <span>
            sdf
          </span>
        </v-tooltip>
      </div>
    </template>
    <template v-slot:activator>
      <BookButton :tutor="tutor" />
    </template>
  </HiddenButtonCard>
</template>

<script>
import HiddenButtonCard from "@/components/choosing/HiddenButtonCard.vue";
import Rating from "./Rating.vue";
import UserImg from "@/components/choosing/choosingATutor/UserImg.vue";
import BookButton from "@/components/choosing/choosingATutor/BookButton.vue";

export default {
  data() {
    return {
      windowTop: 0,
      pph: 0,
      hours: 0,
    };
  },
  components: {
    HiddenButtonCard,
    Rating,
    UserImg,
    BookButton,
  },
  props: {
    tooltipUse: String,
    tutor: Object,
  },
  created() {
    this.pph = Math.round(this.tutor.pph);
    this.hours = Math.round(this.tutor.hours);
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: auto 0;
}

.profile {
  display: inline-flex;
  width: 100%;
  text-align: left;
  div {
    margin-left: 10px;
    width: 100%;
    padding: 0;
  }
  .pph {
    float: right;
  }
  p {
    margin: 0;
  }
}

.tutor {
  display: flex;
  position: relative;
  flex-wrap: wrap;
  justify-content: space-between;
  .rating {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .hoursDiv,
  .commentsDiv {
    opacity: 0.6;

    transition: opacity 300ms;
    &:hover {
      opacity: 1;
      cursor: pointer;
    }
  }
  div {
    display: flex;
  }
  * {
    margin: auto 0;
  }
}

.tooltip {
  opacity: 1 !important;
  width: max-content !important;
  min-width: 0 !important;
  background: var(--v-secondary-darken2) !important;
  color: white !important;
}
</style>
