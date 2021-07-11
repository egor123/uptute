<template>
  <Dialog class="dialog">
    <template v-slot:object>
      <img class="userImg" src="@/assets/icons/user.svg" />
    </template>

    <template v-slot:title>
      <AboutTutorTitle :tutor="tutor" />
    </template>
    <template v-slot:text>
      <AboutTutorContent :tutor="tutor" />
    </template>
  </Dialog>
</template>

<script>
import Dialog from "@/components/global/Dialog.vue";
import AboutTutorTitle from "@/components/choosing/choosingATutor/aboutTutor/AboutTutorTitle.vue";
import AboutTutorContent from "@/components/choosing/choosingATutor/aboutTutor/AboutTutorContent.vue";

export default {
  components: {
    Dialog,
    AboutTutorTitle,
    AboutTutorContent,
  },
  props: {
    tutor: Object,
  },
};
</script>

<style lang="scss" scoped>
.userImg {
  width: 50px;
  height: 50px;
  margin: 0;
  padding: 0;
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
