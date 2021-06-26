<template>
  <div id="main">
    <div class="card" v-for="tutor in tutors" :key="tutor.id">
      <v-tooltip left content-class="tooltip" open-delay="300">
        <template v-slot:activator="{ on, attrs }">
          <div class="data" v-bind="attrs" v-on="on">
            <div class="profile">
              <img width="50px" height="50px" src="@/assets/icons/user.svg" />
              <div>
                <p class="pph">{{ tutor.pph }}&euro;/{{ $l("tutor.hour") }}</p>
                <h3>{{ tutor.name }}</h3>
                <p>{{ tutor.location }}, {{ tutor.grade }}</p>
              </div>
            </div>
            <div class="tutor">
              <div>
                <img
                  width="20px"
                  height="20px"
                  class="mr-1"
                  src="@/assets/icons/clock.svg"
                />
                <p>{{ tutor.hours }}{{ $l("tutor.hour") }}</p>
              </div>
              <Raiting :value="tutor.rating" />
              <div>
                <img
                  width="20px"
                  height="20px"
                  class="mr-1"
                  src="@/assets/icons/message.svg"
                />
                <p>{{ tutor.comments }}</p>
              </div>
            </div>

            <v-btn
              rounded
              elevation="0"
              class="button"
              :to="{ nane: 'Tutor', params: { id: tutor.id } }"
              @click="
                $ga.event(
                  'booking',
                  'button is pressed',
                  'booking button is pressed',
                  true
                )
              "
            >
              {{ $l("tutor.btn") }}
            </v-btn>
          </div>
        </template>
        <span>
          <div class="moto">
            <p class="mb-n2 mt-4">Sun shines to all of us the same way</p>
            <img
              class="quotationMark"
              src="@/assets/icons/right-quotes-symbol.svg"
              alt=""
            />
          </div>

          <div class="comments">
            <div class="commenter">
              <img
                width="20px"
                height="20px"
                src="@/assets/icons/user.svg"
                alt=""
              />
              <p>Lorem ipsum dolor sit amet! Lorem ipsum dolor sit amet.</p>
            </div>
            <div class="commenter">
              <img
                width="20px"
                height="20px"
                src="@/assets/icons/user.svg"
                alt=""
              />
              <p>
                Lorem ipsum dolor sit Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Veritatis, ex? Lorem, ipsum dolor sit amet
                consectetur adipisicing elit.
              </p>
            </div>
          </div>
        </span>
      </v-tooltip>
    </div>
  </div>
</template>

<script>
import Raiting from "./Raiting.vue";

export default {
  props: {
    tutors: Array,
  },
  components: { Raiting },
};
</script>

<style lang="scss" scoped>
$button-height: 36px;
$card-rows-margin: 5px;

#main {
  width: 100%;
  min-width: 0px; /* ??? */
}
.card {
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  /* max-width: clamp(260px, 80%, 800px); */
  width: 100%;
  background: var(--v-secondary-base);
  border-radius: 15px;
  margin: 15px auto;
  padding: 15px;
  text-align: left;

  & .tutor {
    margin: 36px 0 -36px 0;
  }

  & .button {
    opacity: 0;
    color: var(--v-secondary-darken3);
    background: var(--v-secondary-darken4);
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
      opacity: 0.6;
      transition: opacity 800ms ease 100ms;
    }
  }
}

.data {
  flex: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  &:hover + .tooltip {
    background: red !important;
    opacity: 0;
  }
}

.profile {
  display: inline-flex;
  width: 100%;
}

.profile img {
  margin: 0 auto;
  border-radius: 50%;
  border-style: solid;
  border-width: 2px;
  border-color: var(--v-primary-base);
  opacity: 0.2;
}

.profile div {
  margin-left: 10px;
  width: 100%;
  padding: 0;
}

.profile .pph {
  float: right;
}

.profile p {
  margin: 0;
}

.tutor {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 30px;
}

.tutor div {
  display: flex;
}

.tutor * {
  margin: auto 0;
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

.quotationMark {
  height: 48px;
  opacity: 0.1;
  margin-top: -1.5rem;
  margin-left: -10rem;
}

.comments {
  margin-top: 1rem;
  text-align: left;
}

.commenter {
  display: flex;
  flex-wrap: row;
  & img {
    border: solid black 1px;
    opacity: 0.3;
    border-radius: 50%;
    margin-right: 0.5rem;
  }
}
</style>
