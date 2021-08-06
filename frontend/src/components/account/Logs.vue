<template>
  <Background>
    <Subheader :title="$l('acc_pages.logs')" />

    <table ref="table">
      <tr>
        <th v-for="title in titles" :key="title.index">
          {{ $l(`past.${title}`) }}
        </th>
      </tr>

      <div class="spacer"></div>

      <tr v-for="(lesson, index) in lessons" :key="index">
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
  </Background>
</template>

<script>
import Background from "@/components/global/background/Background.vue";
import Subheader from "@/components/app/Subheader.vue";
import Rating from "@/components/choosing/choosingATutor/Rating.vue";
import Dialog from "@/components/global/Dialog.vue";

export default {
  components: {
    Background,
    Subheader,
    Rating,
    Dialog,
  },
  data() {
    return {
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
      lessons: [
        {
          subject: "Maths",
          date: "8/2/2021",
          start_time: "13:09",
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
          date: "8/6/2021",
          start_time: "9:45",
          duration: "46 min",
          price: "53 UC",
          payer: "Payer",
          payee: "Payee",
          satisfaction: 1,
          comment:
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
          subject: "Maths",
          date: "8/8/2021",
          start_time: "14:18",
          duration: "46 min",
          price: "46 UC",
          payer: "Payer",
          payee: "Payee",
          satisfaction: 3,
          comment:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
        },
      ],
    };
  },
  mounted() {
    for (let i = this.lessons.length; i > 0; i--) {
      this.lessons.splice(i, 0, {});
    }

    this.$nextTick(() => {
      this.$refs.table.querySelectorAll("tr").forEach((tr, index) => {
        if (index % 2 === 0 && index !== 0) tr.classList.add("spacer");
      });
    });
  },
  methods: {
    openComment(commentId) {
      console.log(111);
      this.currentComment = this.lessons[commentId].comment;
    },
    cutComment(comment) {
      return comment.slice(0, 11).concat("...");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

// #backgroundCard {
//   background: red !important;
// }

table {
  width: 95vw;
  tr {
    @include box-shadow();
    border-radius: 15px;
    th,
    td {
      width: max-content;
      padding: 1rem 0;
      vertical-align: middle;

      span,
      a {
        display: inline-block;
      }
    }
  }
  tr:first-child {
    box-shadow: none;
    color: var(--v-secondary-darken3);
  }
  tr:not(:first-child) {
    // background: red;
  }
  .spacer {
    // height: 1rem;
    box-shadow: none;
    height: 1.5rem;

    td {
      height: 0rem;
      padding: 0;
    }
  }
}
</style>
