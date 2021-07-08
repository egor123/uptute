<template>
  <div>
    <div id="profile">
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
</template>

<script>
import InfoTable from "@/components/bookTheLesson/InfoTable.vue";
import ConfirmButton from "@/components/bookTheLesson/ConfirmButton.vue";

export default {
  name: "BookTheLesson",
  path: "/book_the_lesson",
  permisions: {
    roles: "ALL",
  },
  components: {
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
@import "@/scss/mixins.scss";

#profile {
  @include flexbox;
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
