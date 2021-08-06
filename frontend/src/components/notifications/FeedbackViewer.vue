<template>
  <Dialog :showDialogProp="showDialogProp" @dialogClosed="dialogClosed()">
    <template v-slot:title>
      Feedback
    </template>
    <template v-slot:text>
      <div>{{ commenter }}</div>
      <Rating id="rating" :valueProp="rating" />
      <div>{{ comment }}</div>
    </template>
  </Dialog>
</template>

<script>
import Dialog from "@/components/global/Dialog.vue";
import Rating from "@/components/choosing/choosingATutor/Rating.vue";

export default {
  components: {
    Dialog,
    Rating,
  },
  data() {
    return {
      showDialogProp: false,
    };
  },
  props: {
    commenter: String,
    rating: Number,
    comment: String,
  },
  mounted() {
    this.showDialogProp = true;
  },
  methods: {
    dialogClosed() {
      this.$emit("dialogClosed");
    },
  },
};
</script>

<style lang="scss" scoped>
#rating {
  transform: scale(1.2);
  margin: 2rem 0;
}
</style>
