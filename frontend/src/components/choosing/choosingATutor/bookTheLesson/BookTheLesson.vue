<template>
  <div>
    <div id="profile">
      <UserImg :tutor="tutor" />
      <h3>{{ tutor.name }}</h3>
    </div>

    <InfoTable />

    <ConfirmButton />
  </div>
</template>

<script>
import InfoTable from "@/components/choosing/choosingATutor/bookTheLesson/InfoTable.vue";
import ConfirmButton from "@/components/choosing/choosingATutor/bookTheLesson/ConfirmButton.vue";
import UserImg from "@/components/dialogs/UserImg.vue";

export default {
  name: "BookTheLesson",
  path: "/book_the_lesson",
  permisions: {
    roles: "ALL",
  },
  components: {
    InfoTable,
    ConfirmButton,
    UserImg,
  },
  props: {
    tutor: Object,
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

#profile {
  @include flexbox;
}
::v-deep {
  .userImg {
    margin-right: 1rem;
  }
}
</style>
