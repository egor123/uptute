<template>
  <div id="wrapper">
    <ImgInput v-model="img" />
    <FilterPanel class="inputPanel" ref="panelRef" @next="actionOnPanel2">
      <NameTextField
        v-for="key in ['firstName', 'lastName']"
        :value="value[key]"
        @input="(v) => handleInput(key, v)"
        :key="key"
        :obj="info[key]"
        :rules="(v) => ifPassesNameRules(v, info[key])"
      />
    </FilterPanel>

    <FilterPanel class="inputPanel" ref="panel2Ref">
      <ExpandableCalendar
        :value="value.birthday"
        @input="(v) => handleInput('birthday', v)"
        :label="$l('set_up.birth')"
        :text="info.birthday.value"
        :rules="(item) => item != null"
        borderRadius="15px"
        :flat="false"
      />
    </FilterPanel>
  </div>
</template>

<script lang="ts">
import ImgInput from "./ImgInput.vue";
import FilterPanel from "@/components/filterPanel/FilterPanel.vue";
import ExpandableCalendar from "@/components/filterPanel/ExpandableCalendar.vue";
import NameTextField from "@/components/account/NameTextField.vue";
import { ifPassesNameRules } from "./rules/name";

import { Vue, Component, Prop, Ref } from "vue-property-decorator";
import { Details as D, PanelAction } from "./types";
import { Details } from "./classes/Details";
import { Info } from "./classes/Info";

@Component({
  components: { ImgInput, FilterPanel, NameTextField, ExpandableCalendar },
  methods: { ifPassesNameRules },
})
export default class PrimarySettings extends Vue {
  @Ref() readonly panelRef!: InstanceType<typeof FilterPanel>;
  @Ref() readonly panel2Ref!: InstanceType<typeof FilterPanel>;
  @Prop({ type: Object, default: () => new Details.User() })
  readonly value!: D.User;

  // TODO include into the system (when will have db support)
  img =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9tbe0h9I_HCaMS2lyCsdTRXmznpSg9Rn5iA&usqp=CAU";
  info = new Info.User();

  actionOnPanel2(action: PanelAction) {
    this.panel2Ref[action]();
  }
  handleInput(name: string, val: string) {
    this.$emit("input", { ...this.value, [name]: val });
  }
  async isValid() {
    await this.panelRef.isValid();
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
  & > * {
    margin-bottom: 2rem;
  }
}
</style>
