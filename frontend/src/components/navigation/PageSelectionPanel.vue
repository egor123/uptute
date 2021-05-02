<template>
  <div class="container">
    <div class="wrapper">
      <v-btn-toggle rounded id="panel">
        <v-row justify="center" no-gutters>
          <change-page-button :add="-1" />
          <v-btn-toggle rounded id="main-buttons">
            <page-selection
              v-for="index in pages"
              :key="index.id"
              :index="index"
            />
          </v-btn-toggle>
          <change-page-button :add="1" />
        </v-row>
      </v-btn-toggle>
      <page-size-selection id="selector" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PageSelection from "./PageSelection";
import PageSizeSelection from "./PageSizeSelection";
import ChangePageButton from "./ChangePageButton";
export default {
  data() {
    return {
      pages: [],
    };
  },
  components: { PageSelection, PageSizeSelection, ChangePageButton },
  computed: mapGetters(["getPage", "getPageCount", "getPageSize"]),
  methods: {
    setPages(page, count) {
      this.pages = [];
      if (count <= 5) {
        for (var i = 0; i < count; i++) {
          this.pages.push(i);
        }
      } else {
        for (var n = 0; n < count; n++) {
          if (n == 0 || n == count - 1 || Math.abs(n - page) <= 1) {
            if (
              this.pages.length &&
              this.pages[this.pages.length - 1] != n - 1
            ) {
              this.pages.push(-1);
            }
            this.pages.push(n);
          }
        }
      }
    },
  },
  watch: {
    getPageCount: {
      handler(count) {
        this.setPages(this.getPage, count);
      },
      immediate: true,
    },
    getPage: {
      handler(page) {
        this.setPages(page, this.getPageCount);
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.container {
  position: relative;
  height: 60px;
  min-width: 100%;
  padding-left: var(--side-margin);
  padding-right: var(--side-margin);
}
.wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}
#panel {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: transparent;
  opacity: 0.8;
}
</style>