<template>
  <div class="content">
    <p>
      {{ student.topic ? student.topic.text : null }}
    </p>

    <PageViewer :imgs="student.imgs" :upload="false" />

    <Dialog>
      <template v-slot:object>
        <v-btn
          @click="offerd ? cancelOffer() : sendOffer()"
          rounded
          outlined
          color="accent"
        >
          {{
            offered
              ? $l("choose_a.student.dialog.cancel")
              : $l("choose_a.student.dialog.offer")
          }}
        </v-btn>
      </template>

      <template v-slot:title>
        {{ $l("choose_a.student.dialog.title") }}
      </template>

      <template v-slot:text>
        {{ $l("choose_a.student.dialog.text") }}
      </template>
    </Dialog>
  </div>
</template>

<script>
import Dialog from "@/components/global/Dialog.vue";
import PageViewer from "@/components/global/PageViewer.vue";

export default {
  data() {
    return {
      // state: "notOffered",
      imgs: [
        {
          name: "physics1.jpg",
          imageUrl:
            "https://d2vlcm61l7u1fs.cloudfront.net/media%2F8d1%2F8d1789e9-0fb5-467e-906c-7998be55dcf4%2Fphp2hhv2V.png",
        },
        {
          name: "physics2.jpg",
          imageUrl:
            "https://slideplayer.com/slide/6196941/18/images/22/Relationships+in+this+problem%3A.jpg",
        },
        {
          name: "physics3.jpg",
          imageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROzKLzwCiWjKi4IIQVFeOvHoy2lW0ivmxVzA&usqp=CAU",
        },
      ],
    };
  },
  computed: {
    offered: function() {
      return this.$store.state.tutorLessonAPI.offeredLessons > 0;
    },
  },
  props: ["student"],
  components: {
    Dialog,
    PageViewer,
  },
  methods: {
    async sendOffer() {
      const lessonIdAndLogId = {
        lessonId: this.student.lessonId,
        logId: this.student.logId,
      };

      const offerLogId = await this.$store.dispatch(
        "tutorLessonAPI/sendOffer",
        {
          lesson: lessonIdAndLogId,
        }
      );
      this.offerLogId = offerLogId;
      // this.state = "offered";
    },
    cancelOffer() {
      this.$store.dispatch("tutorLessonAPI/cancelOffer", {
        offerLogId: this.offerLogId,
      });
      // this.state = "canceled";
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  & > *:not(:last-child) {
    margin-bottom: 5rem;
  }
}

p {
  margin-bottom: 0;
}
</style>
