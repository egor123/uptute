<template>
  <TextField
    @input="emitInput"
    :value="value"
    :errMsg="obj.errMsg"
    :label="$l(`set_up.${label}`)"
    :borderRadius="finalBorderRadius"
    :rules="rules"
    ref="textFieldRef"
  />
</template>

<script lang="ts">
import TextField from "@/components/filterPanel/TextField.vue";
import { NameObject, Rules } from "./types";
import { Name } from "./classes/Name";

import { Vue, Component, Prop, Ref } from "vue-property-decorator";

@Component({ components: { TextField } })
export default class NameTextField extends Vue {
  @Prop(String) readonly value!: NameObject;
  @Prop(Name) readonly obj!: NameObject;
  @Prop(String) readonly borderRadius!: string;
  @Prop(Function) readonly rules!: Rules<string>;
  @Ref() readonly textFieldRef!: typeof TextField;

  get finalBorderRadius() {
    return this.borderRadius ? this.borderRadius : this.defaultBorderRadius;
  }
  get defaultBorderRadius() {
    return this.obj.isFirstName ? "15px 15px 0px 0px" : "0px 0px 15px 15px";
  }
  get label() {
    return this.obj.isFirstName ? "name" : "surname";
  }
  emitInput = (input: string) => this.$emit("input", input);
  // @ts-ignore : textField does isn't a class => doesn't know that isValid exists on it
  isValid = () => this.$refs.textFieldRef.isValid();
}
</script>
