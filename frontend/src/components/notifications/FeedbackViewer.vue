<template>
  <DialogCustom ref="dialog" @closed="$emit('closed')">
    <template v-slot:title> Feedback </template>
    <template v-slot:text>
      <div>{{ commenter }}</div>
      <Rating id="rating" :valueProp="rating" />
      <div>{{ comment }}</div>
    </template>
  </DialogCustom>
</template>

<script>
import DialogCustom from "@/components/global/Dialog.vue";
import Rating from "@/components/choosing/choosingATutor/Rating.vue";

export default {
  components: {
    DialogCustom,
    Rating,
  },
  props: {
    commenter: String,
    rating: Number,
    comment: String,
  },
};
</script>

<style lang="scss" scoped>
#rating {
  transform: scale(1.2);
  margin: 2rem 0;
}
</style>

