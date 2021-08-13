<template>
  <v-list-item>
    <v-icon>mdi-star</v-icon>
    <span>
      {{ commenter }} gave you a
      <a href="#" ref="feedbackATag">feedback</a>
    </span>
    <FeedbackViewer
      ref="viewer"
      :commenter="commenter"
      :rating="rating"
      :comment="comment"
    />
  </v-list-item>
</template>

<script>
import FeedbackViewer from "@/components/notifications/FeedbackViewer.vue";

export default {
  props: {
    commenter: String,
    rating: Number,
    comment: String,
  },
  components: {
    FeedbackViewer,
  },
  mounted() {
    this.$refs.feedbackATag.addEventListener("click", (event) => {
      this.$refs.viewer.$refs.dialog.open();
      event.preventDefault();
    });
  },
};
</script>
