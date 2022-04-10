<template>
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
      <BookTheLesson :tutor="tutor" :lesson="lesson" />
    </template>
  </Dialog>
</template>

<script>
import Dialog from "@/components/global/Dialog.vue";
import BookTheLesson from "@/components/choosing/choosingATutor/bookTheLesson/BookTheLesson.vue";

export default {
  components: {
    Dialog,
    BookTheLesson,
  },
  props: {
    tutor: Object,
    lesson: Object,
  },
};
</script>

<style lang="scss" scoped>
.v-btn {
  width: 100%;
}
</style>
