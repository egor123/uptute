<template>
  <div id="wrapper">
    <FilterPanel>
      <TextField
        :value="value.moto.value"
        @input="updateMotto"
        :isError="value.moto.isError"
        :errMsg="value.moto.isError.msg"
        :label="$l('set_up.motto')"
        :borderRadius="'15px 15px 0px 0px'"
        :flat="false"
      />

      <TextField
        :value="value.about.value"
        @input="updateAbout"
        :isError="value.about.isError"
        :errMsg="value.about.isError.msg"
        :area="true"
        :label="$l('set_up.about')"
        :borderRadius="'0px 0px 15px 15px'"
        :flat="false"
      />
    </FilterPanel>

    <FilterPanel id="zoomDiv">
      <TextField
        :value="value.conferenceLink.value"
        @input="updateLink"
        :isError="value.conferenceLink.isError"
        :errMsg="value.conferenceLink.isError.msg"
        class="zoom"
        :label="$l('set_up.zoom')"
        img="zoom-icon"
        :flat="false"
      />

      <div id="dialogContainer">
        <!-- Class notInput for FilterPanel -->
        <DialogCustom class="notInput">
          <template v-slot:object>
            <button id="dialog">?</button>
          </template>

          <template v-slot:title>
            {{ $l("set_up.dialog.title") }}
          </template>

          <template v-slot:text>
            {{ $l("set_up.dialog.text") }}
            <a
              target="_blank"
              href="https://support.zoom.us/hc/en-us/articles/201362843-Personal-meeting-ID-PMI-and-personal-link"
            >
              {{ $l("set_up.dialog.link") }}
            </a>
          </template>
        </DialogCustom>
      </div>
    </FilterPanel>

    <FilterPanel>
      <ExpandableListSelector
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
      />

      <ExpandableSlider
        :value="value.audience.value"
        @input="updateAudience"
        :isError="value.audience.isError"
        :label="$l('find.filters.audience.h')"
        :text="value.audience.value.join(' - ')"
        :min="1"
        :max="12"
        borderRadius="0px"
        :flat="false"
      />

      <ExpandableListSelector
        :value="value.languages.value"
        @input="updateLanguages"
        :isError="value.languages.isError"
        :label="$l('find.filters.language.h')"
        :text="
          value.languages.value.map((l) => $l('data.languages.' + l)).join(', ')
        "
        :list="['EN', 'EST', 'RU']"
        :convertor="(item) => $l('data.languages.' + item)"
        :multiple="true"
        borderRadius="0px 0px 15px 15px"
        :flat="false"
      />
    </FilterPanel>
  </div>
</template>

<script lang="ts">
import FilterPanel from "@/components/filterPanel/FilterPanel.vue";
import ExpandableListSelector from "@/components/filterPanel/ExpandableListSelector.vue";
import ExpandableSlider from "@/components/filterPanel/ExpandableSlider.vue";
import TextField from "@/components/filterPanel/TextField.vue";

import DialogCustom from "@/components/global/Dialog.vue";

import { Vue, Component, Prop, Ref } from "vue-property-decorator";
import { Details as D } from "./types";
import { Details } from "./classes/Details";
import { getUpdatedFields } from "@/utility/validate";
import { Grade, Language, Subject } from "@/types";

@Component({
  components: {
    FilterPanel,
    ExpandableListSelector,
    ExpandableSlider,
    TextField,

    DialogCustom,
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

.motto {
  border-radius: 15px 15px 0 0;
}

.about {
  border-radius: 0 0 15px 15px;
}

#zoomDiv {
  position: relative;

  .zoom {
    border-radius: 15px;
  }

  #dialogContainer {
    position: absolute;
    left: 102%;
    top: 50%;
    transform: translateY(-50%);

    @media (max-width: 450px) {
      left: 84%;
      top: 50%;
      transform: translateY(-50%);
    }

    #dialog {
      @include box-size(30px);
      border-radius: 50%;
      color: var(--v-secondary-darken2);

      transition: color 300ms ease-in-out;
      &:hover {
        color: var(--v-secondary-darken3);
      }
    }
  }
}

#panels {
  border-radius: 15px;
}
</style>
