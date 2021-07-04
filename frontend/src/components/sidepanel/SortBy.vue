<template>
  <BaseComponent
    ref="base"
    v-model="filter"
    :default="filters[0]"
    :label="$l('find.filters.filters.h')"
    :text="
      `${$l('find.filters.filters.' + filter.name)} ${
        filter.dir === 'up' ? '↑' : '↓'
      }`
    "
    propURL="filter"
  >
    <div
      class="filter"
      v-for="item in filters"
      :key="item.name"
      :checked="filter.name === item.name"
      :dir="item.dir"
      @click="change(item)"
    >
      <div class="wrapper">
        <div class="rotator">
          <v-icon class="icon">mdi-water</v-icon>
        </div>
      </div>
      <p>{{ $l("find.filters.filters." + item.name) }}</p>
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
      filters: [
        //TO DO!!!!!!!!!
        { name: "rating", dir: "up" },
        { name: "price", dir: "up" },
        { name: "hours_tought", dir: "up" },
      ],
      filter: {},
    };
  },

  methods: {
    change(item) {
      if (this.filter.name === item.name)
        item.dir = item.dir === "up" ? "down" : "up";
      this.filter = { name: item.name, dir: item.dir };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

$icon-wrapper-size: 1.5rem;
$scale: 0.4;
$transition-duration: 0.4s;
$margin-top: 0.4rem;
$side-margin: 0.8rem;
.filter {
  @include flexbox;
  justify-content: left;
  cursor: pointer;
  * {
    cursor: inherit;
  }
  & + & {
    margin-top: $margin-top;
  }
  .wrapper,
  .rotator,
  .icon {
    @include flexbox;
    transition: all $transition-duration ease;
  }
  .icon {
    color: var(--v-secondary-darken2);
  }
  p {
    margin: 0 0 0 #{$icon-wrapper-size + $side-margin};
  }
  .wrapper {
    position: absolute;
    @include box-size($icon-wrapper-size);
    border-radius: 50%;
    overflow: hidden;
  }
  &[checked] .icon {
    color: var(--v-accent-base);
  }
  &:not([checked]) {
    .wrapper {
      transform: scale($scale);
    }
    .icon {
      transform: scale(#{1 / $scale});
    }
  }
  &[dir="down"] .rotator {
    transform: rotate(180deg);
  }
}
</style>
