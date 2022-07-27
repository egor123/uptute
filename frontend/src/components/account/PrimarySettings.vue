<template>
  <div id="wrapper">
    <ImgInput :value="img" />

    <FilterPanel class="inputPanel">
      <NameField
        :value="v.firstName.value"
        @input="updateName"
        :isError="v.firstName.isError"
      />
      <SurnameField
        :value="v.lastName.value"
        @input="updateSurname"
        :isError="v.lastName.isError"
      />
    </FilterPanel>

    <FilterPanel class="inputPanel">
      <BirthdayField
        :value="v.birthday.value"
        @input="updateBirthday"
        :isError="v.birthday.isError"
      />
    </FilterPanel>
  </div>
</template>

<script lang="ts">
import ImgInput from "./ImgInput.vue";
import FilterPanel from "@/components/filterPanel/FilterPanel.vue";
import ExpandableCalendar from "@/components/filterPanel/ExpandableCalendar.vue";
import NameTextField from "@/components/account/NameTextField.vue";

import { Vue, Component, Prop } from "vue-property-decorator";
import { Details as D } from "./types";
import NameField from "@/components/account/primary/settings/NameField.vue";
import SurnameField from "@/components/account/primary/settings/SurnameField.vue";
import BirthdayField from "./primary/settings/BirthdayField.vue";
import { Details } from "./classes/Details";
import { getUpdatedFields } from "@/utility/validate";

@Component({
  components: {
    ImgInput,
    FilterPanel,
    NameTextField,
    ExpandableCalendar,
    NameField,
    SurnameField,
    BirthdayField,
  },
})
export default class PrimarySettings extends Vue {
  @Prop({ type: Object, default: () => new Details.User() })
  readonly value!: D.User;
  get v() {
    return this.value;
  }

  // TODO include into the system (when will have db support)
  img =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9tbe0h9I_HCaMS2lyCsdTRXmznpSg9Rn5iA&usqp=CAU";

  updateName(value: string) {
    this.$emit("input", getUpdatedFields(this.value, "firstName", value))
  }
  updateSurname(value: string) {
    this.$emit("input", getUpdatedFields(this.value, "lastName", value))
  }
  updateBirthday(value: string) {
    this.$emit("input", getUpdatedFields(this.value, "birthday", value))
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
