<template>
  <BaseComponent
    ref="base"
    v-model="subject"
    :default="''"
    :rules="(val) => val != ''"
    :label="$l('find.filters.subject.h')"
    :text="this.$l('data.subjects.' + subject)"
    search="true"
    @search="(val) => (search = val)"
    propURL="subject"
  >
    <div v-for="item in getSubjects()" :key="item" class="btn">
      <input
        type="radio"
        :id="item"
        :value="item"
        v-show="show(item)"
        v-model="subject"
      />
      <label :for="item">{{ $l("data.subjects." + item) }}</label>
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
      subject: "",
      search: "",
    };
  },
  methods: {
    getSubjects() {
      return ["math", "biol", "esl", "phys", "geog", "chem", "cis"]; //TO DO!!!!
    },
    show(item) {
      if (this.search === "") return true;
      return this.$l("data.subjects." + item)
        .toLowerCase()
        .includes(this.search.toLowerCase());
    },
  },
};
</script>
<style lang="scss" scoped>
.btn {
  text-align: left;
  display: flex;
  align-items: center;
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }

  label {
    margin-left: 0.8rem;
    color: rgba($color: #000000, $alpha: 0.6);
    cursor: pointer;
  }
}

input[type="radio"] {
  margin: 0;
  width: 1rem;
  height: 1rem;
  &::after {
    background-color: var(--v-accent-base);
  }
}
</style>
