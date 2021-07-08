<template>
  <Dialog>
    <template v-slot:object>
      <v-btn rounded outlined color="accent">
        {{ $l("booking.button") }}
      </v-btn>
    </template>

    <template v-slot:title>
      {{ $l("booking.dialog.title") }}
    </template>

    <template v-slot:text>
      {{ $l("booking.dialog.text") }}
      <a
        target="_blank"
        href="https://us04web.zoom.us/j/5839697402?pwd=T01CeDdOMGZHZVplOGdzK2ZieGpZdz09"
      >
        {{ $l("booking.dialog.here") }}
      </a>
    </template>
  </Dialog>
</template>

<script>
import Dialog from "@/components/dialogs/Dialog.vue";

export default {
  components: {
    Dialog,
  },
};
</script>
