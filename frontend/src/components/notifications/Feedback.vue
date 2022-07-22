<template>
  <v-list-item>
    <v-icon>mdi-star</v-icon>
    <span>
      {{ insertName($l("app.header.notifications.feedback.gave")) }}
      <a ref="feedbackATag">
        {{ $l("app.header.notifications.feedback.link") }}</a
      >
    </span>
    <FeedbackViewer
      @closed="$emit('closed')"
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
      // this.$emit("clicked");
      event.preventDefault();
    });
  },
  methods: {
    insertName(str) {
      return str.replace("COMMENTER", this.commenter);
    },
  },
};
</script>

<style scoped lang="scss">
.v-icon {
  margin-right: 10px;
}
</style>

