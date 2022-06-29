<template>
  <div id="background">
    <CheckboxButtons
      @selectedChanged="selectedChanged"
      :checkboxRows="[
        {
          txt: 'Received lessons',
          icon: 'mdi-school',
          value: 'received',
        },
        {
          txt: 'Given lessons',
          icon: 'mdi-human-male-board',
          value: 'given',
        },
      ]"
    />
    <Subheader :title="$l('acc_pages.logs')" />
    <Loading
      ref="loading"
      :action="calculateArr"
      @callback="sortArray"
      background="var(--v-background-base)"
      :centered="true"
    >
      <div id="tableWrapper">
        <table ref="table" :style="`--scaleDuration: ${scaleDuration}ms`">
          <tr v-if="lessons.length > 0">
            <th v-for="title in titles" :key="title.index">
              {{ $l(`past.${title}`) }}
            </th>
          </tr>

          <tr class="spacer" />

          <tr
            v-for="(lesson, index) in lessons"
            :key="index"
            :class="{
              given: lesson.type === 'given',
              spacer: Object.keys(lesson).length === 0,
            }"
          >
            <td
              v-for="title in titles.slice(0, titles.length - 2)"
              :key="title.index"
            >
              <span>
                {{ lesson[title] }}
              </span>
            </td>
            <td>
              <Rating
                :valueProp="lesson[titles[titles.length - 2]]"
                v-if="lesson[titles[titles.length - 2]]"
              />
            </td>
            <td>
              <a
                href="#"
                @click.prevent="openComment(index)"
                v-if="lesson[titles[titles.length - 1]]"
                >{{ cutComment(lesson[titles[titles.length - 1]]) }}</a
              >
            </td>
          </tr>
        </table>
      </div>
    </Loading>
    <!-- </div> -->
    <DialogCustom ref="dialog" @dialogClosed="currentComment = ''">
      <template v-slot:title id="title"> Comment </template>

      <template v-slot:text>
        {{ currentComment }}
      </template>
    </DialogCustom>
  </div>
</template>

<script>
import Loading from "@/components/global/Loading.vue";
import CheckboxButtons from "@/components/account/CheckboxButtons.vue";
import Subheader from "@/components/app/Subheader.vue";
import Rating from "@/components/choosing/choosingATutor/Rating.vue";
import DialogCustom from "@/components/global/Dialog.vue";

export default {
  components: {
    Loading,
    CheckboxButtons,
    Subheader,
    Rating,
    DialogCustom,
  },
  data() {
    return {
      dataChanged: false,
      selected: null,
      loading: true,
      scaleDuration: 300,
      currentComment: "",
      titles: [
        "subject",
        "date",
        "start_time",
        "duration",
        "price",
        "payer",
        "payee",
        "satisfaction",
        "comment",
      ],
      lessons: [],
      received: [
        {
          subject: "Maths",
          newDate: new Date(2021, 8, 2, 13, 9),
          date: "", //Added in js
          start_time: "", //Added in js
          duration: "54 min",
          price: "57 UC",
          payer: "Payer",
          payee: "Payee",
          satisfaction: 5,
          comment:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        },
        {
          subject: "Physics",
          newDate: new Date(2021, 8, 6, 9, 45),
          start_time: "", //Added in js
          duration: "46 min",
          price: "53 UC",
          payer: "Payer",
          payee: "Payee",
          satisfaction: 3,
          comment:
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
      ],
      given: [
        {
          subject: "Maths",
          newDate: new Date(2021, 8, 4, 14, 18),
          date: "", //Added in js
          start_time: "", //Added in js
          duration: "46 min",
          price: "46 UC",
          payer: "Payer",
          payee: "Payee",
          satisfaction: 4,
          comment:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
        },
      ],
    };
  },
  methods: {
    openComment(commentId) {
      this.currentComment = this.lessons[commentId].comment;
      this.$refs.dialog.open();
    },
    cutComment(comment) {
      return comment.slice(0, 11).concat("...");
    },
    selectedChanged(args) {
      this.$refs.loading.invoke(args);
    },
    calculateArr(args) {
      return new Promise((res) => {
        setTimeout(() => {
          let response = [];
          args.forEach((type) => {
            let lessons = {
              type,
              elements: JSON.parse(JSON.stringify(this[type])),
            };
            response.push(lessons);
          });
          res(response);
        }, 3000);
      });
    },
    sortArray(response) {
      let arr = [];
      response.forEach((lessons) =>
        lessons.elements.forEach((el) => {
          el.type = lessons.type;
          arr.push(el);
        })
      );
      arr = arr.sort((l1, l2) => new Date(l1.newDate) - new Date(l2.newDate));
      this.timeAndDate(arr);
      for (let i = arr.length; i > 0; i--) arr.splice(i, 0, {});

      this.lessons = arr;
    },
    timeAndDate(arr) {
      arr.forEach((lesson) => {
        let d = new Date(lesson.newDate);

        let day = d.getDate();
        let month = d.getMonth();
        let year = d.getFullYear();
        lesson.date = day + "/" + month + "/" + year;

        const ifUnder10 = (number) => {
          if (number <= 9) number = "0".concat(number);
          return number;
        };
        let hours = d.getHours();
        hours = ifUnder10(hours);
        let minutes = d.getMinutes();
        minutes = ifUnder10(minutes);
        lesson.start_time = hours + ":" + minutes;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

#background {
  width: 100%;
}

#tableWrapper {
  width: 100%;

  table {
    border-radius: 15px;
    margin: 0 auto;
    width: 95vw;
    @media (max-width: 1100px) {
      width: 1045px; //1100 * 0.95
    }

    tr {
      @include box-shadow();
      border-radius: inherit;
      color: var(--v-primary-lighten3);
      border-right: 2rem solid transparent;
      border-left: 2rem solid transparent;

      // @include from-left();

      &.given {
        td {
          background: var(--v-header-base);
        }
      }
      &:first-child {
        box-shadow: none;
        color: var(--v-secondary-darken2);
      }
      td {
        &:first-child {
          border-radius: 15px 0 0 15px;
        }
        &:last-child {
          border-radius: 0 15px 15px 0;
        }
      }

      th,
      td {
        width: 1%;
        padding: 1rem 0;
        vertical-align: middle;

        span,
        a {
          display: inline-block;
        }
      }
    }
    .spacer {
      box-shadow: none;
      height: 1.5rem;

      td {
        height: 0rem;
        padding: 0;
      }
    }
  }
}
</style>

