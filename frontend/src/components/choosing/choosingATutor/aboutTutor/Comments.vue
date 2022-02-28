<template>
  <div class="comments">
    <Loading
      ref="loading"
      :action="fetch"
      @callback="callback"
      :background="background"
      :centered="true"
      class="loading"
      :isActive="isActive"
    >
      <div class="wrapper" v-for="comment in comments" :key="comment.lessonsId">
        <div class="commenter">
          <div class="tutor">
            <img
              width="20px"
              height="20px"
              src="@/assets/icons/user.svg"
              alt=""
            />
            <p class="name">
              {{ comment.userFirstName }} {{ comment.userLastName }}
            </p>
            <Rating class="rating" :valueProp="comment.rating" />
          </div>
          <p>
            {{ comment.review }}
          </p>
        </div>
        <div class="divider" />
      </div>
    </Loading>
  </div>
</template>

<script>
import axios from "axios";
import Loading from "@/components/global/Loading.vue";
import Rating from "../Rating.vue";

export default {
  data() {
    return {
      comments: [],
      currentSettings: {},
      loading: [],
    };
  },
  components: {
    Loading,
    Rating,
  },
  props: ["value", "isActive", "id", "background"],
  methods: {
    fetch() {
      return axios
        .get(`/api/tutor/${this.id}/comments`, {
          params: {
            page: this.value?.page ?? 0,
            itemsPerPage: this.value?.itemsPerPage ?? 2,
          },
        })
        .then((res) => res.data);
    },
    callback(data) {
      this.comments = data.items;
      this.currentSettings = {
        page: data.page,
        itemsPerPage: data.itemsPerPage,
        pagesCount: data.pagesCount,
      };

      this.$emit("input", JSON.parse(JSON.stringify(this.currentSettings)));
    },
  },
  mounted() {
    setTimeout(() => {
      this.$refs.loading.invoke();
    }, 150); //TODO
    // console.log(this.isActive);
  },
  watch: {
    value: {
      deep: true,
      handler(val) {
        if (JSON.stringify(val) != JSON.stringify(this.currentSettings))
          this.$refs.loading.invoke();
      },
    },
    // isActive: function(val) {
    //   setTimeout(() => {
    //     console.log("CHANGED");

    //     if (val) this.$refs.loading.invoke();
    //   }, 150); //TODO
    // },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";
.comments {
  text-align: left;

  p {
    text-align: justify;
    hyphens: auto;
    @include font-size;
    margin: 0;
  }
  .commenter {
    padding: 2rem 0;
    .tutor {
      display: flex;
      flex: row;
      align-content: center;
      margin-bottom: 0.5rem;
      & > *:not(.rating) {
        opacity: 0.6;
      }
      img {
        border: solid black 1px;
        border-radius: 50%;
        margin-right: 0.5rem;
      }
      .name {
        margin: 0;
      }
      .rating {
        margin-left: auto;
      }
    }
  }
  .wrapper {
    &:not(:last-child) {
      .divider {
        width: 80%;
        height: 1px;
        background: var(--v-secondary-darken1);
        margin: 0 auto;
      }
    }
  }
}
</style>
