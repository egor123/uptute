<template>
  <HeaderMenu
    color="#000"
    textColor="var(--v-background-base)"
    borderRadius="15px"
    border="none"
    justifyContent="flex-end"
    paddingTop="10px"
    transformOrigin="right top"
    :onHover="false"
  >
    <template v-slot:title>
      <v-icon ref="important" class="headerCircle" id="important"
        >mdi-bell-circle</v-icon
      >
    </template>

    <template v-slot:content>
      <div v-for="(notification, index) in notifications" :key="index">
        <Feedback
          v-if="notification.type === 'feedback'"
          :commenter="notification.commenter"
          :rating="notification.rating"
          :comment="notification.comment"
        />
        <LessonAccepted
          v-if="notification.type === 'acceptedLesson'"
          :name="notification.name"
          :link="notification.link"
        />
        <div class="dividor" v-if="index !== notifications.length - 1" />
      </div>
    </template>
  </HeaderMenu>
</template>

<script>
import HeaderMenu from "@/components/header/HeaderMenu.vue";
import Feedback from "@/components/notifications/Feedback.vue";
import LessonAccepted from "@/components/notifications/LessonAccepted.vue";

export default {
  data() {
    return {
      notifications: [
        {
          type: "acceptedLesson",
          name: "NoName0",
          link: "https://zoom.us/",
        },
        {
          type: "feedback",
          commenter: "NN1",
          rating: 3,
          comment:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
          type: "feedback",
          commenter: "NoName2",
          rating: 4,
          comment:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
        },
      ],
    };
  },
  components: {
    HeaderMenu,
    Feedback,
    LessonAccepted,
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

.v-icon#important {
  border-radius: 50%;
  color: var(--v-background-base);
  cursor: pointer;
  @include hoverOpacity();
  // font-size: 30px;
}
.dividor {
  background: var(--v-background-base);
  opacity: 0.2;
}

::v-deep {
  .v-list-item {
    @include flexbox();
    max-width: 350px;
    width: max-content;
    text-transform: none;
    color: var(--v-background-base) !important;
    height: fit-content !important;
    min-height: 0;
    margin: 1rem 0;
    text-align: left;
    & > * {
      @include box-size(fit-content);
    }
    .v-icon {
      // display: inline-flex !important;
      @include flexbox();
      color: var(--v-background-base);
      margin: 0 1rem;
    }
  }
}
</style>
