<template>
  <BaseComponent
    ref="base"
    v-model="filter"
    :default="'raiting'"
    :label="$l('find.filters.filters.h')"
    :text="$l('find.filters.filters.' + filter)"
    propURL="filter"
  >
    <!-- <v-radio-group v-model="filter">
      <v-radio
        color="accent"
        v-for="item in getFilters()" ------
        :key="item" -------
        :value="item"
        :label="$l('find.filters.filters.' + item)"
      />
    </v-radio-group> -->
    <div
      class="sortBy d-flex justify-left"
      v-for="item in getFilters()"
      :key="item"
    >
      <button
        :id="item"
        :class="{ active: filter == item, down: down }"
        class="sortButton"
        @click="changeChosen(item)"
      >
        <v-icon class="iconWater ma-0 pa-0">mdi-water</v-icon>
        <div class="dot"></div>
      </button>

      <label class="label" :for="item">{{
        $l("find.filters.filters." + item)
      }}</label>
    </div>
  </BaseComponent>
</template>

<script>
import BaseComponent from "./BaseComponent.vue";

export default {
  components: {
    BaseComponent,
  },
  data() {
    return {
      filter: "",
      down: false,
    };
  },
  methods: {
    getFilters() {
      //TO DO!!!!!!!!!!!!!!!
      return ["raiting", "price", "hours_tought"];
    },
    changeChosen(item) {
      if (this.filter === item) {
        this.down = !this.down;
      } else {
        this.filter = item;
        this.down = true;
      }
      console.log(this.down);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

.sortBy {
  .sortButton {
    position: relative;
    @include box-size(1.5rem);
    @include flexbox;
    margin-bottom: 0.5rem;

    transition: transform 400ms ease-in-out;

    .iconWater {
      position: absolute;
      @include box-size(1rem);
      color: var(--v-accent-base);
    }
    .dot {
      @include box-size(0.8rem);
      @include flexbox;
      background: var(--v-secondary-darken2);
      border-radius: 50%;
    }
    &:not(.active) {
      .iconWater {
        opacity: 0;
        transform: scale(0.1);
        transition: all 400ms ease-in-out;
      }
      .dot {
        opacity: 1;
        transform: scale(1);
        transition: all 400ms 200ms ease-in-out;
      }
    }
    &.active {
      .iconWater {
        opacity: 1;
        transform: scale(1);
        transition: all 400ms 200ms ease-in-out;
      }
      .dot {
        opacity: 0;
        transform: scale(0.1);
        transition: all 400ms ease-in-out;
      }
      &.down {
        transform: rotate(180deg);
      }
    }
  }
}

.label {
  margin-left: 0.8rem;
  color: rgba($color: #000000, $alpha: 0.6);
  &:hover {
    cursor: pointer;
  }
}

::v-deep #scroll {
  overflow: hidden;
}
</style>
