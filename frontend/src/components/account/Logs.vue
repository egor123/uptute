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
          icon: 'mdi-teach',
          value: 'given',
        },
      ]"
    />
    <Subheader :title="$l('acc_pages.logs')" />
    <!-- <p>__________________________________{{ lessons.length }}</p> -->
    <!-- lessons.length === 0 -->
    <!-- style="background: red" -->
    <div style="background: red">
      <Loading
        @opacity0="opacity0"
        :loading="loading"
        background="var(--v-background-base)"
      >
        <div id="tableWrapper">
          <table ref="table" :style="`--scaleDuration: ${scaleDuration}ms`">
            <tr v-if="lessons.length > 0">
              <th v-for="title in titles" :key="title.index">
                {{ $l(`past.${title}`) }}
              </th>
            </tr>

            <tr class="spacer" />

            <tr v-for="(lesson, index) in lessons" :key="index" ref="lesson">
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
    </div>
    <Dialog
      :showDialogProp="currentComment.length > 0"
      @dialogClosed="currentComment = ''"
    >
      <template v-slot:title id="title">
        Comment
      </template>

      <template v-slot:text>
        {{ currentComment }}
      </template>
    </Dialog>
  </div>
</template>

<script>
import Loading from "@/components/global/Loading.vue";
import CheckboxButtons from "@/components/account/CheckboxButtons.vue";
import Subheader from "@/components/app/Subheader.vue";
import Rating from "@/components/choosing/choosingATutor/Rating.vue";
import Dialog from "@/components/global/Dialog.vue";

export default {
  components: {
    Loading,
    CheckboxButtons,
    Subheader,
    Rating,
    Dialog,
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
          dateL: "", //Added in js
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
  beforeMount() {
    this.addBlankRows();
    // this.selectedChanged();
  },
  methods: {
    openComment(commentId) {
      this.currentComment = this.lessons[commentId].comment;
    },
    cutComment(comment) {
      return comment.slice(0, 11).concat("...");
    },
    async selectedChanged(value) {
      this.selected = value;
      this.loading = true;

      await new Promise((res) => setTimeout(() => res(), 3000)); //delete later!!!!!
      this.dataChanged = true; // later change to check on given / received lessons
    },
    opacity0() {
      console.log(11111111);
      this.lessons = [];

      // !!!!!!!
    },
    addInfo() {
      console.log("addinfo++++++");
      this.dataChanged = false;
      this.addTypeGiven();
      this.lessons = this.lessons.sort((l1, l2) => l1.newDate - l2.newDate);
      this.timeAndDate();
      this.addClassGiven();
      this.addBlankRows();
      this.loading = false;
    },
    addTypeGiven() {
      this.selected.forEach((type) => {
        if (type === "given") {
          this[type].forEach((lesson) => {
            lesson.type = "given";
          });
        }
        this.lessons = this.lessons.concat(this[type]);
      });
    },
    timeAndDate() {
      this.lessons.forEach((lesson) => {
        // console.log(lesson.newDate);
        let d = lesson.newDate;

        let day = d.getDate();
        let month = d.getMonth();
        let year = d.getFullYear();
        lesson.date = day + "/" + month + "/" + year;

        const ifUnder10 = (number) => {
          if (number <= 9) number = "0".concat(hours);
          return number;
        };
        let hours = d.getHours();
        hours = ifUnder10(hours);
        let minutes = d.getMinutes();
        minutes = ifUnder10(minutes);
        lesson.start_time = hours + ":" + minutes;
      });
    },
    addClassGiven() {
      this.$nextTick(() => {
        for (let i = 0; i < this.lessons.length; i++) {
          if (this.lessons[i].type === "given")
            this.$refs.lesson[i].classList.add("given");
          else this.$refs.lesson[i].classList.remove("given");
        }
      });
    },
    addBlankRows() {
      for (let i = this.lessons.length; i > 0; i--) {
        this.lessons.splice(i, 0, {});
      }

      this.$nextTick(() => {
        this.$refs.table.querySelectorAll("tr").forEach((tr, index) => {
          if (index % 2 === 1) tr.classList.add("spacer");
        });
      });
    },
  },
  watch: {
    dataChanged: function() {
      console.log("---------dataChanged");
      if (this.lessons.length === 0 && this.dataChanged === true)
        this.addInfo();
    },
    lessons: function() {
      console.log("----------lessons");
      if (this.lessons.length === 0 && this.dataChanged === true)
        this.addInfo();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

#background {
  @include box-size(100%);
  padding-top: 9rem;
}

#tableWrapper {
  overflow-x: auto;
  width: fit-content;
  // margin: 0 10px;
  table {
    border-radius: 15px;
    margin: 0 2.5vw;
    width: 95vw;
    @media (max-width: 1100px) {
      width: 1045px; //1100 * 0.95
    }

    tr {
      @include box-shadow();
      border-radius: inherit;
      color: var(--v-primary-lighten3);

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
