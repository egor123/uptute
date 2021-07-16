<template>
  <Dialog>
    <template v-slot:object>
      <v-btn rounded outlined color="accent">
        {{ $l("booking.confirm") }}
      </v-btn>
    </template>

    <template v-slot:title>
      {{ $l("booking.dialog.title") }}
    </template>

    <template v-slot:text>
      {{ $l("booking.dialog.text") }}
      <a target="_blank" :href="link">
        {{ $l("booking.dialog.here") }}
      </a>
    </template>
  </Dialog>
</template>

<script>
import Dialog from "@/components/global/Dialog.vue";

export default {
  components: {
    Dialog,
  },
  props: {
    link: String,
  },
};
</script>
