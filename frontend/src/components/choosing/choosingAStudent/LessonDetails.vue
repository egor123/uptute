<template>
  <div class="content">
    <p>
      {{ student.details.details || null }}
    </p>

    <PageViewer
      v-if="student.details.imgs && student.details.imgs.length > 0"
      :imgs="student.imgs"
      :upload="false"
    />

    <DialogCustom>
      <template v-slot:object>
        <v-btn
          @click="isOffered ? cancelOffer() : sendOffer()"
          rounded
          outlined
          color="accent"
        >
          {{
            isOffered
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
    </DialogCustom>
  </div>
</template>

<script>
import DialogCustom from "@/components/global/Dialog.vue";
import PageViewer from "@/components/global/PageViewer.vue";
import TutorLesson from "@/store/modules/lesson/tutor/module";

export default {
  data() {
    return {
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
    isOffered: function () {
      return TutorLesson.lessons.offered.length > 0;
    },
  },
  props: ["student"],
  components: {
    DialogCustom,
    PageViewer,
  },
  methods: {
    async sendOffer() {
      const lessonIds = {
        lesson: this.student.lessonId,
        log: this.student.logId,
      };

      TutorLesson.sendOffer(lessonIds);
    },
    cancelOffer() {
      TutorLesson.cancelOffer(this.student.offerLogId);
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
