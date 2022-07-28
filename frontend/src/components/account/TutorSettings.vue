<template>
  <div id="wrapper">
    <FilterPanel>
      <MottoField
        :value="value.moto.value"
        @input="updateMotto"
        :isError="value.moto.isError"
      />

      <AboutField
        :value="value.about.value"
        @input="updateAbout"
        :isError="value.about.isError"
      />
    </FilterPanel>

    <FilterPanel>
      <LinkField
        :value="value.conferenceLink.value"
        @input="updateLink"
        :isError="value.conferenceLink.isError"
      />
    </FilterPanel>

    <FilterPanel>
      <!-- <ExpandableListSelector
        :value="value.subjects.value"
        @input="updateSubjects"
        :isError="value.subjects.isError"
        :label="$l('set_up.subjects')"
        :text="
          value.subjects.value.map((l) => $l('data.subjects.' + l)).join(', ')
        "
        :list="['MATH', 'BIOL', 'ESL', 'PHYS', 'GEOG', 'CHEM', 'CIS']"
        :convertor="(item) => $l('data.subjects.' + item)"
        :searchLabel="$l('find.filters.subject.search')"
        borderRadius="15px 15px 0px 0px"
        :flat="false"
      /> -->

      <SubjectsField
        :value="value.subjects.value"
        @input="updateSubjects"
        :isError="value.subjects.isError"
      />

      <GradeField
        :value="value.audience.value"
        @input="updateAudience"
        :isError="value.audience.isError"
      />

      <LanguagesField
        :value="value.languages.value"
        @input="updateLanguages"
        :isError="value.languages.isError"
      />
    </FilterPanel>
  </div>
</template>

<script lang="ts">
import FilterPanel from "@/components/filterPanel/FilterPanel.vue";
import ExpandableListSelector from "@/components/filterPanel/ExpandableListSelector.vue";
import ExpandableSlider from "@/components/filterPanel/ExpandableSlider.vue";
import TextField from "@/components/filterPanel/TextField.vue";

import { Vue, Component, Prop, Ref } from "vue-property-decorator";
import { Details as D } from "./types";
import { Details } from "./classes/Details";
import { getUpdatedFields } from "@/utility/validate";
import { Grade, Language, Subject } from "@/types";

import MottoField from "./tutor/settings/MottoField.vue";
import AboutField from "./tutor/settings/AboutField.vue";

import LinkField from "./tutor/settings/LinkField.vue";

import SubjectsField from "./tutor/settings/SubjectsField.vue";
import LanguagesField from "./tutor/settings/LanguagesField.vue";
import GradeField from "./tutor/settings/GradeField.vue";

@Component({
  components: {
    FilterPanel,

    MottoField,
    AboutField,

    LinkField,

    SubjectsField,
    GradeField,
    LanguagesField,

    ExpandableListSelector,
    ExpandableSlider,
    TextField,
  },
})
export default class TutorSettings extends Vue {
  @Ref() readonly panel!: InstanceType<typeof FilterPanel>;
  @Prop({ type: Object, default: () => new Details.Tutor() })
  readonly value!: D.Tutor;

  updateMotto(value: string) {
    this.$emit("input", getUpdatedFields(this.value, "moto", value));
  }
  updateAbout(value: string) {
    this.$emit("input", getUpdatedFields(this.value, "about", value));
  }
  updateLink(value: string) {
    this.$emit("input", getUpdatedFields(this.value, "conferenceLink", value));
  }
  updateSubjects(value: Subject[]) {
    this.$emit("input", getUpdatedFields(this.value, "subjects", value));
  }
  updateAudience(value: [Grade, Grade]) {
    this.$emit("input", getUpdatedFields(this.value, "audience", value));
  }
  updateLanguages(value: Language[]) {
    this.$emit("input", getUpdatedFields(this.value, "languages", value));
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

#wrapper {
  width: 25rem;
  @media (max-width: 450px) {
    width: 100%;
    padding: 0 1rem;
  }

  & > *:not(:last-child) {
    margin-bottom: 2rem;
  }
}

#panels {
  border-radius: 15px;
}
</style>
