<template>
  <BaseComponent
    ref="base"
    v-model="filter"
    :default="{ name: 'rating', value: 'up' }"
    :label="$l('find.filters.filters.h')"
    :text="`${$l('find.filters.filters.' + filter.name)} ${
      filter.dir === 'up' ? '↑' : '↓'
    }`"
    propURL="filter"
  >
    <label class="filter" v-for="item in filters" :key="item.name">
      <input type="radio" name="radio" :dir="item.dir" @click="change(item)" />
      <span>
        <div class="rotator">
          <v-icon class="icon">mdi-water</v-icon>
        </div>
      </span>
      <p>{{ $l("find.filters.filters." + item.name) }}</p>
    </label>
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
        { name: "raiting", dir: "up" },
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
.filter {
  @include flexbox;
  justify-content: left;
  & + & {
    margin-top: $margin-top;
  }
  span,
  .rotator,
  .icon {
    transition: all $transition-duration ease;
  }
  span {
    position: absolute;
    @include box-size($icon-wrapper-size);
    @include flexbox;
    border-radius: 50%;
    overflow: hidden;
  }
  .rotator {
    @include flexbox;
    @include box-size(100%);
  }
  .icon {
    color: var(--v-secondary-darken2);
  }
  p {
    margin: 0 0 0 $icon-wrapper-size;
  }
  input {
    display: none;
    &[dir="down"] ~ span .rotator {
      transform: rotate(180deg);
    }
    &:not(:checked) ~ span {
      transform: scale($scale);
      .icon {
        transform: scale(#{1 / $scale});
      }
    }
    &:checked ~ span .icon {
      color: var(--v-accent-base);
    }
  }
}
</style>
