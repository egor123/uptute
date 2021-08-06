<template>
  <div>
    <v-menu
      transition="scale-transition"
      origin="top right"
      v-model="menuActive"
      bottom
      open-on-hover
      offset-y
      v-if="notices.length > 0"
    >
      <template v-slot:activator="{ on, attrs }">
        <div id="wrapper">
          <v-icon
            :style="`--widthMin: ${widthMin}px`"
            ref="important"
            id="important"
            v-bind="attrs"
            v-on="on"
            >mdi-exclamation</v-icon
          >
        </div>
      </template>

      <v-list>
        <div v-for="(notice, index) in notices" :key="index">
          <v-list-item ref="listItem" v-html="notice" />
          <div class="dividor" v-if="index !== notices.length - 1" />
        </div>
      </v-list>
    </v-menu>
    <FeedbackViewer
      @dialogClosed="chosenFeedback = {}"
      v-if="Object.keys(chosenFeedback).length !== 0"
      :commenter="chosenFeedback.commenter"
      :rating="chosenFeedback.rating"
      :comment="chosenFeedback.comment"
    />
  </div>
</template>

<script>
import FeedbackViewer from "@/components/notifications/FeedbackViewer.vue";

export default {
  data() {
    return {
      menuActive: null,
      notices: [
        "<div style='color: var(--v-primary-lighten3)'>NoName accepted your offer. Your lesson will be held&nbsp<a target='_blank' style='display: inline' href='https://zoom.us/'>here</a>.</div>",
        "<div class='feedback' style='color: var(--v-primary-lighten3)'>NoName gave you a&nbsp<a style='display: inline'>feedback</a>.</div>",
        "<div class='feedback' style='color: var(--v-primary-lighten3)'>NoName2 gave you a&nbsp<a style='display: inline'>feedback</a>.</div>",
      ],
      feedbacks: [
        {
          commenter: "NoName1",
          rating: 3,
          comment:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
          commenter: "NoName2",
          rating: 4,
          comment:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
        },
      ],
      chosenFeedback: {},
      widthMax: 300,
      widthMin: 50,
    };
  },
  components: {
    FeedbackViewer,
  },
  mounted() {
    this.menuActive = false;
  },
  methods: {
    openFeedback(index) {
      // console.log("index: " + index);

      this.chosenFeedback = this.feedbacks[index];
      // console.log("chosen: ");
      // console.log(this.chosenFeedback);
    },
    setATagListeners() {
      this.$nextTick(() => {
        let feedbackId = 0;

        this.$refs.listItem.forEach((item) => {
          const aTag = item.$el.querySelector(".feedback a");
          if (aTag != null) {
            let index = feedbackId;
            aTag.addEventListener("click", () => {
              this.openFeedback(index);
            });
            feedbackId++;
          }
        });
      });
    },
  },
  watch: {
    menuActive: function() {
      // console.log("Menu is active: " + this.menuActive);
      if (this.menuActive) {
        this.$refs.important.$el.style.transition =
          "border-radius 200ms, width 300ms 50ms";
        this.$refs.important.$el.style.width = `${this.widthMax}px`;
        this.$refs.important.$el.style.borderRadius = `15px 15px 0 0`;

        this.setATagListeners();
      } else {
        this.$refs.important.$el.style.transition =
          "border-radius 200ms 100ms, width 300ms";
        this.$refs.important.$el.style.width = `${this.widthMin}px`;
        this.$refs.important.$el.style.borderRadius = `50%`;
      }
    },
    chosenFeedback: function() {
      console.log(this.chosenFeedback);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

#wrapper {
  position: absolute;
  right: 25px;
  bottom: -20px;
  @media (pointer: none), (pointer: coarse) {
    right: 15px;
    bottom: -15px;
  }
  transform: translateY(100%);
  height: var(--widthMin);
  width: 300px;
  display: flex;
}

.v-icon#important {
  margin-left: auto;
  color: var(--v-secondary-base);
  cursor: default;

  background: var(--v-accent-base);
  z-index: 10;

  @include box-shadow();
  @include box-size(var(--widthMin));

  &::before {
    $mult: 1.2;

    @include box-size(var(--widthMin) / $mult);
    transform: scale($mult);
    @include flexbox();
  }
}

.v-menu__content {
  background: transparent;
  @include box-shadow();
  width: 300px;
  border-radius: 0 0 15px 15px;
  .v-list-item {
    margin: 1rem 0;
  }
}
</style>
