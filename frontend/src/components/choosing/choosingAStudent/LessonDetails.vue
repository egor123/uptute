<template>
  <div class="content">
    <p>
      {{ student.topic ? student.topic.text : null }}
    </p>

    <PageViewer :imgs="student.imgs" :upload="false" />

    <Dialog>
      <template v-slot:object>
        <v-btn
          @click="
            $store.dispatch('tutorLessonAPI/sendOffer', {
              lessonId: student.id,
            })
          "
          rounded
          outlined
          color="accent"
        >
          {{ $l("choose_a.student.dialog.offer") }}
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
  props: ["student"],
  components: {
    Dialog,
    PageViewer,
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
