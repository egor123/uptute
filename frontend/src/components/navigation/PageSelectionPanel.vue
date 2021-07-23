<template>
  <div class="container">
    <div id="buttons">
      <ChangePageButton
        v-for="btn in getButtons"
        :key="btn.index"
        :type="btn.type"
        :active="btn.active"
        @click="btn.action()"
      />
    </div>
    <PageSizeSelection v-model="value.itemsPerPage" :sizes="sizes" />
  </div>
</template>

<script>
import PageSizeSelection from "./PageSizeSelection";
import ChangePageButton from "./ChangePageButton";
export default {
  props: ["value", "sizes"],
  components: { PageSizeSelection, ChangePageButton },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    getButtons: function() {
      let pages = [];
      const count = this.value.pagesCount;
      if (this.value.page > 0)
        pages.push({ type: "previous", action: () => this.value.page-- });
      let last = 0;
      if (count != 1) {
        for (let i = 0; i < count; i++) {
          if (
            i === 0 ||
            i === count - 1 ||
            Math.abs(this.value.page - i) <= 1
          ) {
            if (i - last > 1)
              pages.push({ type: "disabled", action: () => {} });
            pages.push({
              type: "" + (i + 1),
              active: this.value.page === i,
              action: () => (this.value.page = i),
            });
            last = i;
          }
        }
      }

      if (this.value.page + 1 < count)
        pages.push({ type: "next", action: () => this.value.page++ });
      return pages;
    },
  },
  watch: {
    value: {
      deep: true,
      handler() {
        this.$emit("input", this.value);
      },
    },
  },
  mounted() {
    if (this.value.comments > 5) {
      this.show = true;
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  height: 60px;
  padding: 2rem 0;
  height: max-content;
  #buttons {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
