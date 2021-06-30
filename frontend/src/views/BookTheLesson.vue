<template>
  <div id="containerMain">
    <Subheader :title="$l('booking.subheader')" />

    <v-row id="contentMain" class="ma-0 justify-center">
      <v-col
        class="pa-0 col-11 col-sm-9 col-md-6 col-lg-5 col-xl-3"
        id="backgroundCard"
      >
        <div id="contentWrapper">
          <div class=" ma-0 justify-center align-center d-flex flex-row">
            <img
              @click="goToAboutTutor()"
              class="userImg"
              src="@/assets/icons/user.svg"
            />
            <h3>{{ tutor.name }}</h3>
          </div>

          <InfoTable />

          <ConfirmButton />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Subheader from "@/components/Header.vue";
import InfoTable from "@/components/bookTheLesson/InfoTable.vue";
import ConfirmButton from "@/components/bookTheLesson/ConfirmButton.vue";

export default {
  name: "BookTheLesson",
  path: "/book_the_lesson",
  permisions: {
    roles: "ALL",
  },
  components: {
    Subheader,
    InfoTable,
    ConfirmButton,
  },
  data() {
    return {
      tutor: {
        name: "No Name",
        pph: 5,
        location: "HTG",
        grade: "11b",
        hours: 10,
        rating: 4.5,
        comments: 11,
      },
    };
  },
  methods: {
    goToAboutTutor() {
      if (this.$route.name !== "AboutTutor")
        this.$router.push({ name: "AboutTutor" });
    },
  },
};
</script>

<style lang="scss" scoped>
#backgroundCard {
  margin: calc(106px + 6rem) 0 6rem 0;
  height: max-content;
  border-radius: 15px;
  background: #ffffffaa;
}

#contentWrapper {
  padding: 3rem;
}

.userImg {
  width: 50px;
  height: 50px;
  margin-right: 1rem;
  cursor: pointer;

  border-radius: 50%;
  border: 2px solid var(--v-primary-base);
  opacity: 0.2;

  transition: box-shadow 400ms;
  &:hover {
    box-shadow: 1px 2px 5px 2.5px var(--v-primary-lighten4);
  }
}
</style>
