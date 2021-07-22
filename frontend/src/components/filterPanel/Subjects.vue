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
    <div
      v-for="item in getSubjects()"
      :key="item"
      class="btn"
      v-show="show(item)"
    >
      <RadioButton :value="item" v-model="subject" size="16">
      {{ $l("data.subjects." + item) }}
      </RadioButton>
    </div>
  </BaseComponent>
</template>

<script>
import BaseComponent from "./BaseComponent.vue";
import RadioButton from "@/components/global/RadioButton.vue";

export default {
  components: {
    BaseComponent,
    RadioButton,
  },
  data() {
    return {
      subject: "",
      search: "",
    };
  },
  methods: {
    getSubjects() {
      return ["MATH", "BIOL", "ESL", "PHYS", "GEOG", "CHEM", "CIS"]; //TO DO!!!!
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
