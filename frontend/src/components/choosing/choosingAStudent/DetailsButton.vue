<template>
  <DialogCustom class="dialog">
    <template v-slot:object
      ><v-btn rounded elevation="0" outlined color="accent" class="button">
        {{ $l("choose_a.student.button") }}
      </v-btn>
    </template>

    <template v-slot:title>
      {{ $l("choose_a.student.button") }}
    </template>

    <template v-slot:text>
      <LessonDetails :student="student" />
    </template>
  </DialogCustom>
</template>

<script>
import DialogCustom from "@/components/global/Dialog.vue";
import LessonDetails from "@/components/choosing/choosingAStudent/LessonDetails.vue";

export default {
  components: {
    DialogCustom,
    LessonDetails,
  },
  props: {
    student: Object,
  },
};
</script>

<style lang="scss" scoped>
.button.v-btn {
  width: 100%;
}
</style>
