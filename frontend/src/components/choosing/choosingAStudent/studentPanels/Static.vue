<template>
  <table>
    <tr>
      <td class="profile">
        <img class="userImg" src="@/assets/icons/user.svg" />
        <div class="nameAndAge">
          <div id="name">
            <h3>{{ firstName }}</h3>
            <h3>{{ lastName }}</h3>
          </div>
          <span id="age"> {{ grade }} {{ $l("choose_a.student.grade") }} </span>
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

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class PanelStaticInfo extends Vue {
  @Prop(String) readonly firstName!: string;
  @Prop(String) readonly lastName!: string;
  @Prop(Number) readonly grade!: number;
}
</script>

<style scoped lang="scss">
@import "@/scss/mixins.scss";

table {
  width: 100%;
  td {
    width: 50%;
    &.profile {
      @include flexbox(row);
      justify-content: flex-start;
      .userImg {
        @include box-size(50px);
        border-radius: 50%;
        border: 2px solid var(--v-primary-base);
        opacity: 0.2;
      }
      .nameAndAge {
        @include flexbox(column);
        #name {
          @include flexbox(row);
          & > *:first-child {
            margin-right: 0.5ch;
          }
        }
        #age {
          margin-right: auto;
        }
        margin-left: 10px;
      }
    }
    // &.dateAndTime {
    //   text-align: right;
    //   vertical-align: top;

    //   .date {
    //     display: inline-flex;
    //     .lighter {
    //       margin-left: 0.5ch;
    //       color: var(--v-secondary-darken2);
    //     }
    //   }
    // }
  }
}
</style>
