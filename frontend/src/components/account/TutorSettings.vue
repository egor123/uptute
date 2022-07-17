<template>
  <div id="wrapper" ref="tutorSettingsWrapper">
    <FilterPanel
      ref="panel"
      @next="(action, callback) => callback($refs.panel2[action]())"
    >
      <TextField
        :value="value.moto"
        @input="(v) => $emit('input', { ...value, moto: v })"
        :label="$l('set_up.motto')"
        :borderRadius="'15px 15px 0px 0px'"
        :flat="false"
        :rules="(v) => v != '' && v != null"
      />
      <TextField
        :value="value.about"
        @input="(v) => $emit('input', { ...value, about: v })"
        :area="true"
        :label="$l('set_up.about')"
        :borderRadius="'0px 0px 15px 15px'"
        :flat="false"
        :rules="(v) => v != '' && v != null"
      />
    </FilterPanel>

    <FilterPanel
      ref="panel2"
      @next="(action, callback) => callback($refs.panel3[action]())"
      id="zoomDiv"
    >
      <TextField
        :value="value.conferenceLink"
        @input="(v) => $emit('input', { ...value, conferenceLink: v })"
        class="zoom"
        :label="$l('set_up.zoom')"
        img="zoom-icon"
        :flat="false"
        :rules="(v) => ifPassesLinkRules(v, info.conferenceLink)"
        :errMsg="info.conferenceLink.errMsg"
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

    <FilterPanel ref="panel3" @next="(action, callback) => callback(true)">
      <ExpandableListSelector
        :value="value.subjects"
        @input="(v) => $emit('input', { ...value, subjects: v })"
        :label="$l('set_up.subjects')"
        :text="value.subjects.map((l) => $l('data.subjects.' + l)).join(', ')"
        :list="['MATH', 'BIOL', 'ESL', 'PHYS', 'GEOG', 'CHEM', 'CIS']"
        :convertor="(item) => $l('data.subjects.' + item)"
        :searchLabel="$l('find.filters.subject.search')"
        :rules="(arr) => arr.length > 0"
        borderRadius="15px 15px 0px 0px"
        :flat="false"
      />
      <ExpandableSlider
        :value="value.audience"
        @input="(v) => $emit('input', { ...value, audience: v })"
        :label="$l('find.filters.audience.h')"
        :text="value.audience.join(' - ')"
        :min="1"
        :max="12"
        borderRadius="0px"
        :rules="() => true"
        :flat="false"
      />
      <ExpandableListSelector
        :value="value.languages"
        @input="(v) => $emit('input', { ...value, languages: v })"
        :label="$l('find.filters.language.h')"
        :text="value.languages.map((l) => $l('data.languages.' + l)).join(', ')"
        :list="['EN', 'EST', 'RU']"
        :convertor="(item) => $l('data.languages.' + item)"
        :multiple="true"
        :rules="(arr) => arr.length > 0"
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
import { ifPassesLinkRules } from "./rules/link";

import { Vue, Component, Prop, Ref } from "vue-property-decorator";
import { Info } from "./classes/Info";
import { Details as D } from "./types";
import { Details } from "./classes/details";

@Component({
  components: {
    FilterPanel,
    ExpandableListSelector,
    ExpandableSlider,
    TextField,

    DialogCustom,
  },
  methods: { ifPassesLinkRules },
})
export default class TutorSettings extends Vue {
  @Ref() readonly panel!: InstanceType<typeof FilterPanel>;
  @Prop({ type: Object, default: () => new Details.Tutor() })
  readonly value!: D.Tutor;

  info = new Info.Tutor();

  async isValid() {
    return await this.panel.isValid();
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
