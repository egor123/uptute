<template>
  <BaseComponent
    ref="base"
    v-model="subjects"
    :default="[]"
    :rules="(val) => val != ''"
    :label="$l('set_up.subjects')"
    :text="subjects.map((s) => this.$l('data.subjects.' + s)).join(', ')"
    search="true"
    @search="(val) => (search = val)"
    propURL="subjects"
  >
    <v-checkbox
      v-for="item in getSubjects()"
      v-model="subjects"
      :key="item"
      :value="item"
      :label="$l('data.subjects.' + item)"
      height="0"
      color="accent"
    />
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
      subjects: [],
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
