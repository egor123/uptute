<template>
  <v-text-field
    :value="value"
    @input="emit"
    :rules="rules"
    :label="label"
    filled
    rounded
    required
    :type="type"
    :append-icon="icon"
    @click:append="onAppendClick()"
    :loading="ifLoading"
  >
    <template v-slot:progress>
      <ProgressBar id="progress" :value="value" />
    </template>
  </v-text-field>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Rules } from "./types";
import ProgressBar from "./ProgressBar.vue";

@Component({ components: { ProgressBar } })
export default class AuthTextInput extends Vue {
  @Prop({ type: String, default: "" }) readonly value!: string;
  @Prop({ type: Array, default: [] }) readonly rules!: Rules<string>;
  @Prop(String) readonly label!: string;
  @Prop({ type: Boolean, default: false }) readonly isPassword!: boolean;
  @Prop({ type: Boolean, default: false }) readonly hasProgressBar!: boolean;

  isHidden: boolean = true;

  get type(): "text" | "password" {
    return this.isPassword && this.isHidden ? "password" : "text";
  }
  get icon(): "" | "mdi-eye" | "mdi-eye-off" {
    return this.isPassword ? (this.isHidden ? "mdi-eye-off" : "mdi-eye") : "";
  }
  get ifLoading(): boolean {
    return this.hasProgressBar && this.value.length > 0;
  }

  emit(value: string) {
    this.$emit("input", value);
  }
  onAppendClick() {
    if (this.isPassword) this.isHidden = !this.isHidden;
  }
}
</script>

<style scoped lang="scss">
::v-deep.v-text-field .v-input__slot {
  overflow: hidden;
}
::v-deep .v-messages__message {
  font-size: 12px;
}

#progress {
  position: absolute;
  left: 16px;
  right: 16px;
  width: auto;
}
</style>
