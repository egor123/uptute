<template>
  <div>
    <HiddenButtonCard v-for="student in students" :key="student.id">
      <template v-slot:static>
        <table>
          <tr>
            <td class="profile">
              <img class="userImg" src="@/assets/icons/user.svg" />
              <div class="nameAndAge">
                <span>{{ student.name }}</span>
                <span class="age"
                  >{{ student.grade }} {{ $l("choose_a.student.grade") }}</span
                >
              </div>
            </td>
            <td class="dateAndTime">
              <div class="date">{{ student.date }}</div>
              <div class="time"></div>
              {{ student.time.start }} - {{ student.time.end }}
            </td>
          </tr>
        </table>
      </template>

      <template v-slot:moving>
        <div class="infoContainer">
          <div class="subject">
            {{ student.subject }}
            <v-spacer />
            <Dialog>
              <template v-slot:object>
                <button id="dialog">
                  {{ student.topic.title }}
                </button>
              </template>

              <template v-slot:title id="title">
                {{ student.topic.title }}
              </template>

              <template v-slot:text>
                {{ student.topic.text }}
                <!-- To be able to add photos etc later on -->
              </template>
            </Dialog>
          </div>
        </div>
      </template>
    </HiddenButtonCard>
  </div>
</template>

<script>
import HiddenButtonCard from "@/components/tutorPanel/HiddenButtonCard.vue";
import Dialog from "@/components/dialogs/Dialog.vue";

export default {
  components: {
    HiddenButtonCard,
    Dialog,
  },
  props: {
    students: Array,
  },
};
</script>

<style lang="scss" style>
@import "@/scss/mixins.scss";

table {
  width: 100%;
  td {
    width: 50%;
    &.profile {
      @include flexbox;
      justify-content: start;
      .userImg {
        width: 50px;
        height: 50px;

        border-radius: 50%;
        border: 2px solid var(--v-primary-base);
        opacity: 0.2;
      }
      .nameAndAge {
        @include flexbox(column);
        .age {
          margin-right: auto;
        }
        margin-left: 10px;
      }
    }
    &.dateAndTime {
      text-align: right;
    }
  }
}

.infoContainer {
  @include flexbox(column);
  align-items: flex-end;
  .subject {
    @include flexbox;
    width: 100%;
    p {
      margin-bottom: 0;
    }
  }
}
</style>
