<template>
  <div class="card">
    <div class="data">
      <div class="profile">
        <Dialog class="dialog">
          <template v-slot:object>
            <img class="userImg" src="@/assets/icons/user.svg" />
          </template>

          <template v-slot:title>
            <AboutTutorTitle :name="tutor.name" />
          </template>
          <template v-slot:text>
            <AboutTutorContent :tutor="tutor" />
          </template>
        </Dialog>

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
        <Rating :value="tutor.rating" />
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

      <Dialog class="dialog">
        <template v-slot:object
          ><v-btn
            rounded
            elevation="0"
            outlined
            color="accent"
            class="button"
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
        </template>

        <template v-slot:title>
          {{ $l("booking.subheader") }}
        </template>
        <template v-slot:text>
          <BookTheLesson />
        </template>
      </Dialog>
    </div>
  </div>
</template>

<script>
import Rating from "./Rating.vue";
import Dialog from "@/components/Dialog.vue";
import AboutTutorTitle from "@/components/aboutTutor/AboutTutorTitle.vue";
import AboutTutorContent from "@/components/aboutTutor/AboutTutorContent.vue";
import BookTheLesson from "@/components/bookTheLesson/BookTheLesson.vue";

export default {
  data() {
    return {
      windowTop: 0,
    };
  },
  components: {
    Rating,
    Dialog,
    AboutTutorTitle,
    AboutTutorContent,
    BookTheLesson,
  },
  props: {
    tutor: Object,
    tooltipUse: String,
  },
  // methods: {
  //   goToAboutTutor() {
  //     this.$router.push({ name: "AboutTutor" });
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.card {
  cursor: auto;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  text-align: left;
}

.userImg {
  width: 50px;
  height: 50px;
  margin: auto;
  cursor: pointer;

  border-radius: 50%;
  border: 2px solid var(--v-primary-base);
  opacity: 0.2;

  transition: box-shadow 400ms;
  &:hover {
    box-shadow: 1px 2px 5px 2.5px var(--v-primary-lighten4);
  }
}

.data {
  flex: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.profile {
  display: inline-flex;
  width: 100%;
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
  margin-top: 10px;
}

.tutor div {
  display: flex;
}

.tutor * {
  margin: auto 0;
}

.button.v-btn {
  width: 100%;
}
</style>
