<template>
  <div>
    <HiddenButtonCard
      v-for="student in students"
      :key="student.id"
      class="card"
    >
      <template v-slot:static>
        <table>
          <tr>
            <td class="profile">
              <img class="userImg" src="@/assets/icons/user.svg" />
              <div class="nameAndAge">
                <h3>{{ student.record.name }}</h3>
                <span class="age"
                  >{{ student.record.grade }}
                  {{ $l("choose_a.student.grade") }}</span
                >
              </div>
            </td>
            <!-- <td class="dateAndTime">
              <div class="date">
                {{ $l(`data.days.${student.date.weekday}.short`) }}
                {{ student.date.day }}
                <div class="lighter">
                  {{ $l(`data.months.${student.date.month}.short`) }}
                  {{ student.date.year }}
                </div>
              </div>
              <div class="time">
                {{ student.time.start }} - {{ student.time.end }}
              </div>
            </td> -->
          </tr>
        </table>
      </template>

      <template v-slot:moving>
        <div class="infoContainer">
          <div class="subject">
            {{ student.record.subject }}

            <v-spacer />

            <div class="topic">
              {{ student.record.topic.title }}
            </div>
          </div>
        </div>
      </template>
      <template v-slot:activator>
        <DetailsButton :student="student" />
      </template>
    </HiddenButtonCard>
  </div>
</template>

<script>
import HiddenButtonCard from "@/components/choosing/HiddenButtonCard.vue";
import DetailsButton from "@/components/choosing/choosingAStudent/DetailsButton.vue";

export default {
  components: {
    HiddenButtonCard,
    DetailsButton,
  },
  props: {
    students: Array,
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

// .card:first-child {
//   margin-top: 10px;
// }
// .card {
//   margin-top: 20px;
// }

table {
  width: 100%;
  td {
    width: 50%;
    &.profile {
      @include flexbox;
      justify-content: flex-start;
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
      vertical-align: top;

      .date {
        display: inline-flex;
        .lighter {
          margin-left: 0.5ch;
          color: var(--v-secondary-darken2);
        }
      }
    }
  }
}

.topic {
  color: var(--v-accent-base);
}

.infoContainer {
  @include flexbox(column);
  align-items: flex-end;
  .subject {
    @include flexbox;
    width: 100%;
  }
}
</style>
